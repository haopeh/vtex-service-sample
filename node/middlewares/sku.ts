export async function getSku(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { catalog, pvtCatalog },
  } = ctx

  const { categoryId } = params

  const response = await pvtCatalog.getProductAndSkuIDs(
    parseInt(categoryId as string, 10)
  )

  const productIds = Object.keys(response.data)

  await Promise.all(
    productIds.map(async (id) => {
      return catalog.getSkusById(parseInt(id as string, 10))
    })
  ).then((result) => {
    ctx.body = result
  })

  await next()
}

export async function getSkuWithContext(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
    clients: { pvtCatalog },
  } = ctx

  const { skuId } = params

  ctx.body = await pvtCatalog.getContextBySkuID(skuId as string)

  await next()
}
