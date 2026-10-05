import { ProductDTO } from "@/dto/product-dto"
import { api } from "@/lib/api"

export async function fetchProducts(page: number): Promise<ProductDTO[]> {
  const response = await api.get(`products?page=${page}`)

  return response.data
}
