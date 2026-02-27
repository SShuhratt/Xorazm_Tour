import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-ivory flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
        </div>
    );
}
