import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageWishlist from './pages/admin/ManageWishlist'
import ManageUpdates from './pages/admin/ManageUpdates'

import { auth, db } from './firebase/firebase'

function ProtectedAdminRoute({ children }) {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('denied')
        return
      }

      try {
        const adminRef = doc(db, 'admins', user.uid)
        const adminSnap = await getDoc(adminRef)

        if (adminSnap.exists() && adminSnap.data().active === true) {
          setStatus('allowed')
        } else {
          setStatus('denied')
        }
      } catch (error) {
        console.error('Admin access check failed:', error)
        setStatus('denied')
      }
    })

    return () => unsubscribe()
  }, [])

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f0]">
        <p className="text-[#4b1f2a]">Checking admin access...</p>
      </div>
    )
  }

  if (status === 'denied') {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/updates"
          element={
            <ProtectedAdminRoute>
              <ManageUpdates />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/admin/wishlist"
          element={
            <ProtectedAdminRoute>
              <ManageWishlist />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}