import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProductDTO } from "@/dto/product-dto"
import { DialogDemo } from "./modal"

type Props = {
  products?: ProductDTO[]
}

export function TableList({ products }: Props) {
  if (!products) {
    return <span>Nenhum produto cadastrado</span>
  }

  return (
    <Table>
      <TableCaption>Lista de produtos cadastrados.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Produto</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">
            {" "}
            <DialogDemo />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
