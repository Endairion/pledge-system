import { X } from "lucide-react"
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

const GOLD_QUALITIES = ["999 (24K)", "916 (22K)", "750 (18K)", "585 (14K)", "375 (9K)", "Other"]
const ITEM_REMARKS = [
  "Good condition",
  "Minor scratches",
  "Some wear",
  "Damaged",
  "Missing stone",
  "Loose stone",
]

interface ItemFormModalProps {
  isOpen: boolean
  item: ItemForm
  isEditing: boolean
  onItemChange: (item: ItemForm) => void
  onSave: () => void
  onClose: () => void
}

/**
 * Modal form for adding or editing pledge items.
 */
export function ItemFormModal({
  isOpen,
  item,
  isEditing,
  onItemChange,
  onSave,
  onClose,
}: ItemFormModalProps) {
  if (!isOpen) return null

  const handleSave = () => {
    if (!item.description || !item.weight || !item.item_value) {
      alert("Please fill in all required fields")
      return
    }
    onSave()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full md:max-w-md md:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between sticky top-0 border-b bg-background p-4">
          <h2 className="font-semibold">{isEditing ? "Edit Item" : "Add Item"}</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={item.category}
              onChange={(e) => onItemChange({ ...item, category: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) => onItemChange({ ...item, description: e.target.value })}
              placeholder="e.g., Gold Wedding Ring"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weight (g)</label>
              <input
                type="number"
                value={item.weight}
                onChange={(e) => onItemChange({ ...item, weight: parseFloat(e.target.value) || 0 })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Length (cm)</label>
              <input
                type="number"
                value={item.length || ""}
                onChange={(e) =>
                  onItemChange({ ...item, length: parseFloat(e.target.value) || undefined })
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gold Quality</label>
            <select
              value={item.gold_quality}
              onChange={(e) => onItemChange({ ...item, gold_quality: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
            >
              {GOLD_QUALITIES.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Item Value (RM)</label>
            <input
              type="number"
              value={item.item_value}
              onChange={(e) => onItemChange({ ...item, item_value: parseFloat(e.target.value) || 0 })}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Condition/Remarks</label>
            <select
              value={item.remarks || ""}
              onChange={(e) => onItemChange({ ...item, remarks: e.target.value || undefined })}
              className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">Select condition...</option>
              {ITEM_REMARKS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 sticky bottom-0 border-t bg-background p-4">
          <button
            onClick={onClose}
            className="flex-1 border rounded-md px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
