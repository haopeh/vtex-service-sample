import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../utils'

const BASE_URL = 'https://vtexsgdemostore.vtexcommercestable.com.br'

export class Promotions extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
        'x-vtex-user-agent': ctx.userAgent,
      },
    })
  }

  public getAllPromotions = () =>
    this.get<AllPromotions>(`/api/rnb/pvt/benefits/calculatorconfiguration`, {
      metric: `all-promotions`,
    })

  public getPromotions = (promotionId: string) =>
    this.get<PromotionsDetail>(
      `/api/rnb/pvt/calculatorconfiguration/${promotionId}`,
      {
        metric: `promotions`,
      }
    )

  protected get = <T>(url: string, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    }
    config.baseURL = BASE_URL

    return this.http.get<T>(url, config).catch(statusToError) as Promise<T>
  }

  private getCommonHeaders = () => {
    const { segmentToken, sessionToken } = this.context as CustomIOContext

    const segmentTokenCookie = segmentToken
      ? `vtex_segment=${segmentToken};`
      : ''

    const sessionTokenCookie = sessionToken
      ? `vtex_session=${sessionToken};`
      : ''

    return {
      Cookie: `${segmentTokenCookie}${sessionTokenCookie}`,
    }
  }
}
