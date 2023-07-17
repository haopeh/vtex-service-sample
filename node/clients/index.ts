import { IOClients } from '@vtex/api'

import Status from './status'
import { Catalog } from './catalog'
import { Checkout } from './checkout'
import { PvtCatalog } from './PvtCatalog'
import { Promotions } from './promotions'

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

  public get pvtCatalog() {
    return this.getOrSet('pvtCatalog', PvtCatalog)
  }

  public get promotions() {
    return this.getOrSet('promotions', Promotions)
  }
}
