import { Application, Router } from 'express'
import { ProductRouter } from './product/product.routes'
import { CmcRouter } from './cmc/cmc.routes'
import { CategoryRouter } from './storage/category.routes'
import { ItemRouter } from './storage/item.routes'
import { UserRouter } from './storage/user.routes'
import { TransactionDataRouter } from './storage/transactionData.routes'
import { StorageLocationRouter } from './storage/storageLocation.routes'
import { StockRouter } from './storage/stock.routes'
// import { FileRouter } from './storage/storageFile.routes'

const _routes: Array<[string, Router]> = [
  ['/product', ProductRouter],
  ['/cmc', CmcRouter],
  ['/api', CategoryRouter],
  ['/api', UserRouter],
  ['/api', ItemRouter],
  ['/api', TransactionDataRouter],
  ['/api', StorageLocationRouter],
  ['/api', StockRouter]
  // ['/api', FileRouter]
]

export const routes = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router)
  })
}
