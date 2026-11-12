import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import {
  ArrowLeft,
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { db } from '../../firebase/firebase'

const initialForm = {
  title: '',
  content: '',
  imageUrl: '',
  published: false,
}

export default function ManageUpdates() {
  const [updates, setUpdates] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchUpdates = async () => {
    try {
      setLoading(true)

      const updatesQuery = query(
        collection(db, 'campaign_updates'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(updatesQuery)

      setUpdates(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      )
    } catch (err) {
      console.error('Failed to load updates:', err)
      setError('Could not load campaign updates.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUpdates()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const openNewForm = () => {
    setForm(initialForm)
    setEditingId(null)
    setError('')
    setShowForm(true)
  }

  const handleEdit = (update) => {
    setForm({
      title: update.title || '',
      content: update.content || '',
      imageUrl: update.imageUrl || '',
      published: update.published === true,
    })

    setEditingId(update.id)
    setError('')
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim() || !form.content.trim()) {
      setError('Please enter an announcement title and content.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const updateData = {
        title: form.title.trim(),
        content: form.content.trim(),
        imageUrl: form.imageUrl.trim(),
        published: form.published,
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        await updateDoc(
          doc(db, 'campaign_updates', editingId),
          updateData
        )
      } else {
        await addDoc(collection(db, 'campaign_updates'), {
          ...updateData,
          createdAt: serverTimestamp(),
        })
      }

      setForm(initialForm)
      setEditingId(null)
      setShowForm(false)

      await fetchUpdates()
    } catch (err) {
      console.error('Failed to save update:', err)
      setError('Could not save this announcement. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (update) => {
    try {
      await updateDoc(doc(db, 'campaign_updates', update.id), {
        published: !update.published,
        updatedAt: serverTimestamp(),
      })

      await fetchUpdates()
    } catch (err) {
      console.error('Failed to update publishing status:', err)
      setError('Could not change the publishing status.')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this announcement?'
    )

    if (!confirmed) return

    try {
      await deleteDoc(doc(db, 'campaign_updates', id))
      await fetchUpdates()
    } catch (err) {
      console.error('Failed to delete announcement:', err)
      setError('Could not delete this announcement.')
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f0]">

      <header className="bg-[#4b1f2a] px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/70">
              Magobenyana Presents
            </p>
            <h1 className="font-serif text-2xl font-bold">
              Campaign Admin
            </h1>
          </div>

          <Megaphone size={30} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">

        <Link
          to="/admin/dashboard"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7d2636] px-5 py-2.5 text-sm font-semibold text-[#7d2636] transition hover:bg-[#7d2636] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#4b1f2a]">
              Campaign Updates
            </h2>
            <p className="mt-2 text-gray-600">
              Create and manage announcements for your campaign website.
            </p>
          </div>

          <button
            onClick={openNewForm}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7d2636] px-6 py-3 font-semibold text-white hover:bg-[#4b1f2a]"
          >
            <Plus size={18} />
            Add Announcement
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#4b1f2a]">
                {editingId ? 'Edit Announcement' : 'New Announcement'}
              </h3>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Announcement Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Donation Collection Now Open"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Announcement Content *
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write your campaign announcement..."
                  rows="5"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Image URL (Optional)
                </label>

                <input
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#7d2636]"
                />
                Publish this announcement on the website
              </label>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#7d2636] px-7 py-3 font-semibold text-white hover:bg-[#4b1f2a] disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Announcement' : 'Save Announcement'}
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

        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
            All Announcements
          </h3>

          <span className="rounded-full bg-[#7d2636]/10 px-4 py-2 text-sm font-semibold text-[#7d2636]">
            {updates.length} Total
          </span>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">
            Loading announcements...
          </p>
        ) : updates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Megaphone className="mx-auto mb-4 text-[#7d2636]" size={38} />
            <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
              No announcements yet
            </h3>
            <p className="mt-2 text-gray-500">
              Add your first campaign announcement.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">

            {updates.map((update) => (
              <article
                key={update.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {update.imageUrl && (
                  <img
                    src={update.imageUrl}
                    alt={update.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        update.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {update.published ? 'Published' : 'Draft'}
                    </span>

                    <button
                      onClick={() => togglePublished(update)}
                      className="flex items-center gap-2 text-sm font-semibold text-[#7d2636]"
                    >
                      {update.published ? <EyeOff size={17} /> : <Eye size={17} />}
                      {update.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
                    {update.title}
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                    {update.content}
                  </p>

                  <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={() => handleEdit(update)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#7d2636] px-4 py-2 text-sm font-semibold text-[#7d2636] hover:bg-[#7d2636] hover:text-white"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(update.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  )
}
