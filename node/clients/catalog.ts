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

  public searchProductsByName = (productName?: string) =>
    this.get<Product[]>(`/pub/products/search/${productName}`, {
      metric: `search-products`,
    })

  public searchProductsWithFilter = (args: SearchArgs) =>
    this.get<Product[]>(this.productSearchUrl(args), {
      metric: `search-products-with-filter`,
    })

  public autocomplete = (searchTerm: string) =>
    this.get<{ itemsReturned: CompleteItem[] }>(
      `/buscaautocomplete?productNameContains=${encodeURIComponent(
        searchTerm
      )}`,
      {
        metric: `product-autocomplete`,
      }
    )

  public productDetail = (productId: string) =>
    this.get<ProductDetail>(`/pub/products/variations/${productId}`, {
      metric: `product-detail`,
    })

  private productSearchUrl = ({
    query = '',
    category = 'C:/3/',
    specificationFilters,
    priceRange = '',
    collection = '',
    salesChannel = '',
    orderBy = '',
    from = 0,
    to = 9,
    map = '',
    hideUnavailableItems = false,
  }: SearchArgs) => {
    const sanitizedQuery = encodeURIComponent(
      this.removeSpecialCharacters(decodeURIComponent(query ?? '').trim())
    )

    // eslint-disable-next-line no-console
    console.log('the sanitized query is:', sanitizedQuery)

    if (hideUnavailableItems) {
      const segmentData = (this.context as CustomIOContext).segment

      salesChannel = segmentData?.channel.toString() ?? ''
    }

    let url = `/pub/products/search/${sanitizedQuery}?`

    if (category && !query) {
      url += `&fq=C:/${category}/`
    }

    if (specificationFilters && specificationFilters.length > 0) {
      url = `${url}${specificationFilters.map((filter) => `&fq=${filter}`)}`
    }

    if (priceRange) {
      url += `&fq=P:[${priceRange}]`
    }

    if (collection) {
      url += `&fq=productClusterIds:${collection}`
    }

    if (salesChannel) {
      url += `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
    }

    if (orderBy) {
      url += `&O=${orderBy}`
    }

    if (map) {
      url += `&map=${map}`
    }

    if (from != null && from > -1) {
      url += `&_from=${from}`
    }

    if (to != null && to > -1) {
      url += `&_to=${to}`
    }

    // eslint-disable-next-line no-console
    console.log('the final url is:', url)

    return url
  }

  private removeSpecialCharacters = (str: string) => {
    return str.replace(/[%"'.()+]/g, '')
  }

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
