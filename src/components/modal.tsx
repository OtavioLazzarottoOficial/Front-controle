import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

import { Field } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { CategoryDTO } from "@/dto/category.dto"
import { PlusIcon } from "lucide-react"
import { ButtonGroup } from "./ui/button-group"
import { useMutation } from "@tanstack/react-query"
import { insertProduct } from "@/hooks/useProducts"

type Props = {
  categories?: CategoryDTO[]
}

export function DialogDemo({ categories }: Props) {
  const { mutate } = useMutation({
    mutationFn: () => insertProduct(),
  })

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
          <Label htmlFor="status">Status</Label>

          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>

                <SelectItem value="INACTIVE">INACTIVE</SelectItem>

                <SelectItem value="OUT_OF_STOCK">OUT_OF_STOCK</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

        <DialogFooter className="sm:justify-center">
          <ButtonGroup>
            <DialogClose
              render={
                <Button
                  className={"cursor-pointer"}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
              }
            />
            <Button className={"cursor-pointer"} variant="outline">
              Cadastrar
            </Button>
          </ButtonGroup>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
