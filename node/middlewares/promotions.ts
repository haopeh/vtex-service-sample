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

  console.info('header', ctx.headers)

  console.info('get all promotions start')
  const response = await promotions.getAllPromotions(config)

  console.info('promotion response', response)
  ctx.body = response.items
  await next()
}

export async function getPromotions(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { promotions, catalog },
    vtex: {
      route: { params },
    },
  } = ctx

  const { promotionsId } = params

  const response = await promotions.getPromotions(promotionsId as string)

  const giftIds = response.skusGift.gifts.map((gift) => {
    return gift.id
  })

  const skuIds = response.listSku1BuyTogether.map((sku) => {
    return sku.id
  })

  Promise.all([
    catalog.productBySku(giftIds),
    catalog.productBySku(skuIds),
  ]).then((values) => {
    response.giftDetail = values[0]
    response.sku1Detail = values[1]
  })
  ctx.body = response
  await next()
}
