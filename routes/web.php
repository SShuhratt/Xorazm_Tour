<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\FestivalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\TransportController;
use App\Http\Controllers\DishController;
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

    Route::get('/dishes', [DishController::class, 'index'])->name('dishes.index');
    Route::get('/dishes/{slug}', [DishController::class, 'show'])->name('dishes.show');

    // New static pages
    Route::inertia('/about', 'about')->name('about');
    Route::inertia('/contact', 'contact')->name('contact');

});

use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\CityAdminController;
use App\Http\Controllers\Admin\TourAdminController;
use App\Http\Controllers\Admin\HotelAdminController;
use App\Http\Controllers\Admin\FestivalAdminController;
use App\Http\Controllers\Admin\TransportAdminController;
use App\Http\Controllers\Admin\PostAdminController;
use App\Http\Controllers\Admin\ImageAdminController;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');

    Route::resource('cities', CityAdminController::class)->except(['show']);
    Route::resource('tours', TourAdminController::class)->except(['show']);
    Route::resource('hotels', HotelAdminController::class)->except(['show']);
    Route::resource('festivals', FestivalAdminController::class)->except(['show']);
    Route::resource('transports', TransportAdminController::class)->except(['show']);
    Route::resource('posts', PostAdminController::class)->except(['show']);

    Route::post('images/upload', [ImageAdminController::class, 'upload'])->name('images.upload');
    Route::delete('images/{image}', [ImageAdminController::class, 'destroy'])->name('images.destroy');
    Route::post('images/{image}/set-main', [ImageAdminController::class, 'setMain'])->name('images.set-main');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

