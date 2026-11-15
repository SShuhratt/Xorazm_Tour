<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Booking Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2>New {{ ucfirst($booking->inquiry_type) }} Inquiry ({{ $booking->reference }})</h2>
    <p><strong>Customer:</strong> {{ $booking->customer_name }}</p>
    <p><strong>Email:</strong> {{ $booking->customer_email }}</p>
    <p><strong>Phone:</strong> {{ $booking->customer_phone }}</p>
    <p><strong>Preferred Date:</strong> {{ $booking->preferred_date?->format('Y-m-d') ?? 'Flexible' }}</p>
    <p><strong>Guests:</strong> {{ $booking->guests_adults }} adults, {{ $booking->guests_children }} children</p>
    @if($booking->tour)
        <p><strong>Tour:</strong> {{ $booking->tour->translations->first()?->title ?? $booking->tour->slug }}</p>
    @endif
    @if($booking->dish)
        <p><strong>Dish / Gastro Inquiry:</strong> {{ $booking->dish->translations->first()?->name ?? $booking->dish->slug }}</p>
    @endif
    @if($booking->estimated_total !== null)
        <p><strong>Estimated Total:</strong> ${{ number_format((float) $booking->estimated_total, 2) }}</p>
    @endif
    @if($booking->special_requests)
        <p><strong>Special Requests:</strong></p>
        <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-left: 3px solid #D4AF37;">{{ $booking->special_requests }}</p>
    @endif
</body>
</html>

