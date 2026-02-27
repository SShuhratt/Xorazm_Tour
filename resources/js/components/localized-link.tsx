import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';

interface LocalizedLinkProps extends React.ComponentProps<typeof Link> {
    href: string;
}

export default function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
    const { locale } = usePage<PageProps>().props;

    const cleanHref = href.startsWith('/') ? href : `/${href}`;
    const localizedHref = `/${locale}${cleanHref}`;

    return (
        <Link {...props} href={localizedHref}>
            {children}
        </Link>
    );
}
