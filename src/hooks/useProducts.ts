import { ProductDTO } from "@/dto/product-dto"
import { api } from "@/lib/api"

export async function fetchProducts(page: number): Promise<ProductDTO[]> {
  const response = await api.get(`products?page=${page}`)

  return response.data
}

export async function insertProduct(product: ProductDTO): Promise<void> {
  await api.post("product", product)
}