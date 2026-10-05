import type { CategoryDTO } from "./category.dto"

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
}

export type ProductDTO = {
  id: string
  sku: string
  name: string
  description: string
  categoryId: string
  category?: CategoryDTO
  status: Status
  price: number
  createdAt: Date
  updatedAt: Date | null
}
