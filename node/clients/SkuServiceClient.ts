import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../utils'

const BASE_URL = 'https://vtexsgdemostore.vtexcommercestable.com.br'

export class SkuServiceClient extends JanusClient {
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

  public getSkuService = (skuServiceId?: number) =>
    this.get<SkuService>(`/api/catalog/pvt/skuservice/${skuServiceId}`, {
      metric: `skuService`,
    })

  public createSkuServiceType = (skuServiceType: SkuServiceType) =>
    this.post<SkuServiceType>(
      `/api/catalog/pvt/skuservicetype`,
      skuServiceType,
      {
        metric: `skuServiceType`,
      }
    )

  public createSkuServiceValue = (skuServiceValue?: SkuServiceValue) =>
    this.post<SkuServiceValue>(
      `/api/catalog/pvt/skuservicevalue`,
      skuServiceValue,
      {
        metric: `skuServiceValue`,
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

  protected post = <T>(url: string, data?: any, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    }
    config.baseURL = BASE_URL

    return this.http
      .post<T>(url, data, config)
      .catch(statusToError) as Promise<T>
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
