<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class LanguageController extends Controller
{
    public function switch(string $locale)
    {
        abort_unless(in_array($locale, ['en', 'ru', 'uz']), 404);

        $previous = url()->previous();
        $path = parse_url($previous, PHP_URL_PATH) ?? '/';

        $segments = explode('/', trim($path, '/'));

        // If URL already has locale → replace it
        if (in_array($segments[0] ?? null, ['en', 'ru', 'uz'])) {
            $segments[0] = $locale;
        } else {
            array_unshift($segments, $locale);
        }

        return redirect('/' . implode('/', $segments));
    }
}

