/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-unused-vars */
class Product {
  id: string
  name: string
  price: number
  description: string
  stock: number
  constructor(id: string, name: string, price: number, description: string, stock: number) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.stock = stock
  }
}

export default Product
