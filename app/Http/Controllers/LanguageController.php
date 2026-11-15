<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function switch(string $locale)
    {
        abort_unless(in_array($locale, ['en', 'ru', 'uz']), 404);

        Session::put('locale', $locale);

        $previous = url()->previous();
        $path = parse_url($previous, PHP_URL_PATH) ?? '/';
        $query = parse_url($previous, PHP_URL_QUERY);

        $trimmed = trim($path, '/');
        $segments = $trimmed === '' ? [] : explode('/', $trimmed);

        // Non-localized internal paths (admin, auth, etc.) keep their path and apply session locale
        if (in_array($segments[0] ?? null, ['admin', 'login', 'logout', 'dashboard', 'language', 'api'])) {
            return redirect()->back();
        }

        if (in_array($segments[0] ?? null, ['en', 'ru', 'uz'])) {
            $segments[0] = $locale;
        } else {
            array_unshift($segments, $locale);
        }

        $target = '/' . implode('/', $segments);
        if (! empty($query)) {
            $target .= '?' . $query;
        }

        return redirect($target);
    }
}
