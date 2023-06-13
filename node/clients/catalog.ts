import type {
  InstanceOptions,
  IOContext,
  RequestConfig,
  SegmentData,
} from '@vtex/api'
import { AppClient } from '@vtex/api'
import { stringify } from 'qs'
import type { Category } from '@vtex/api/lib/clients/apps/catalogGraphQL/category'
import type { SKU } from '@vtex/api/lib/clients/apps/catalogGraphQL/sku'

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  const segmentToken = headers['x-vtex-segment']
  const segmentQs = segmentToken ? `&segmentToken=${segmentToken}` : ''

  return (
    baseURL! +
    url! +
    stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true }) +
    segmentQs
  )
}

/** Catalog API
 * Docs: https://documenter.getpostman.com/view/845/catalogsystem-102/Hs44
 */
export class Catalog extends AppClient {
  private basePath: string

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)
    this.basePath = ctx.sessionToken
      ? '/proxy/authenticated/catalog'
      : '/proxy/catalog'
  }

  public categories = (treeLevel: number) =>
    this.get<Category[]>(`/pub/category/tree/${treeLevel}/`, {
      metric: 'catalog-categories',
    })

  public getSkusById = (productId: number) =>
    this.get<SKU[]>(`/pub/products/variations/${productId}`, {
      metric: `catalog-product`,
    })

  private get = <T = any>(url: string, config: RequestConfig = {}) => {
    const segmentData: SegmentData | undefined = (this
      .context! as CustomIOContext).segment

    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }

    config.inflightKey = inflightKey

    return this.http.get<T>(`${this.basePath}${url}`, config)
  }
}
