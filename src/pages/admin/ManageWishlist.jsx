
import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'

import { db } from '../../firebase/firebase'
import { ArrowLeft, Plus, Pencil, Trash2, Gift, X } from 'lucide-react'
import { Link } from 'react-router-dom'


const initialForm = {
  title: '',
  category: 'Clothing',
  description: '',
  imageUrl: '',
  published: false,
}

export default function ManageWishlist() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchItems = async () => {
    try {
      setLoading(true)

      const itemsQuery = query(
        collection(db, 'wishlist_items'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(itemsQuery)

      setItems(
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))
      )
    } catch (err) {
      console.error(err)
      setError('Could not load wishlist items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const openAddForm = () => {
    setForm(initialForm)
    setEditingId(null)
    setShowForm(true)
    setError('')
  }

  const openEditForm = (item) => {
    setForm({
      title: item.title || '',
      category: item.category || 'Clothing',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      published: item.published === true,
    })

    setEditingId(item.id)
    setShowForm(true)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const itemData = {
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
        published: form.published,
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        await updateDoc(
          doc(db, 'wishlist_items', editingId),
          itemData
        )
      } else {
        await addDoc(collection(db, 'wishlist_items'), {
          ...itemData,
          createdAt: serverTimestamp(),
        })
      }

      setForm(initialForm)
      setEditingId(null)
      setShowForm(false)

      await fetchItems()
    } catch (err) {
      console.error(err)
      setError('Unable to save this item. Please check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this wishlist item?'
    )

    if (!confirmed) return

    try {
      await deleteDoc(doc(db, 'wishlist_items', id))
      await fetchItems()
    } catch (err) {
      console.error(err)
      setError('Unable to delete this item.')
    }
  }

  const togglePublished = async (item) => {
    try {
      await updateDoc(doc(db, 'wishlist_items', item.id), {
        published: !item.published,
        updatedAt: serverTimestamp(),
      })

      await fetchItems()
    } catch (err) {
      console.error(err)
      setError('Unable to update publishing status.')
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f0]">

      <header className="bg-[#4b1f2a] px-5 py-5 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70">
              Magobenyana Presents
            </p>
            <h1 className="font-serif text-xl font-bold">
              Donation Wishlist
            </h1>
          </div>

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <button
  onClick={() => (window.location.href = '/admin/dashboard')}
  className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7d2636] px-5 py-2.5 text-sm font-semibold text-[#7d2636] transition hover:bg-[#7d2636] hover:text-white"
>
  <ArrowLeft size={17} />
  Back to Dashboard
</button>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#4b1f2a]">
              Manage Wishlist
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Add and manage the items people can donate.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="flex items-center justify-center gap-2 rounded-full bg-[#7d2636] px-6 py-3 font-semibold text-white hover:bg-[#4b1f2a]"
          >
            <Plus size={19} />
            Add Wishlist Item
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#4b1f2a]">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h3>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Item Name
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Children's clothing"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#7d2636]"
                >
                  <option>Clothing</option>
                  <option>Toys</option>
                  <option>Vouchers</option>
                  <option>Essentials</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what people can donate..."
                  rows="3"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm font-medium md:col-span-2">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#7d2636]"
                />
                Publish this item on the public website
              </label>

              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#7d2636] px-7 py-3 font-semibold text-white hover:bg-[#4b1f2a] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Item'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-gray-300 px-7 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        <div className="mb-5 flex items-center gap-3">
          <Gift className="text-[#7d2636]" size={23} />
          <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
            Wishlist Items ({items.length})
          </h3>
        </div>

        {loading ? (
          <p className="py-10 text-center text-gray-500">
            Loading wishlist...
          </p>
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Gift size={38} className="mx-auto text-[#7d2636]" />
            <h3 className="mt-4 font-serif text-xl font-bold text-[#4b1f2a]">
              No wishlist items yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Add your first donation item to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-36 items-center justify-center bg-[#f5e9e9]">
                    <Gift size={42} className="text-[#7d2636]" />
                  </div>
                )}

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f5e9e9] px-3 py-1 text-xs font-semibold text-[#7d2636]">
                      {item.category}
                    </span>

                    <span className={`text-xs font-semibold ${
                      item.published ? 'text-green-700' : 'text-gray-400'
                    }`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-[#4b1f2a]">
                    {item.title}
                  </h4>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditForm(item)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => togglePublished(item)}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-full border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
