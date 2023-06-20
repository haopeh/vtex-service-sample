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

  await next()
}
