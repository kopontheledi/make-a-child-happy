import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { LogOut, LayoutDashboard, Gift, Megaphone } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function AdminDashboard() {
    const handleLogout = async () => {
        try {
            await signOut(auth)
            window.location.href = '/admin'
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="min-h-screen bg-[#faf7f0]">

            <header className="flex items-center justify-between bg-[#4b1f2a] px-6 py-5 text-white">
                <div>
                    <p className="text-xs uppercase tracking-widest text-white/70">
                        Magobenyana Presents
                    </p>
                    <h1 className="font-serif text-xl font-bold">
                        Campaign Admin
                    </h1>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-12">
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="text-[#7d2636]" size={28} />
                        <h2 className="font-serif text-3xl font-bold text-[#4b1f2a]">
                            Dashboard Overview
                        </h2>
                    </div>

                    <p className="mt-3 text-gray-600">
                        Welcome to the Make a Child Happy December campaign management portal.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8">
                    <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
                        Your admin dashboard is ready!
                    </h3>

                    <p className="mt-3 leading-7 text-gray-600">
                        We'll use this dashboard to manage donation wishlist items,
                        campaign announcements, impact statistics and enquiries.
                    </p>
                </div>

                <Link
                    to="/admin/wishlist"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7d2636] px-6 py-3 font-semibold text-white hover:bg-[#4b1f2a]"
                >
                    <Gift size={18} />
                    Manage Donation Wishlist
                </Link>

                <Link
                    to="/admin/updates"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7d2636] px-6 py-3 font-semibold text-white hover:bg-[#4b1f2a]"
                >
                    <Megaphone size={18} />
                    Manage Campaign Updates
                </Link>
            </main>
        </div>
    )
}
