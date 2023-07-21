export async function getPickupPoints(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { logisticsBackup },
  } = ctx

  await Promise.resolve(logisticsBackup.nearPickupPoints())
    .then((result) => {
      ctx.body = result
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })

  await next()
}

export async function pickupPointsList(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { logistics },
  } = ctx

  await Promise.resolve(logistics.listPickupPoints('AUTH_TOKEN'))
    .then((result) => {
      ctx.body = result
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })

  await next()
}
