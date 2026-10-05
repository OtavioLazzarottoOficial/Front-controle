import { CategoryDTO } from "@/dto/category.dto"
import { api } from "@/lib/api"

export async function fetchCategories(page: number): Promise<CategoryDTO[]> {
  const response = await api.get(`/categories?page=${page}`)

  const { categories } = response.data

  return categories
}
