import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { CalendarCheck, Download, Mail, Phone, Users, Save } from 'lucide-react';

interface BookingItem {
    id: number;
    reference: string;
    inquiry_type: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    preferred_date?: string | null;
    guests_adults: number;
    guests_children: number;
    special_requests?: string | null;
    estimated_total?: string | number | null;
    status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
    admin_notes?: string | null;
    locale: string;
    created_at: string;
    tour?: { slug: string; translations?: Array<{ title: string }> } | null;
    dish?: { slug: string; translations?: Array<{ name: string }> } | null;
}

interface BookingsIndexProps {
    bookings: BookingItem[];
    filters: { status: string; inquiry_type: string };
}

const statusBadges: Record<string, string> = {
    new: 'bg-amber-950 text-amber-300 border-amber-700',
    contacted: 'bg-blue-950 text-blue-300 border-blue-700',
    confirmed: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    cancelled: 'bg-rose-950 text-rose-300 border-rose-700',
};

export default function BookingsIndex({ bookings = [], filters }: BookingsIndexProps) {
    const [editingNotes, setEditingNotes] = useState<Record<number, { status: string; admin_notes: string }>>({});

    const getEditState = (b: BookingItem) =>
        editingNotes[b.id] ?? { status: b.status, admin_notes: b.admin_notes || '' };

    const handleSave = (b: BookingItem) => {
        const state = getEditState(b);
        router.patch(`/admin/bookings/${b.id}`, state, {
            preserveScroll: true,
        });
    };

    const applyFilter = (status: string) => {
        router.get('/admin/bookings', status === 'all' ? {} : { status }, { preserveState: true });
    };

    return (
        <AdminLayout title="Bookings & Inquiries">
            <Head title="Bookings - Admin" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'new', 'contacted', 'confirmed', 'cancelled'].map((status) => {
                            const active = (filters?.status || 'all') === status;
                            return (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => applyFilter(status)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${
                                        active
                                            ? 'bg-gold text-slate-950 border-gold'
                                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                                    }`}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>

                    <a
                        href="/admin/bookings/export"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gold text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </a>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                        <CalendarCheck className="w-10 h-10 text-gold/40 mx-auto mb-3" />
                        <p className="text-sm font-medium">No bookings or inquiries found for this filter.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((b) => {
                            const state = getEditState(b);
                            const subject =
                                b.tour?.translations?.[0]?.title ||
                                b.dish?.translations?.[0]?.name ||
                                b.inquiry_type.toUpperCase();

                            return (
                                <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="font-mono text-sm font-bold text-gold">{b.reference}</span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border ${statusBadges[b.status] || statusBadges.new}`}>
                                                    {b.status}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] uppercase font-semibold">
                                                    {b.inquiry_type}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(b.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <h3 className="font-serif text-lg font-bold text-white mt-1">{subject}</h3>
                                        </div>

                                        {b.estimated_total !== null && b.estimated_total !== undefined && (
                                            <div className="text-right">
                                                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Estimated Quote</span>
                                                <span className="text-xl font-bold text-emerald-400">${Number(b.estimated_total).toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                                        <div>
                                            <div className="font-bold text-white text-sm mb-1">{b.customer_name}</div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Mail className="w-3.5 h-3.5 text-gold" /> {b.customer_email}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                                                <Phone className="w-3.5 h-3.5 text-gold" /> {b.customer_phone}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-3.5 h-3.5 text-gold" />
                                                <span>
                                                    {b.guests_adults} adults{b.guests_children > 0 ? `, ${b.guests_children} children` : ''}
                                                </span>
                                            </div>
                                            <div className="mt-1 text-slate-400">
                                                Preferred Date: <strong className="text-slate-200">{b.preferred_date ? b.preferred_date.slice(0, 10) : 'Flexible'}</strong>
                                            </div>
                                            <div className="mt-1 text-slate-400">
                                                Locale: <span className="uppercase font-mono">{b.locale}</span>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Traveler Notes</span>
                                            <p className="text-slate-300 whitespace-pre-wrap">{b.special_requests || 'None provided.'}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 items-end">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Status</label>
                                            <select
                                                value={state.status}
                                                onChange={(e) =>
                                                    setEditingNotes((prev) => ({
                                                        ...prev,
                                                        [b.id]: { ...state, status: e.target.value },
                                                    }))
                                                }
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Operator Notes</label>
                                            <input
                                                type="text"
                                                value={state.admin_notes}
                                                onChange={(e) =>
                                                    setEditingNotes((prev) => ({
                                                        ...prev,
                                                        [b.id]: { ...state, admin_notes: e.target.value },
                                                    }))
                                                }
                                                placeholder="Internal follow-up notes..."
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => handleSave(b)}
                                                className="w-full px-4 py-2 bg-gold text-slate-950 text-xs font-bold rounded-xl hover:bg-gold-light transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <Save className="w-3.5 h-3.5" /> Save Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

