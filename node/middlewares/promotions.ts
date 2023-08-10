import type { RequestConfig } from '@vtex/api'

export async function getAllPromotions(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { promotions },
  } = ctx

  // Extract appKey and appToken from incoming headers
  const appKey = ctx.headers['x-vtex-api-appkey']
  const appToken = ctx.headers['x-vtex-api-apptoken']

  // Create the config object with specific headers
  const config: RequestConfig = {
    headers: {
      'X-VTEX-API-AppKey': appKey,
      'X-VTEX-API-AppToken': appToken,
    },
  }

  const response = await promotions.getAllPromotions(config)

  ctx.body = response.items
  await next()
}

export async function getPromotions(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { promotions, pvtCatalog, price },
    vtex: {
      route: { params },
    },
  } = ctx

  // Extract appKey and appToken from incoming headers
  const appKey = ctx.headers['x-vtex-api-appkey']
  const appToken = ctx.headers['x-vtex-api-apptoken']

  // Create the config object with specific headers
  const config: RequestConfig = {
    headers: {
      'X-VTEX-API-AppKey': appKey,
      'X-VTEX-API-AppToken': appToken,
    },
  }

  const { promotionsId } = params

  const response = await promotions.getPromotions(
    promotionsId as string,
    config
  )

  // const giftIds = response.skusGift.gifts.map((gift: { id: any }) => {
  //   return gift.id
  // })

  const skuIds = response.skus.map((sku: { id: any }) => {
    return sku.id
  })

  const detailPromises = skuIds.map((sku: string) =>
    pvtCatalog.getContextBySkuID(sku)
  )

  const pricePromises = skuIds.map((sku: string) => price.skuPrice(sku, config))

  const skuDetails = await Promise.all(detailPromises)

  const prices = await Promise.all(pricePromises)

  response.skus.forEach((sku: Sku, index: number) => {
    const skuDetail = skuDetails[index]
    const skuPrice = prices[index]

    sku.imageUrl = skuDetail.ImageUrl

    sku.productId = String(skuDetail.ProductId)
    sku.listPrice = String(skuPrice.listPrice)
  })

  ctx.body = response
  await next()
}
