import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { CategoryDTO } from "@/dto/category.dto"

type Props = {
  categories?: CategoryDTO[]
}

export function DialogDemo({ categories }: Props) {
  console.log(categories)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent>
        <Field orientation="horizontal">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" placeholder="Informatica" required />
        </Field>

        <Field orientation="horizontal">
          <Label htmlFor="description">Descrição</Label>
          <Input id="description" placeholder="Informatica" required />
        </Field>

        <Select categories={categories}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {categories?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Field orientation="horizontal">
          <Label htmlFor="price">Preço</Label>
          <Input id="price" placeholder="Informatica" required />
        </Field>
        <Button variant="outline" className="cursor-pointer">
          Cadastrar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
