import LookupTable from "@/components/LookupTable"

export default function FeeTypesPage() {
  return (
    <LookupTable
      title="Fee Types"
      singularTitle="Fee Type"
      description="Manage pledge fee types"
      tableName="fee_types"
    />
  )
}
