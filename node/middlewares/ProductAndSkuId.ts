export async function getProductAndSkuIDs(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
    clients: { pvtCatalog: catalogClient },
  } = ctx

  const { categoryId } = params

  ctx.body = await catalogClient.getProductAndSkuIDs(
    parseInt(categoryId as string, 10)
  )
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

  await next()
}
