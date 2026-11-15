<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookingAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['tour.translations', 'dish.translations'])
            ->latest();

        if ($request->filled('status') && in_array($request->input('status'), ['new', 'contacted', 'confirmed', 'cancelled'], true)) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('inquiry_type') && in_array($request->input('inquiry_type'), ['tour', 'gastro', 'custom'], true)) {
            $query->where('inquiry_type', $request->input('inquiry_type'));
        }

        return Inertia::render('admin/bookings/index', [
            'bookings' => $query->get(),
            'filters' => [
                'status' => $request->input('status', 'all'),
                'inquiry_type' => $request->input('inquiry_type', 'all'),
            ],
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,confirmed,cancelled',
            'admin_notes' => 'nullable|string|max:3000',
        ]);

        $booking->update($validated);

        return back()->with('success', "Booking {$booking->reference} updated.");
    }

    public function export(): StreamedResponse
    {
        $bookings = Booking::with(['tour.translations', 'dish.translations'])->latest()->get();
        $filename = 'xorazm-bookings-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($bookings) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Reference',
                'Type',
                'Status',
                'Customer Name',
                'Email',
                'Phone',
                'Tour / Dish',
                'Preferred Date',
                'Adults',
                'Children',
                'Estimated Total ($)',
                'Locale',
                'Special Requests',
                'Admin Notes',
                'Created At',
            ]);

            foreach ($bookings as $b) {
                $subjectTitle = $b->tour?->translations->first()?->title
                    ?? $b->dish?->translations->first()?->name
                    ?? '-';

                fputcsv($handle, array_map($this->sanitizeCsvCell(...), [
                    $b->reference,
                    $b->inquiry_type,
                    $b->status,
                    $b->customer_name,
                    $b->customer_email,
                    $b->customer_phone,
                    $subjectTitle,
                    $b->preferred_date?->format('Y-m-d') ?? '',
                    $b->guests_adults,
                    $b->guests_children,
                    $b->estimated_total ?? '',
                    $b->locale,
                    $b->special_requests ?? '',
                    $b->admin_notes ?? '',
                    $b->created_at?->toIso8601String() ?? '',
                ]));
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function sanitizeCsvCell(mixed $value): string
    {
        $str = (string) $value;
        if ($str !== '' && in_array($str[0], ['=', '+', '-', '@', "\t", "\r"], true)) {
            return "'" . $str;
        }

        return $str;
    }
}

