interface AllPromotions {
  items: Item[]
}

interface Item {
  idCalculatorConfiguration: string
  name: string
  beginDate: string
  endDate: string
  isActive: boolean
  status: string
}
