interface ProductIdToSKUId {
  data: Data
  range: Range
}

interface Data {
  [key: string]: number[]
}

interface Range {
  total: number
  from: number
  to: number
}
