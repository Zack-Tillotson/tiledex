import { Breadcrumbs } from "@repo/pokedex/Breadcrumbs";

export default function PokedexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pokedex-layout">
      <Breadcrumbs />
      {children}
    </div>
  )
}