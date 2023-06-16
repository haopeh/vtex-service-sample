export async function getCatalog(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { catalog: catalogClient },
  } = ctx

  const { level } = params

  ctx.body = await catalogClient.categories(parseInt(level as string, 10))

  await next()
}
