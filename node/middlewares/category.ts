export async function getCatalog(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { catalog: catalogClient },
  } = ctx

  const { level } = params

  console.info('Received tree level:', level)

  const response = await catalogClient.categories(parseInt(level as string, 10))

  console.info('catalog response:', response)

  ctx.body = response

  await next()
}
