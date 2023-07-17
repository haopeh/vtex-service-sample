import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  IOContext,
  SegmentData,
} from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { getSku } from './middlewares/sku'
import {
  addCartItems,
  addLogisticAndPaymentData,
  addShippingData,
  getCartPage,
  getOrCreateCart,
  placeOrderInExistingCart,
  updateCartItems,
} from './middlewares/checkout'
import { getCatalog } from './middlewares/category'
import {
  productDetail,
  productSearchComplete,
  searchProducts,
  searchProductsWithFilter,
} from './middlewares/search'
import { getAllPromotions, getPromotions } from './middlewares/promotions'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The 'max' parameter sets the size of the cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
// Note that the response from the API being called must include an 'etag' header
// or a 'cache-control' header with a 'max-age' value. If neither exist, the response will not be cached.
// To force responses to be cached, consider adding the `forceMaxAge` option to your client methods.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
    level: number
  }

  interface CustomIOContext extends IOContext {
    currentProfile: CurrentProfile
    segment?: SegmentData
    orderFormId?: string
    ownerId?: string
  }

  interface CurrentProfile {
    email: string
    userId: string
  }
}

const setCors = (ctx: Context) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
}

export default new Service({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    status: method({
      GET: [validate, status],
    }),
    catalog: method({
      GET: [getCatalog, setCors],
    }),
    skus: method({
      GET: [getSku, setCors],
    }),
    cartOrders: method({
      GET: [getOrCreateCart, setCors],
    }),
    orders: method({
      GET: [getCartPage, setCors],
    }),
    addItems: method({
      // add items to cart
      POST: [addCartItems, setCors],
    }),
    updateItems: method({
      // update item in cart
      POST: [updateCartItems, setCors],
    }),
    addShippingData: method({
      // update item in cart
      POST: [addShippingData, setCors],
    }),
    addLogisticAndPaymentData: method({
      // update item in cart
      POST: [addLogisticAndPaymentData, setCors],
    }),
    searchProducts: method({
      GET: [searchProducts, setCors],
    }),
    searchProductsWithFilter: method({
      POST: [searchProductsWithFilter, setCors],
    }),
    productSearchComplete: method({
      GET: [productSearchComplete, setCors],
    }),
    placeOrderFromExistingCart: method({
      POST: [placeOrderInExistingCart],
    }),
    productDetail: method({
      GET: [productDetail, setCors],
    }),
    allPromotions: method({
      GET: [getAllPromotions, setCors],
    }),
    promotions: method({
      GET: [getPromotions, setCors],
    }),
  },
})
