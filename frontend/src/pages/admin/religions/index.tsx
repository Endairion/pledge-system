import LookupTable from "@/components/LookupTable"

export default function ReligionsPage() {
  return (
    <LookupTable
      title="Religions"
      singularTitle="Religion"
      description="Manage customer religions"
      tableName="religions"
    />
  )
}
