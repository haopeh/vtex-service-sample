export async function getSku(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { catalog: catalogClient },
  } = ctx

  const { productId } = params

  console.info('Received tree level:', productId)

  ctx.body = await catalogClient.getSkusById(parseInt(productId as string, 10))

  await next()
}
