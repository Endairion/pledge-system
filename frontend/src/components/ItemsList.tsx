import { Plus, Edit2, Trash2 } from "lucide-react"
import type { ItemForm } from "@/hooks/useItemForm"

const CATEGORIES = [
  { value: "ring", label: "Ring (Cincin)" },
  { value: "necklace", label: "Necklace (Rantai)" },
  { value: "bracelet", label: "Bracelet (Gelang)" },
  { value: "earring", label: "Earring (Subang)" },
  { value: "bangle", label: "Bangle (Tangan)" },
  { value: "coin", label: "Coin (Syiling)" },
  { value: "bar", label: "Bar (Jongkong)" },
  { value: "other", label: "Other (Lain-lain)" },
]

interface ItemsListProps {
  items: ItemForm[]
  totalValue: number
  onAddClick: () => void
  onEditClick: (key: string) => void
  onDeleteClick: (key: string) => void
}

/**
 * List of items added to a pledge with edit/delete actions.
 */
export function ItemsList({
  items,
  totalValue,
  onAddClick,
  onEditClick,
  onDeleteClick,
}: ItemsListProps) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pledge Items</h2>
        <button
          type="button"
          onClick={onAddClick}
          className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-md px-3 py-1.5 hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No items added yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-2 py-2">#</th>
                <th className="text-left px-2 py-2">Category</th>
                <th className="text-left px-2 py-2">Description</th>
                <th className="text-left px-2 py-2">Weight</th>
                <th className="text-left px-2 py-2">Quality</th>
                <th className="text-right px-2 py-2">Value</th>
                <th className="text-center px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item._key} className="border-b hover:bg-accent/50">
                  <td className="px-2 py-2">{idx + 1}</td>
                  <td className="px-2 py-2">
                    {CATEGORIES.find((c) => c.value === item.category)?.label || item.category}
                  </td>
                  <td className="px-2 py-2">{item.description}</td>
                  <td className="px-2 py-2">{item.weight}g</td>
                  <td className="px-2 py-2">{item.gold_quality}</td>
                  <td className="px-2 py-2 text-right">RM {item.item_value.toFixed(2)}</td>
                  <td className="px-2 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEditClick(item._key)}
                        className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(item._key)}
                        className="p-1 hover:bg-accent rounded text-muted-foreground hover:text-foreground"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-2 border-t text-right">
        <span className="text-sm text-muted-foreground">Total Item Value: </span>
        <span className="font-semibold">RM {totalValue.toFixed(2)}</span>
      </div>
    </div>
  )
}
