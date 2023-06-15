export async function getOrdersInCart(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { checkout: checkoutClient },
  } = ctx

  const { forceNewCart } = params
  const n = (forceNewCart as string) === 'true'
  const response = await checkoutClient.getOrCreateCart(n)

  console.info('the response:', response)

  ctx.body = response

  await next()
}
