import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LanguageSwitcher from './language-switcher';
import { PageProps } from '@/types';

export default function MainNavbar() {
    const { locale } = usePage<PageProps>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
            }`}
        >
            <Container>
                <Navbar.Brand as={Link} href={`/${locale}`} className={`font-serif text-2xl ${
                    isScrolled ? 'text-[#2c3e50]' : 'text-white'
                }`}>
                    XORAZM<span className="text-[#3498db]">TOUR</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto gap-lg-4 uppercase text-[11px] font-bold tracking-widest">
                        <Nav.Link as={Link} href={`/${locale}/tours`}>Tours</Nav.Link>
                        <Nav.Link as={Link} href={`/${locale}/cities`}>Cities</Nav.Link>
                        <Nav.Link as={Link} href={`/${locale}/festivals`}>Festivals</Nav.Link>
                        <Nav.Link as={Link} href={`/${locale}/transports`}>Transports</Nav.Link>
                        <Nav.Link as={Link} href={`/${locale}/about`}>About Us</Nav.Link>
                        <Nav.Link as={Link} href={`/${locale}/contacts`}>Contacts</Nav.Link>
                    </Nav>

                    <div className="ms-lg-4">
                        <LanguageSwitcher />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
