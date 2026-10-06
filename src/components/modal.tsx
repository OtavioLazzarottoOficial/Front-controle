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
import { PlusIcon } from "lucide-react"
import { ButtonGroup } from "./ui/button-group"

type Props = {
  categories?: CategoryDTO[]
}

export function DialogDemo({ categories }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogTitle>Cadastrar Produto</DialogTitle>
        <Field orientation="horizontal" className="justify-between">
          <Label htmlFor="name">Nome</Label>
          <Input
            className="w-64"
            id="name"
            placeholder="Informatica"
            required
          />
        </Field>

        <Field orientation="horizontal" className="justify-between">
          <Label htmlFor="description">Descrição</Label>
          <Input
            className="w-64"
            id="description"
            placeholder="Informatica"
            required
          />
        </Field>

        <Field orientation="horizontal" className="justify-between">
          <Label htmlFor="price">Preço</Label>
          <Input
            className="w-64"
            id="price"
            placeholder="Informatica"
            required
          />
        </Field>

        <Field orientation="horizontal" className="justify-between">
          <Label htmlFor="description">Categoria</Label>
          {categories?.length === 0 ? (
            <>
              <Select categories={categories}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem>Sem Categoria</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          ) : (
            <>
              <Select categories={categories}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    {categories?.map((item) => (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        </Field>
        <div className="flex flex-col items-center gap-8">
          <ButtonGroup>
            <Button className={"cursor-pointer"} variant="outline">Cancelar</Button>
            <Button className={"cursor-pointer"} variant="outline">Cadastrar</Button>
          </ButtonGroup>
        </div>
      </DialogContent>
    </Dialog>
  )
}
