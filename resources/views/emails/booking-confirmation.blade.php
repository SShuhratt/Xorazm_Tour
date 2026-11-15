<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #0B1F3A; color: #D4AF37; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">Xorazm Tour &amp; Travels</h1>
        <p style="margin: 6px 0 0; color: #FEFCF6; font-size: 14px;">Booking Reference: <strong>{{ $booking->reference }}</strong></p>
    </div>
    <div style="background: #FEFCF6; border: 1px solid #E5DCC3; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
        <p>Dear {{ $booking->customer_name }},</p>
        <p>Thank you for your travel inquiry. Our Khiva travel specialists have received your request and will contact you shortly.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 0; font-weight: bold;">Reference:</td><td>{{ $booking->reference }}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Type:</td><td>{{ ucfirst($booking->inquiry_type) }}</td></tr>
            @if($booking->tour)
                <tr><td style="padding: 6px 0; font-weight: bold;">Tour:</td><td>{{ $booking->tour->translations->where('locale', $booking->locale)->first()?->title ?? $booking->tour->translations->first()?->title ?? $booking->tour->slug }}</td></tr>
            @endif
            @if($booking->dish)
                <tr><td style="padding: 6px 0; font-weight: bold;">Culinary Focus:</td><td>{{ $booking->dish->translations->where('locale', $booking->locale)->first()?->name ?? $booking->dish->translations->first()?->name ?? $booking->dish->slug }}</td></tr>
            @endif
            @if($booking->preferred_date)
                <tr><td style="padding: 6px 0; font-weight: bold;">Preferred Date:</td><td>{{ $booking->preferred_date->format('Y-m-d') }}</td></tr>
            @endif
            <tr><td style="padding: 6px 0; font-weight: bold;">Guests:</td><td>{{ $booking->guests_adults }} adults{{ $booking->guests_children > 0 ? ', ' . $booking->guests_children . ' children' : '' }}</td></tr>
            @if($booking->estimated_total !== null)
                <tr><td style="padding: 6px 0; font-weight: bold;">Estimated Total:</td><td>${{ number_format((float) $booking->estimated_total, 2) }}</td></tr>
            @endif
        </table>
        <p style="font-size: 12px; color: #64748b;">Need immediate assistance? Contact us at xorazmtour@gmail.com or +998 94 315 75 79.</p>
    </div>
</body>
</html>

