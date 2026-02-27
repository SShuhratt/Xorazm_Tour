<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale =
            $request->route('locale')
            ?? session('locale')
            ?? config('app.locale');

        $allowed = ['en', 'ru', 'uz'];
        $locale = in_array($locale, $allowed) ? $locale : config('app.locale');

        App::setLocale($locale);

        return $next($request);
    }

}
