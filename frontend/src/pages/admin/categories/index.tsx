import LookupTable from "@/components/LookupTable"

export default function CategoriesPage() {
  return (
    <LookupTable
      title="Categories"
      singularTitle="Category"
      description="Manage product categories"
      tableName="categories"
    />
  )
}
