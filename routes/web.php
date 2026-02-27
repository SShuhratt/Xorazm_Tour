<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\FestivalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\TransportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/language/{locale}', [LanguageController::class, 'switch'])
    ->where('locale', 'en|ru|uz');

Route::get('/', function () {
    $locale = session('locale', config('app.locale'));
    return redirect()->route('home', ['locale' => $locale]);
});

Route::group([
    'prefix' => '{locale}',
    'where' => ['locale' => 'en|ru|uz']
], function () {

    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
    Route::get('/tours/{tour:slug}', [TourController::class, 'show'])->name('tours.show');

    Route::get('/cities', [CityController::class, 'index'])->name('cities.index');
    Route::get('/cities/{city:slug}', [CityController::class, 'show'])->name('cities.show');

    Route::get('/festivals', [FestivalController::class, 'index'])->name('festivals.index');
    Route::get('/festivals/{festival:slug}', [FestivalController::class, 'show'])->name('festivals.show');

    Route::get('/hotels', [HotelController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/{hotel:slug}', [HotelController::class, 'show'])->name('hotels.show');

    Route::get('/transports', [TransportController::class, 'index'])->name('transports.index');
    Route::get('/transports/{transport:slug}', [TransportController::class, 'show'])->name('transports.show');

    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

    // New static pages
    Route::inertia('/about', 'about')->name('about');
    Route::inertia('/contact', 'contact')->name('contact');

});
