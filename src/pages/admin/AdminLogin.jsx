
import { useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase'
import { LockKeyhole, Mail, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setStatus('Connecting to Firebase...')
    setLoading(true)

    let timeoutId

    try {
      // Prevent the interface from waiting forever
      const loginPromise = signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      const userCredential = await Promise.race([
        loginPromise,
        new Promise((_, reject) => {
          timeoutId = setTimeout(
            () => reject(new Error('Login timed out. Check your internet connection and Firebase configuration.')),
            15000
          )
        })
      ])

      setStatus('Checking administrator access...')

      const user = userCredential.user

      const adminRef = doc(db, 'admins', user.uid)
      const adminSnap = await getDoc(adminRef)

      if (!adminSnap.exists() || adminSnap.data().active !== true) {
        await signOut(auth)
        throw new Error('Your account is not authorised to access the admin dashboard.')
      }

      setStatus('Login successful!')

      window.location.href = '/admin/dashboard'

    } catch (err) {
      console.error('Admin login error:', err)

      const messages = {
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/user-not-found': 'No account was found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Check your internet connection.',
        'auth/operation-not-allowed': 'Email/Password sign-in is not enabled in Firebase.',
        'auth/unauthorized-domain': 'This website domain is not authorised in Firebase Authentication.',
        'permission-denied': 'Firestore denied access. Check your database security rules.'
      }

      setError(
        messages[err.code] ||
        err.message ||
        'Something went wrong. Please try again.'
      )

      setStatus('')
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f0] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7d2636] text-white">
            <LockKeyhole size={30} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[3px] text-[#7d2636]">
            Magobenyana Presents
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-[#4b1f2a]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Sign in to manage the Make a Child Happy December campaign.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full py-4 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4">
              <LockKeyhole size={18} className="text-gray-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full py-4 text-sm outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <p className="text-center text-sm text-gray-500">
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#7d2636] px-6 py-4 font-bold text-white transition hover:bg-[#4b1f2a] disabled:opacity-60"
          >
            {loading ? 'Please wait...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>

        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          Make a Child Happy December · Admin Portal
        </p>
      </div>
    </div>
  )
}
