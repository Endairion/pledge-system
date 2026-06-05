import { useState } from "react"

export interface ItemForm {
  _key: string
  category: string
  description: string
  weight: number
  length?: number
  gold_quality: string
  item_value: number
  remarks?: string
}

/**
 * Custom hook for managing pledge items form state.
 * 
 * Handles adding, editing, and removing items from the pledge.
 * Maintains modal state and item list, tracks editing context.
 * 
 * @returns Object containing items state and manipulation methods
 * @returns {ItemForm[]} items - Current list of items
 * @returns {Function} setItems - Update entire items list
 * @returns {string|null} editingKey - Key of item currently being edited (null if adding new)
 * @returns {ItemForm} modalItem - Form data for modal (new or editing item)
 * @returns {Function} setModalItem - Update modal form data
 * @returns {Function} addItem - Prepare modal for adding new item
 * @returns {Function} editItem - Load existing item into modal for editing
 * @returns {Function} saveItem - Save modal data to items list (add or update)
 * @returns {Function} removeItem - Delete item from list
 * @returns {number} totalItemValue - Sum of all item values
 */
export function useItemForm() {
  const [items, setItems] = useState<ItemForm[]>([])
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [modalItem, setModalItem] = useState<ItemForm>({
    _key: "",
    category: "ring",
    description: "",
    weight: 0,
    gold_quality: "916 (22K)",
    item_value: 0,
  })

  /**
   * Prepare modal for adding a new item with fresh form state.
   * Clears editingKey to indicate add mode (not edit).
   */
  const addItem = () => {
    setEditingKey(null)
    setModalItem({
      _key: `item-${Date.now()}`,
      category: "ring",
      description: "",
      weight: 0,
      gold_quality: "916 (22K)",
      item_value: 0,
    })
  }

  /**
   * Load existing item into modal for editing.
   * Sets editingKey to track which item is being modified.
   * 
   * @param key - Unique key of item to edit
   */
  const editItem = (key: string) => {
    const item = items.find((i) => i._key === key)
    if (item) {
      setEditingKey(key)
      setModalItem(item)
    }
  }

  /**
   * Save modal data to items list (add new or update existing).
   * If editingKey is set, updates existing item by key.
   * Otherwise, adds modal data as new item to list.
   */
  const saveItem = () => {
    if (editingKey) {
      setItems(items.map((i) => (i._key === editingKey ? modalItem : i)))
    } else {
      setItems([...items, modalItem])
    }
  }

  /**
   * Remove item from list by key.
   * 
   * @param key - Unique key of item to remove
   */
  const removeItem = (key: string) => {
    setItems(items.filter((i) => i._key !== key))
  }

  const totalItemValue = items.reduce((sum, item) => sum + item.item_value, 0)

  return {
    items,
    setItems,
    editingKey,
    modalItem,
    setModalItem,
    addItem,
    editItem,
    saveItem,
    removeItem,
    totalItemValue,
  }
}
