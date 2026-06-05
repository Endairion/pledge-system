import LookupTable from "@/components/LookupTable"

export default function NationalitiesPage() {
  return (
    <LookupTable
      title="Nationalities"
      singularTitle="Nationality"
      description="Manage customer nationalities"
      tableName="nationalities"
    />
  )
}
