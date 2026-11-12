
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import {
    LogOut,
    LayoutDashboard,
    Gift,
    Megaphone,
    Building2,
    ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const managementTools = [
    {
        title: 'Donation Wishlist',
        description: 'Add, edit and manage the items the community can donate.',
        icon: Gift,
        link: '/admin/wishlist',
        label: 'Manage Wishlist',
    },
    {
        title: 'Campaign Updates',
        description: 'Share announcements, news and important campaign information.',
        icon: Megaphone,
        link: '/admin/updates',
        label: 'Manage Updates',
    },
    {
        title: 'Sponsors & Partners',
        description: 'Manage sponsor details, logos and campaign partners.',
        icon: Building2,
        link: '/admin/sponsors',
        label: 'Manage Sponsors',
    },
]

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

            {/* HEADER */}
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
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
                >
                    <LogOut size={17} />
                    Logout
                </button>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-12">

                {/* DASHBOARD INTRO */}
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard
                            className="text-[#7d2636]"
                            size={28}
                        />

                        <h2 className="font-serif text-3xl font-bold text-[#4b1f2a]">
                            Dashboard Overview
                        </h2>
                    </div>

                    <p className="mt-3 text-gray-600">
                        Welcome to the Make a Child Happy December campaign management portal.
                    </p>
                </div>

                {/* WELCOME CARD */}
                <div className="mb-12 rounded-2xl border border-gray-200 bg-white p-8">
                    <h3 className="font-serif text-xl font-bold text-[#4b1f2a]">
                        Your admin dashboard is ready!
                    </h3>

                    <p className="mt-3 leading-7 text-gray-600">
                        Manage your campaign content, keep supporters informed
                        and recognise the organisations helping make this
                        initiative possible.
                    </p>
                </div>

                {/* MANAGEMENT TOOLS */}
                <section>
                    <div className="mb-6">
                        <h3 className="font-serif text-2xl font-bold text-[#4b1f2a]">
                            Campaign Management
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Select an area below to manage your campaign.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {managementTools.map((tool) => {
                            const Icon = tool.icon

                            return (
                                <Link
                                    key={tool.link}
                                    to={tool.link}
                                    className="group flex flex-col rounded-2xl border border-[#eadfe0] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#7d2636] hover:shadow-lg"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7e9ec] text-[#7d2636] transition group-hover:bg-[#7d2636] group-hover:text-white">
                                        <Icon size={27} />
                                    </div>

                                    <h4 className="font-serif text-xl font-bold text-[#4b1f2a]">
                                        {tool.title}
                                    </h4>

                                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                                        {tool.description}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                        <span className="text-sm font-semibold text-[#7d2636]">
                                            {tool.label}
                                        </span>

                                        <ArrowRight
                                            size={19}
                                            className="text-[#7d2636] transition group-hover:translate-x-1"
                                        />
                                    </div>
                                </Link>
                            )
                        })}

                    </div>
                </section>

            </main>
        </div>
    )
}
