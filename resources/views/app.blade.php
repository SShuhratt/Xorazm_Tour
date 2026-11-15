<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Xorazm Tour and Travels') }}</title>
    <meta name="description" content="Explore Khiva, Bukhara, Samarkand, and the Silk Road with Xorazm Tour and Travels. Curated private tours, heritage hotels, and local hospitality in Uzbekistan.">
    <meta property="og:site_name" content="Xorazm Tour and Travels">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ config('app.name', 'Xorazm Tour and Travels') }}">
    <meta property="og:description" content="Curated cultural tours, boutique stays, and private transport across Khorezm and Uzbekistan.">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/logo.png') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="google-site-verification" content="SC2SWe7mGPI3VnbkvV3Aqd06FPgLf-SI-NDJH2MYYqs" />

    @php
        $requestPath = ltrim(request()->path(), '/');
        $segments = $requestPath === '' ? [] : explode('/', $requestPath);
        $isLocalizedRoute = in_array($segments[0] ?? null, ['en', 'ru', 'uz'], true);
        $subPath = $isLocalizedRoute ? implode('/', array_slice($segments, 1)) : null;
        $base = rtrim(url('/'), '/');
    @endphp
    @if ($isLocalizedRoute)
        <link rel="canonical" href="{{ url()->current() }}">
        @foreach (['en', 'ru', 'uz'] as $altLocale)
            <link rel="alternate" hreflang="{{ $altLocale }}" href="{{ $base . '/' . $altLocale . ($subPath ? '/' . $subPath : '') }}">
        @endforeach
        <link rel="alternate" hreflang="x-default" href="{{ $base . '/en' . ($subPath ? '/' . $subPath : '') }}">
    @endif

    <!-- Custom Xorazm Tour branding icons (Google Search Favicon Guidelines: multiple of 48px square) -->
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=6">
    <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png?v=6">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png?v=6">
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png?v=6">
    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=6">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=6">
    <link rel="shortcut icon" href="/favicon-48x48.png?v=6">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#0E2439">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">

    @verbatim
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Xorazm Tour and Travels",
        "url": "https://www.xorazm-tour.uz",
        "email": "xorazmtour@gmail.com",
        "telephone": "+998943157579",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Khiva",
            "addressRegion": "Xorazm",
            "addressCountry": "UZ"
        }
    }
    </script>
    @endverbatim

    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
