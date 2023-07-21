import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { statusToError } from '../utils'

const FOUR_SECONDS = 4 * 1000

export class LogisticsBackup extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
      timeout: FOUR_SECONDS,
    })
  }

  public nearPickupPoints = () =>
    this.get<LogisticPickupPoint>(
      `/api/logistics/pvt/configuration/pickuppoints`,
      { metric: `logistics-nearPickupPoints` }
    )

  protected get = <T>(url: string, config?: RequestConfig) =>
    this.http.get<T>(url, config).catch(statusToError) as Promise<T>
}
