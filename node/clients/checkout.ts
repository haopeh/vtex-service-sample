import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { checkoutCookieFormat, ownershipCookieFormat } from '../utils/cookie'
import { statusToError } from '../utils'

const BASE_URL = 'https://vtexsgdemostore.vtexcommercestable.com.br'

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.storeUserAuthToken
          ? { VtexIdclientAutCookie: ctx.storeUserAuthToken }
          : null),
        'x-vtex-user-agent': ctx.userAgent,
      },
    })
  }

  public getOrCreateCart = (forceNewCart?: boolean) =>
    this.get<OrderForm>(this.routes.getOrCreateCart(forceNewCart), {
      metric: 'checkout-get-cart-page',
    })

  public getAllOrdersCart = (orderFormId?: string) =>
    this.get<OrderForm>(this.routes.getAllOrdersCart(orderFormId), {
      metric: 'checkout-cart-page',
    })

  protected get = <T>(url: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    }
    config.baseURL = BASE_URL

    return this.http.get<T>(url, config).catch(statusToError) as Promise<T>
  }

  private getCommonHeaders = () => {
    const { orderFormId, ownerId, segmentToken, sessionToken } = this
      .context as CustomIOContext

    const checkoutCookie = orderFormId ? checkoutCookieFormat(orderFormId) : ''
    const ownershipCookie = ownerId ? ownershipCookieFormat(ownerId) : ''
    const segmentTokenCookie = segmentToken
      ? `vtex_segment=${segmentToken};`
      : ''

    const sessionTokenCookie = sessionToken
      ? `vtex_session=${sessionToken};`
      : ''

    return {
      Cookie: `${checkoutCookie}${ownershipCookie}${segmentTokenCookie}${sessionTokenCookie}`,
    }
  }

  private get routes() {
    const base = '/api/checkout/pub'

    return {
      getOrCreateCart: (forceNewCart?: boolean) =>
        `${base}/orderForm?forceNewCart=${forceNewCart}`,
      getAllOrdersCart: (orderFormId?: string) =>
        `${base}/orderForm/${orderFormId}`,
    }
  }
}
