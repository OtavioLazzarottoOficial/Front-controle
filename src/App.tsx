import { TableList } from "./components/table"
import { Button } from "./components/ui/button"
import { Field } from "./components/ui/field"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./hooks/useProducts"
import { DialogDemo } from "./components/modal"
import { fetchCategories } from "./hooks/useCategories"

//import type { ProductDTO } from "./dto/product-dto"

export function App() {
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(1),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(1),
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  return (
    <div className="flex w-6xl flex-col items-center pt-6">
      <DialogDemo categories={categories} />
      <h2>Pagina de Produtos</h2>
      <div className="mt-10 h-16 items-center gap-6"></div>

      <div>
        <TableList products={data} />
      </div>
    </div>
  )
}

export default App
