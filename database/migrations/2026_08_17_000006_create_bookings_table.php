<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('inquiry_type')->default('tour');
            $table->foreignId('tour_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('dish_id')->nullable()->constrained()->nullOnDelete();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->date('preferred_date')->nullable();
            $table->unsignedInteger('guests_adults')->default(1);
            $table->unsignedInteger('guests_children')->default(0);
            $table->text('special_requests')->nullable();
            $table->decimal('estimated_total', 10, 2)->nullable();
            $table->string('status')->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('locale', 5)->default('en');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

