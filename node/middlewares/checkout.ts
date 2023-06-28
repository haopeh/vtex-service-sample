import { json } from 'co-body'
// import { readFileSync } from "fs";

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
  console.info('ctx.body', ctx.body)
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

  console.info('currentItems', currentItems)
  console.info('orderItem request', orderItem)
  const updatedItem = updateItemQuantity(currentItems, orderItem)
  const vtexResponse = await checkoutClient.addItem(formOrderId, updatedItem)

  console.info('vtexResponse', vtexResponse)
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

export async function addShippingData(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const body = await json(ctx.req)

  const { formOrderId } = params

  console.info('order id', formOrderId)
  console.info(body)

  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = await checkoutClient.addShippingData(formOrderId, body)
  console.info(ctx.body)

  await next()
}

export async function addPaymentData(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const body = await json(ctx.req)

  const { formOrderId } = params

  console.info('order id', formOrderId)

  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = await checkoutClient.addPaymentData(formOrderId, body)
  // since the vtex api returns an empty body, we need to return the body we want
  // ctx.body.paymentData=readFileSync()
  await next()
}
