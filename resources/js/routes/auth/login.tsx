import React, { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Compass } from 'lucide-react';
import AlertError from '@/components/alert-error';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
    canRegister?: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-navy text-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="Admin Login - Xorazm Tour" />

            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold/30 to-gold/10 border border-gold/40 flex items-center justify-center mb-4 shadow-xl shadow-gold/5">
                        <Compass className="w-8 h-8 text-gold animate-pulse" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-ivory">
                        Xorazm Tour Admin
                    </h2>
                    <p className="mt-2 text-sm text-gold-muted">
                        Enter your credentials to access the management portal
                    </p>
                </motion.div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-navy-light/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-gold/20 sm:px-10"
                >
                    {status && (
                        <div className="mb-4 text-sm text-emerald-400 font-medium p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
                            {status}
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6">
                            <AlertError errors={Object.values(errors)} />
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-semibold text-gold tracking-wider uppercase mb-2">
                                Login / Username
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy/40">
                                    <User className="h-5 w-5 text-gold-muted" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-navy/90 border border-gold/30 rounded-xl text-ivory placeholder-navy/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm transition-all"
                                    placeholder="Username or email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gold tracking-wider uppercase mb-2">
                                Password
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy/40">
                                    <Lock className="h-5 w-5 text-gold-muted" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-navy/90 border border-gold/30 rounded-xl text-ivory placeholder-navy/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-gold border-gold/40 bg-navy rounded focus:ring-gold"
                                />
                                <label htmlFor="remember" className="ml-2 block text-xs text-ivory/80">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl border border-gold bg-gold text-navy font-bold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all duration-300 shadow-lg shadow-gold/10 text-sm disabled:opacity-50"
                            >
                                {processing ? (
                                    <span>Signing in...</span>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
