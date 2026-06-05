import LookupTable from "@/components/LookupTable"

export default function CustomerTitlesPage() {
  return (
    <LookupTable
      title="Customer Titles"
      singularTitle="Customer Title"
      description="Manage customer titles (Mr, Mrs, Dr, etc.)"
      tableName="customer_titles"
    />
  )
}
