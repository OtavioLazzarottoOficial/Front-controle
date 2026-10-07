import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { insertProduct } from "@/hooks/useProducts"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Status } from "@/dto/product-dto"

type Props = {
  categories?: CategoryDTO[]
}

const schemaProduct = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
  categoryId: z.string().uuid("Categoria inválida"),
  status: z.nativeEnum(Status).optional(),
})

type ProductsProps = z.infer<typeof schemaProduct>

export function DialogDemo({ categories = [] }: Props) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductsProps>({
    resolver: zodResolver(schemaProduct),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductsProps) => insertProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      reset()
      setOpen(false)
    },
  })

  const onSubmit: SubmitHandler<ProductsProps> = (data) => {
    mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field orientation="horizontal" className="justify-between">
            <Label htmlFor="name">Nome</Label>
            <div className="flex flex-col gap-1">
              <Input
                className="w-64"
                {...register("name")}
                id="name"
                placeholder="Ex: Informática"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
          </Field>

          <Field orientation="horizontal" className="justify-between">
            <Label htmlFor="description">Descrição</Label>
            <div className="flex flex-col gap-1">
              <Input
                className="w-64"
                {...register("description")}
                id="description"
                placeholder="Descrição do produto"
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </Field>

          <Field orientation="horizontal" className="justify-between">
            <Label htmlFor="price">Preço</Label>
            <div className="flex flex-col gap-1">
              <Input
                type="number"
                step="0.01"
                className="w-64"
                {...register("price")}
                id="price"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>
          </Field>

          {/* Integração do Select (Status) via Controller */}
          <Field orientation="horizontal" className="justify-between">
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-col gap-1">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        <SelectItem value="OUT_OF_STOCK">
                          OUT_OF_STOCK
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>
          </Field>

          {/* Integração do Select (Categoria) via Controller */}
          <Field orientation="horizontal" className="justify-between">
            <Label htmlFor="categoryId">Categoria</Label>
            <div className="flex flex-col gap-1">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {categories.length === 0 ? (
                          <SelectItem value="none" disabled>
                            Sem Categoria
                          </SelectItem>
                        ) : (
                          categories.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-xs text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </Field>

          <DialogFooter className="pt-4 sm:justify-center">
            <ButtonGroup>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
