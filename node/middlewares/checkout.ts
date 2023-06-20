export async function getOrCreateCart(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { checkout: checkoutClient },
  } = ctx

  console.info('pa-----', params)
  const { forceNewCart } = params
  const n = (forceNewCart as string) === 'true'
  const response = await checkoutClient.getOrCreateCart(n)

  console.info('the response:', response)

  ctx.body = response
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  await next()
}

export async function getCartPage(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { checkout: checkoutClient },
  } = ctx

  const { formOrderId } = params

  console.info('-----', params)
  console.info('ofid-----', formOrderId)
  const id = formOrderId as string
  const response = await checkoutClient.getAllOrdersCart(id)

  console.info('the response:', response)

  ctx.body = response

  await next()
}