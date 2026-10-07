import { Package2 } from "lucide-react"

export function Navbar() {
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Produtos", href: "/products" },
    { label: "Categorias", href: "/categories" },
    { label: "Vendas", href: "/sales" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-bold">
            <Package2 className="h-6 w-6 text-primary" />
            <span>Sistema ERP</span>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
