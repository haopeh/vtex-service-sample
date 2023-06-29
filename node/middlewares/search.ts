import { json } from 'co-body'

export async function searchProducts(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { catalog },
  } = ctx

  const { productName }: { productName?: string } = params

  await Promise.resolve(catalog.searchProductsByName(productName))
    .then((result) => {
      ctx.body = result
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })

  await next()
}

export async function searchProductsWithFilter(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { catalog },
  } = ctx

  const args = (await json(ctx.req)) as SearchArgs

  await Promise.resolve(catalog.searchProductsWithFilter(args))
    .then((result) => {
      ctx.body = result
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })

  await next()
}
