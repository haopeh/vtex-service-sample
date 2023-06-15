import { IOClients } from '@vtex/api'

import Status from './status'
import { Catalog } from './catalog'
import { Checkout } from './checkout'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
