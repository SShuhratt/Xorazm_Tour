<?php
//
//namespace App\Http\Controllers;
//
//use App\Models\TourSchedule;
//use Inertia\Inertia;
//
//class TourScheduleController extends Controller
//{
//    public function index(){
//        $tourSchedules = TourSchedule::with(['translations', 'mainImage'])
//            ->where('status', true)
//            ->get();
//
//        return Inertia::render('tour_schedules/index', [
//            'tour_schedules' => $tourSchedules,
//            'locale' => app()->getLocale(),
//        ]);
//    }
//
//    public function show(TourSchedule $tourSchedule)
//    {
//        $tourSchedule->load(['translations', 'mainImage', 'images']);
//        return Inertia::render('tour_schedules/show', ['tourSchedule' => $tourSchedule]);
//    }
//}
