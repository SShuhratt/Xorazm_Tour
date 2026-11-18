<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_visits', function (Blueprint $table) {
            $table->id();
            $table->string('visitor_hash', 64);
            $table->date('visited_date');
            $table->string('country_code', 8)->default('XX');
            $table->string('country_name', 100)->default('Unknown');
            $table->string('path', 255)->nullable();
            $table->unsignedInteger('visits_count')->default(1);
            $table->timestamps();

            $table->unique(['visitor_hash', 'visited_date']);
            $table->index(['visited_date', 'country_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_visits');
    }
};

