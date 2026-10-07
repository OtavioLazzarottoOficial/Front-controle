import { TableList } from "./components/table"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./hooks/useProducts"
import { DialogDemo } from "./components/modal"
import { fetchCategories } from "./hooks/useCategories"

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
      <h1>Pagina de Produtos</h1>
      <div className="mt-10 h-16 items-center gap-6"></div>

      <div>
        {data && data.length > 0 ? (
          <TableList products={data} />
        ) : (
          <span>Nenhum produto cadastrado</span>
        )}
      </div>
    </div>
  )
}

export default App
