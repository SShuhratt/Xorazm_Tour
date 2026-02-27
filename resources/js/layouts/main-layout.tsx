import React from 'react';
import Navbar from '@/components/navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#fffcf9]">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
