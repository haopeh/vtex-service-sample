import { json } from 'co-body'

export async function getSkuService(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { skuService },
  } = ctx

  const { skuServiceId }: { skuServiceId?: number } = params
  const response = await skuService.getSkuService(skuServiceId)

  console.info('response', response)

  ctx.body = response
  await next()
}

export async function createSkuServiceType(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { skuService },
  } = ctx

  const serviceType = await json(ctx.req)
  const response = await skuService.createSkuServiceType(serviceType)

  console.info('response', response)

  ctx.body = response
  await next()
}

export async function createSkuServiceValue(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { skuService },
  } = ctx

  const serviceValue = await json(ctx.req)
  const response = await skuService.createSkuServiceValue(serviceValue)

  console.info('response', response)

  ctx.body = response
  await next()
}
