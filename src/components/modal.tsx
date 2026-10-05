import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

export function DialogDemo() {
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
        <Button variant="outline" className="cursor-pointer">
          Cadastrar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
