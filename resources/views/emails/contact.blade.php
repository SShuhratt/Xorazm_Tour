<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #2D3748;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #E5DCC3;
            border-radius: 8px;
            background-color: #FEFCF6;
        }
        .header {
            background: linear-gradient(135deg, #0B1F3A 0%, #132D54 100%);
            color: #D4AF37;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #0B1F3A;
            margin-bottom: 8px;
        }
        .field-value {
            background-color: #F5E6C8;
            padding: 12px;
            border-radius: 4px;
            border-left: 4px solid #D4AF37;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E5DCC3;
            font-size: 12px;
            color: #6B7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
        </div>

        <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">{{ $name }}</div>
        </div>

        <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">{{ $email }}</div>
        </div>

        <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">{{ $subject }}</div>
        </div>

        <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value" style="white-space: pre-wrap;">{{ $message }}</div>
        </div>

        <div class="footer">
            <p>This message was sent from your Xorazm Tour website contact form.</p>
            <p>&copy; {{ date('Y') }} Xorazm Tour. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
