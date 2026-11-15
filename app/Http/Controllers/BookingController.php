<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmationMail;
use App\Mail\BookingOperatorNotificationMail;
use App\Models\Booking;
use App\Models\Tour;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        if ($request->filled('website')) {
            return response()->json([
                'reference' => 'XT-' . now()->format('Y') . '-000000',
                'status' => 'new',
                'message' => 'Booking request received.',
            ], 201);
        }

        $validated = $request->validate([
            'inquiry_type' => 'nullable|in:tour,gastro,custom',
            'tour_id' => 'nullable|integer|exists:tours,id',
            'dish_id' => 'nullable|integer|exists:dishes,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:50',
            'preferred_date' => 'nullable|date|after_or_equal:today',
            'guests_adults' => 'required|integer|min:1|max:50',
            'guests_children' => 'nullable|integer|min:0|max:50',
            'special_requests' => 'nullable|string|max:3000',
            'locale' => 'nullable|in:en,ru,uz',
        ]);

        $inquiryType = $validated['inquiry_type'] ?? ($validated['dish_id'] ?? null ? 'gastro' : 'tour');
        $adults = (int) $validated['guests_adults'];
        $children = (int) ($validated['guests_children'] ?? 0);
        $locale = $validated['locale'] ?? 'en';

        $estimatedTotal = null;
        if (! empty($validated['tour_id'])) {
            $tour = Tour::with('translations')->find($validated['tour_id']);
            if ($tour) {
                $estimatedTotal = $this->estimateTourTotal($tour, $adults, $children, $locale);
            }
        }

        $reference = $this->generateUniqueReference();

        $booking = Booking::create([
            'reference' => $reference,
            'inquiry_type' => $inquiryType,
            'tour_id' => $validated['tour_id'] ?? null,
            'dish_id' => $validated['dish_id'] ?? null,
            'customer_name' => $validated['customer_name'],
            'customer_email' => strtolower(trim($validated['customer_email'])),
            'customer_phone' => $validated['customer_phone'],
            'preferred_date' => $validated['preferred_date'] ?? null,
            'guests_adults' => $adults,
            'guests_children' => $children,
            'special_requests' => $validated['special_requests'] ?? null,
            'estimated_total' => $estimatedTotal,
            'status' => 'new',
            'locale' => $locale,
        ]);

        $operatorEmail = config('mail.from.address') ?: 'xorazmtour@gmail.com';
        Mail::to($booking->customer_email)->queue(new BookingConfirmationMail($booking));
        Mail::to($operatorEmail)->queue(new BookingOperatorNotificationMail($booking));

        return response()->json([
            'reference' => $booking->reference,
            'estimated_total' => $booking->estimated_total,
            'status' => $booking->status,
            'message' => 'Booking request received successfully.',
        ], 201);
    }

    private function estimateTourTotal(Tour $tour, int $adults, int $children, string $locale): ?float
    {
        $totalGuests = $adults + $children;
        $trans = $tour->translations->where('locale', $locale)->first()
            ?? $tour->translations->where('locale', 'en')->first()
            ?? $tour->translations->first();

        $tiers = (! empty($trans?->pricing_tiers) && is_array($trans->pricing_tiers))
            ? $trans->pricing_tiers
            : ($tour->pricing_tiers ?? []);

        $matchedPerPerson = null;
        if (is_array($tiers) && count($tiers) > 0) {
            foreach ($tiers as $tier) {
                $label = (string) ($tier['group_size'] ?? '');
                $price = isset($tier['price_per_person']) && is_numeric($tier['price_per_person'])
                    ? (float) $tier['price_per_person']
                    : null;
                if ($price === null) {
                    continue;
                }

                if (preg_match('/(\d+)\s*[-–]\s*(\d+)/', $label, $m)) {
                    if ($totalGuests >= (int) $m[1] && $totalGuests <= (int) $m[2]) {
                        $matchedPerPerson = $price;
                        break;
                    }
                } elseif (preg_match('/(\d+)\s*\+/', $label, $m)) {
                    if ($totalGuests >= (int) $m[1]) {
                        $matchedPerPerson = $price;
                        break;
                    }
                } elseif (preg_match('/(\d+)/', $label, $m)) {
                    if ($totalGuests === (int) $m[1]) {
                        $matchedPerPerson = $price;
                        break;
                    }
                }
            }

            if ($matchedPerPerson === null) {
                $prices = array_values(array_filter(array_map(
                    fn ($tier) => isset($tier['price_per_person']) && is_numeric($tier['price_per_person']) ? (float) $tier['price_per_person'] : null,
                    $tiers
                )));
                if (count($prices) > 0) {
                    $matchedPerPerson = min($prices);
                }
            }
        }

        $unitPrice = $matchedPerPerson ?? ($tour->cost !== null ? (float) $tour->cost : null);
        if ($unitPrice === null) {
            return null;
        }

        // Children charged at 50% estimate for quote preview
        return round(($adults * $unitPrice) + ($children * $unitPrice * 0.5), 2);
    }

    private function generateUniqueReference(): string
    {
        do {
            $ref = 'XT-' . now()->format('Y') . '-' . strtoupper(Str::random(6));
        } while (Booking::where('reference', $ref)->exists());

        return $ref;
    }
}

