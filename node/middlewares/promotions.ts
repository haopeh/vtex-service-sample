export async function getAllPromotions(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { promotions },
  } = ctx

  const response = await promotions.getAllPromotions()

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
