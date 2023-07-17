export async function getAllPromotions(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { promotions },
  } = ctx

  const response = await promotions.getAllPromotions()

  ctx.body = response.items
  await next()
}
