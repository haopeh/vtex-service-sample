import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import axios from 'axios'

const BASE_URL = 'https://api.vtex.com/vtexsgdemostore/pricing/prices'

export class Price extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public skuPrice = (skuId: string, config: RequestConfig) => {
    const url = `${BASE_URL}/${skuId}`
    const headers = {
      ...config.headers,
    }

    return axios
      .get<SkuPrice>(url, { headers })
      .then((response) => {
        return response.data
      })
  }
}
