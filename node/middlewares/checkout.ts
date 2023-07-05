import { json } from 'co-body'

import { setCors } from './cors'

export async function getOrCreateCart(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { checkout: checkoutClient },
  } = ctx

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

  const body = await checkoutClient.getAllOrdersCart(id)

  ctx.body = calculateTotal(body)
  await next()
}

function calculateTotal(response: OrderForm): OrderForm {
  let total: number | undefined = 0

  response.items.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    total += item.priceDefinition.calculatedSellingPrice
  })
  response.totalizers.push({ id: 'total', name: 'Total value', value: total })

  return response
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

  // console.info('currentItems', currentItems)
  // console.info('orderItem request', orderItem)
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

  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = await checkoutClient.addShippingData(formOrderId, body)

  await next()
}

export async function addLogisticAndPaymentData(
  ctx: Context,
  next: () => Promise<void>
) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const body = await json(ctx.req)

  const { formOrderId } = params

  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Origin', '*')
  await checkoutClient.addShippingData(formOrderId, body.logisticsInfo)

  ctx.body = await checkoutClient.addPaymentData(formOrderId, body.payments)
  // since we do not configure the payment method, the paymentData is not returned
  await next()
}

export async function placeOrderInExistingCart(
  ctx: Context,
  next: () => Promise<void>
) {
  const {
    clients: { checkout: checkoutClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const body = await json(ctx.req)
  const { formOrderId } = params

  setCors

  ctx.body = await checkoutClient.placeOrderFromExistingCart(
    formOrderId as string,
    body.payments
  )
  await next()
}
