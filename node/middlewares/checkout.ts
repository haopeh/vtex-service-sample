import { json } from 'co-body'

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

  ctx.body = await checkoutClient.getOrCreateCart(n)
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

  const id = formOrderId as string

  ctx.body = await checkoutClient.getAllOrdersCart(id)

  await next()
}

const updateItemQuantity = (
  currentForm: OrderFormItem[],
  body: OrderItem
): OrderItem => {
  const itemIndex = currentForm.findIndex((item) => item.id === body.id)

  if (itemIndex !== -1) {
    body.quantity += currentForm[itemIndex].quantity
  }

  return body
}

export async function addCartItems(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const orderItem = (await json(ctx.req)) as OrderItem

  const { formOrderId } = params

  const currentForm = await checkoutClient.getAllOrdersCart(formOrderId)
  const currentItems = currentForm.items

  const updatedItem = updateItemQuantity(currentItems, orderItem)
  const vtexResponse = await checkoutClient.addItem(formOrderId, updatedItem)

  ctx.body = vtexResponse.items
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
}

export async function updateCartItems(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const body = await json(ctx.req)

  const { formOrderId } = params

  console.info('order id', formOrderId)

  const vtexResponse = await checkoutClient.updateItem(formOrderId, body)

  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = vtexResponse.items
  await next()
}
