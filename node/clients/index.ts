import { IOClients } from '@vtex/api'
import { Logistics } from '@vtex/clients'

import Status from './status'
import { Catalog } from './catalog'
import { Checkout } from './checkout'
import { PvtCatalog } from './PvtCatalog'
import { Promotions } from './promotions'
import { LogisticsBackup } from './logistics.backup'
import {SkuServiceClient} from "./SkuServiceClient";

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

  public get logisticsBackup() {
    return this.getOrSet('logisticsBackup', LogisticsBackup)
  }

  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }

  public get skuService(){
    return this.getOrSet('skuService', SkuServiceClient)
  }
}
