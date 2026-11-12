
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
  Building2,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/firebase'

const initialForm = {
  name: '',
  description: '',
  logoUrl: '',
  website: '',
  category: 'Supporting Sponsor',
  published: true,
}

const categories = [
  'Main Sponsor',
  'Supporting Sponsor',
  'Community Partner',
]

export default function ManageSponsors() {
  const [sponsors, setSponsors] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadSponsors = async () => {
    try {
      setLoading(true)
      setError('')

      const sponsorsQuery = query(
        collection(db, 'sponsors'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(sponsorsQuery)

      setSponsors(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      )
    } catch (err) {
      console.error('Error loading sponsors:', err)
      setError('Unable to load sponsors. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSponsors()
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

  const openEditForm = (sponsor) => {
    setForm({
      name: sponsor.name || '',
      description: sponsor.description || '',
      logoUrl: sponsor.logoUrl || '',
      website: sponsor.website || '',
      category: sponsor.category || 'Supporting Sponsor',
      published: sponsor.published === true,
    })

    setEditingId(sponsor.id)
    setShowForm(true)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      setError('Please enter the sponsor name.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const sponsorData = {
        name: form.name.trim(),
        description: form.description.trim(),
        logoUrl: form.logoUrl.trim(),
        website: form.website.trim(),
        category: form.category,
        published: form.published,
        updatedAt: serverTimestamp(),
      }

      if (editingId) {
        await updateDoc(doc(db, 'sponsors', editingId), sponsorData)
      } else {
        await addDoc(collection(db, 'sponsors'), {
          ...sponsorData,
          createdAt: serverTimestamp(),
        })
      }

      setForm(initialForm)
      setEditingId(null)
      setShowForm(false)

      await loadSponsors()
    } catch (err) {
      console.error('Error saving sponsor:', err)
      setError('Could not save sponsor. Please check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (sponsor) => {
    try {
      await updateDoc(doc(db, 'sponsors', sponsor.id), {
        published: !sponsor.published,
        updatedAt: serverTimestamp(),
      })

      await loadSponsors()
    } catch (err) {
      console.error('Error updating sponsor:', err)
      setError('Could not update sponsor visibility.')
    }
  }

  const handleDelete = async (sponsor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${sponsor.name}?`
    )

    if (!confirmed) return

    try {
      await deleteDoc(doc(db, 'sponsors', sponsor.id))
      await loadSponsors()
    } catch (err) {
      console.error('Error deleting sponsor:', err)
      setError('Could not delete sponsor.')
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f0]">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-[#4b1f2a] px-5 py-5 text-white md:px-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">
            Magobenyana Presents
          </p>
          <h1 className="font-serif text-xl font-bold">
            Sponsor Management
          </h1>
        </div>

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Building2 size={28} className="text-[#7d2636]" />
              <h2 className="font-serif text-3xl font-bold text-[#4b1f2a]">
                Sponsors & Partners
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Add and manage the organisations supporting the campaign.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-full bg-[#7d2636] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4b1f2a]"
          >
            <Plus size={18} />
            Add Sponsor
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-10 rounded-2xl border border-[#eadfe0] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
                {editingId ? 'Edit Sponsor' : 'Add New Sponsor'}
              </h3>

              <button
                onClick={() => {
                  setShowForm(false)
                  setError('')
                }}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sponsor / Partner Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter organisation name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="A short thank-you or description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Logo Image URL
                </label>
                <input
                  name="logoUrl"
                  type="url"
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Paste a publicly accessible image URL. Leave blank if no logo is available.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Website / Social Media Link
                </label>
                <input
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#7d2636]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sponsor Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#7d2636]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#7d2636]"
                />
                Publish sponsor on the public website
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-full bg-[#7d2636] px-6 py-3 font-semibold text-white hover:bg-[#4b1f2a] disabled:opacity-60"
                >
                  <Save size={17} />
                  {saving ? 'Saving...' : editingId ? 'Update Sponsor' : 'Save Sponsor'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setError('')
                  }}
                  className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
            All Sponsors ({sponsors.length})
          </h3>

          <button
            onClick={loadSponsors}
            className="flex items-center gap-2 text-sm font-medium text-[#7d2636] hover:underline"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500">
            Loading sponsors...
          </div>
        ) : sponsors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d8c5c8] bg-white p-12 text-center">
            <Building2 className="mx-auto mb-4 text-[#7d2636]" size={40} />
            <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
              No sponsors added yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Add your first sponsor or community partner.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#faf7f0]">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <Building2 className="text-[#7d2636]" size={30} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-lg font-bold text-[#4b1f2a]">
                      {sponsor.name}
                    </h4>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#7d2636]">
                      {sponsor.category}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        sponsor.published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {sponsor.published ? 'Published' : 'Unpublished'}
                    </span>
                  </div>
                </div>

                {sponsor.description && (
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {sponsor.description}
                  </p>
                )}

                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block break-all text-sm text-[#7d2636] hover:underline"
                  >
                    Visit website
                  </a>
                )}

                <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => togglePublished(sponsor)}
                    className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                  >
                    {sponsor.published ? <EyeOff size={15} /> : <Eye size={15} />}
                    {sponsor.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => openEditForm(sponsor)}
                    className="flex items-center gap-2 rounded-full bg-[#f7e9ec] px-4 py-2 text-xs font-semibold text-[#7d2636] hover:bg-[#f0dce1]"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(sponsor)}
                    className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
