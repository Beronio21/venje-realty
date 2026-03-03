"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const INITIAL_USERS = [
  { id: 1, name: "Admin", username: "admin", email: "admin@venjerealty.ph", role: "admin" },
  { id: 2, name: "User", username: "user", email: "user@venjerealty.ph", role: "user" },
];

const INITIAL_PROPERTIES = [
  { id: "1", title: "Modern Apartment", location: "Cagayan de Oro", price: "₱8,500,000", category: "apartment", status: "Sell" },
  { id: "2", title: "City Apartment", location: "Davao City", price: "₱10,200,000", category: "apartment", status: "Buy" },
  { id: "3", title: "Luxury Apartment", location: "Cebu City", price: "₱12,500,000", category: "apartment", status: "Sell" },
  { id: "4", title: "Mithra Villa", location: "Makati", price: "₱11,000,000", category: "villa", status: "Buy" },
  { id: "5", title: "Palm Villa", location: "Quezon City", price: "₱14,000,000", category: "villa", status: "Sell" },
  { id: "6", title: "Sunset Villa", location: "Cagayan de Oro", price: "₱15,500,000", category: "villa", status: "Buy" },
  { id: "7", title: "Downtown Office", location: "Davao City", price: "₱18,000,000", category: "office", status: "Sell" },
  { id: "8", title: "IT Office Space", location: "Cebu City", price: "₱22,500,000", category: "office", status: "Buy" },
];

type Tab = "overview" | "properties" | "users";

const navItems = [
  { id: "overview", label: "Overview", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { id: "properties", label: "Properties", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
  )},
  { id: "users", label: "Users", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  )},
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userModal, setUserModal] = useState(false);
  const [propModal, setPropModal] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [editProp, setEditProp] = useState<any>(null);
  const [userForm, setUserForm] = useState({ name: "", username: "", email: "", role: "user" });
  const [propForm, setPropForm] = useState({ title: "", location: "", price: "", category: "apartment", status: "Sell" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (!stored) { router.push("/signin"); return; }
      const parsed = JSON.parse(stored);
      if (parsed.user !== "admin") { router.push("/"); }
    }
  }, []);

  const saveUser = () => {
    if (editUser) setUsers(users.map(u => u.id === editUser.id ? { ...editUser, ...userForm } : u));
    else setUsers([...users, { id: Date.now(), ...userForm }]);
    setUserModal(false); setEditUser(null); setUserForm({ name: "", username: "", email: "", role: "user" });
  };
  const deleteUser = (id: number) => { if (confirm("Delete this user?")) setUsers(users.filter(u => u.id !== id)); };
  const openEditUser = (u: any) => { setEditUser(u); setUserForm({ name: u.name, username: u.username, email: u.email, role: u.role }); setUserModal(true); };

  const saveProp = () => {
    if (editProp) setProperties(properties.map(p => p.id === editProp.id ? { ...editProp, ...propForm } : p));
    else setProperties([...properties, { id: String(Date.now()), ...propForm }]);
    setPropModal(false); setEditProp(null); setPropForm({ title: "", location: "", price: "", category: "apartment", status: "Sell" });
  };
  const deleteProp = (id: string) => { if (confirm("Delete this property?")) setProperties(properties.filter(p => p.id !== id)); };
  const openEditProp = (p: any) => { setEditProp(p); setPropForm({ title: p.title, location: p.location, price: p.price, category: p.category, status: p.status }); setPropModal(true); };

  const handleLogout = () => { localStorage.removeItem("user"); router.push("/signin"); };

  const stats = [
    { label: "Total Properties", value: properties.length, icon: "🏠", bg: "bg-emerald-500" },
    { label: "Total Users", value: users.length, icon: "👥", bg: "bg-blue-500" },
    { label: "For Rent/Sell", value: properties.filter(p => p.status === "Sell").length, icon: "🏷️", bg: "bg-amber-500" },
    { label: "For Buy", value: properties.filter(p => p.status === "Buy").length, icon: "🔑", bg: "bg-purple-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-darkmode">

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 bg-[#052e16] dark:bg-[#021a0d] shadow-2xl ${sidebarOpen ? "w-64" : "w-20"}`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-emerald-900/50">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          {sidebarOpen && <span className="text-white font-bold text-lg">Venje <span className="text-emerald-400">Admin</span></span>}
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 bg-emerald-900/40 border border-emerald-800 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
            <div>
              <p className="text-white font-semibold text-sm">Admin</p>
              <p className="text-emerald-400 text-xs">Administrator</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                tab === item.id
                  ? "bg-primary text-white"
                  : "text-emerald-300 hover:bg-emerald-900/40 hover:text-white"
              }`}>
              {item.icon}
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-3 pb-6 space-y-1 border-t border-emerald-900/50 pt-4">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-emerald-300 hover:bg-emerald-900/40 hover:text-white transition-all">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {sidebarOpen && <span className="font-medium text-sm">Back to Site</span>}
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-darklight border-b border-gray-200 dark:border-dark_border px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-darkmode transition-all text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 className="font-bold text-midnight_text dark:text-white capitalize">{tab}</h1>
              <p className="text-xs text-gray">Venje Realty Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-midnight_text dark:text-white">Admin</p>
              <p className="text-xs text-primary">Administrator</p>
            </div>
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">

          {/* Overview */}
          {tab === "overview" && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white dark:bg-darklight rounded-2xl p-5 border border-gray-100 dark:border-dark_border shadow-sm">
                    <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>{s.icon}</div>
                    <p className="text-3xl font-extrabold text-midnight_text dark:text-white">{s.value}</p>
                    <p className="text-gray text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent properties */}
                <div className="bg-white dark:bg-darklight rounded-2xl border border-gray-100 dark:border-dark_border p-6">
                  <h2 className="font-bold text-midnight_text dark:text-white text-base mb-4">Recent Properties</h2>
                  <div className="space-y-3">
                    {properties.slice(0, 5).map(p => (
                      <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-dark_border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-midnight_text dark:text-white">{p.title}</p>
                          <p className="text-xs text-gray">{p.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">{p.price}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.status === "Sell" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Users list */}
                <div className="bg-white dark:bg-darklight rounded-2xl border border-gray-100 dark:border-dark_border p-6">
                  <h2 className="font-bold text-midnight_text dark:text-white text-base mb-4">Users</h2>
                  <div className="space-y-3">
                    {users.map(u => (
                      <div key={u.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-dark_border last:border-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${u.role === "admin" ? "bg-purple-500" : "bg-primary"}`}>
                          {u.name[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-midnight_text dark:text-white">{u.name}</p>
                          <p className="text-xs text-gray">{u.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"}`}>{u.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Properties */}
          {tab === "properties" && (
            <div className="bg-white dark:bg-darklight rounded-2xl border border-gray-100 dark:border-dark_border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-midnight_text dark:text-white text-lg">Properties <span className="text-gray font-normal text-sm">({properties.length})</span></h2>
                <button onClick={() => { setEditProp(null); setPropForm({ title: "", location: "", price: "", category: "apartment", status: "Sell" }); setPropModal(true); }}
                  className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Property
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray text-left border-b border-gray-100 dark:border-dark_border">
                      <th className="pb-3 font-semibold">Title</th>
                      <th className="pb-3 font-semibold">Location</th>
                      <th className="pb-3 font-semibold">Price</th>
                      <th className="pb-3 font-semibold">Category</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(p => (
                      <tr key={p.id} className="border-b border-gray-50 dark:border-dark_border last:border-0 hover:bg-gray-50 dark:hover:bg-darkmode transition-colors">
                        <td className="py-3 text-midnight_text dark:text-white font-medium">{p.title}</td>
                        <td className="py-3 text-gray">{p.location}</td>
                        <td className="py-3 text-primary font-semibold">{p.price}</td>
                        <td className="py-3 capitalize text-gray">{p.category}</td>
                        <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === "Sell" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{p.status}</span></td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEditProp(p)} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-200 transition-all">Edit</button>
                            <button onClick={() => deleteProp(p.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-200 transition-all">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === "users" && (
            <div className="bg-white dark:bg-darklight rounded-2xl border border-gray-100 dark:border-dark_border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-midnight_text dark:text-white text-lg">Users <span className="text-gray font-normal text-sm">({users.length})</span></h2>
                <button onClick={() => { setEditUser(null); setUserForm({ name: "", username: "", email: "", role: "user" }); setUserModal(true); }}
                  className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray text-left border-b border-gray-100 dark:border-dark_border">
                      <th className="pb-3 font-semibold">Name</th>
                      <th className="pb-3 font-semibold">Username</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-gray-50 dark:border-dark_border last:border-0 hover:bg-gray-50 dark:hover:bg-darkmode transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${u.role === "admin" ? "bg-purple-500" : "bg-primary"}`}>{u.name[0]}</div>
                            <span className="text-midnight_text dark:text-white font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray font-mono">{u.username}</td>
                        <td className="py-3 text-gray">{u.email}</td>
                        <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"}`}>{u.role}</span></td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEditUser(u)} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-200 transition-all">Edit</button>
                            <button onClick={() => deleteUser(u.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-200 transition-all">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Modal */}
      {userModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darklight rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-6">{editUser ? "Edit User" : "Add User"}</h3>
            <div className="space-y-4">
              {[["Name", "name", "text"], ["Username", "username", "text"], ["Email", "email", "email"]].map(([label, key, type]) => (
                <div key={key}>
                  <label className="text-sm font-semibold text-gray mb-1 block">{label}</label>
                  <input type={type} value={(userForm as any)[key]} onChange={e => setUserForm({ ...userForm, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark_border dark:bg-darkmode dark:text-white focus:border-primary focus-visible:outline-none" />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-gray mb-1 block">Role</label>
                <select value={userForm.role} onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark_border dark:bg-darkmode dark:text-white focus:border-primary focus-visible:outline-none">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveUser} className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">Save</button>
              <button onClick={() => setUserModal(false)} className="flex-1 py-3 border border-gray-200 dark:border-dark_border text-midnight_text dark:text-white font-semibold rounded-xl hover:border-primary transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Property Modal */}
      {propModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darklight rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-midnight_text dark:text-white mb-6">{editProp ? "Edit Property" : "Add Property"}</h3>
            <div className="space-y-4">
              {[["Title", "title", "text"], ["Location", "location", "text"], ["Price (e.g. ₱8,500,000)", "price", "text"]].map(([label, key, type]) => (
                <div key={key}>
                  <label className="text-sm font-semibold text-gray mb-1 block">{label}</label>
                  <input type={type} value={(propForm as any)[key]} onChange={e => setPropForm({ ...propForm, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark_border dark:bg-darkmode dark:text-white focus:border-primary focus-visible:outline-none" />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-gray mb-1 block">Category</label>
                <select value={propForm.category} onChange={e => setPropForm({ ...propForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark_border dark:bg-darkmode dark:text-white focus:border-primary focus-visible:outline-none">
                  {["apartment", "villa", "office", "shop", "house", "warehouse"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray mb-1 block">Status</label>
                <select value={propForm.status} onChange={e => setPropForm({ ...propForm, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark_border dark:bg-darkmode dark:text-white focus:border-primary focus-visible:outline-none">
                  <option value="Sell">Sell</option>
                  <option value="Buy">Buy</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveProp} className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all">Save</button>
              <button onClick={() => setPropModal(false)} className="flex-1 py-3 border border-gray-200 dark:border-dark_border text-midnight_text dark:text-white font-semibold rounded-xl hover:border-primary transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
