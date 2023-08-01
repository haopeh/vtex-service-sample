export async function getSkuService(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: {params},
    },
    clients: {skuService},
  } = ctx

  const {skuServiceId}: { skuServiceId ?: number } = params
  const response = await skuService.getSkuService(skuServiceId)

  console.info('response', response)

  ctx.body = response
  await next()
}
