<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            if (!Schema::hasColumn('hotels', 'stars')) {
                $table->unsignedTinyInteger('stars')->nullable()->after('phone_number');
            }
            if (!Schema::hasColumn('hotels', 'price_from')) {
                $table->decimal('price_from', 10, 2)->nullable()->after('stars');
            }
            if (!Schema::hasColumn('hotels', 'email')) {
                $table->string('email')->nullable()->after('price_from');
            }
        });

        Schema::table('hotel_translations', function (Blueprint $table) {
            if (!Schema::hasColumn('hotel_translations', 'amenities')) {
                $table->json('amenities')->nullable()->after('description');
            }
            if (!Schema::hasColumn('hotel_translations', 'rooms')) {
                $table->json('rooms')->nullable()->after('amenities');
            }
        });

        Schema::table('dish_translations', function (Blueprint $table) {
            if (!Schema::hasColumn('dish_translations', 'origin')) {
                $table->string('origin')->nullable()->after('name');
            }
            if (!Schema::hasColumn('dish_translations', 'type')) {
                $table->string('type')->nullable()->after('origin');
            }
            if (!Schema::hasColumn('dish_translations', 'history')) {
                $table->text('history')->nullable()->after('description');
            }
            if (!Schema::hasColumn('dish_translations', 'ingredients')) {
                $table->json('ingredients')->nullable()->after('history');
            }
        });

        Schema::table('city_translations', function (Blueprint $table) {
            if (!Schema::hasColumn('city_translations', 'era')) {
                $table->string('era')->nullable()->after('description');
            }
            if (!Schema::hasColumn('city_translations', 'heritage_status')) {
                $table->string('heritage_status')->nullable()->after('era');
            }
            if (!Schema::hasColumn('city_translations', 'recommended_time')) {
                $table->string('recommended_time')->nullable()->after('heritage_status');
            }
            if (!Schema::hasColumn('city_translations', 'highlights')) {
                $table->json('highlights')->nullable()->after('recommended_time');
            }
        });

        Schema::table('festivals', function (Blueprint $table) {
            if (!Schema::hasColumn('festivals', 'video_url')) {
                $table->string('video_url')->nullable()->after('longitude');
            }
        });

        Schema::table('festival_translations', function (Blueprint $table) {
            if (!Schema::hasColumn('festival_translations', 'event_season')) {
                $table->string('event_season')->nullable()->after('description');
            }
            if (!Schema::hasColumn('festival_translations', 'festival_type')) {
                $table->string('festival_type')->nullable()->after('event_season');
            }
            if (!Schema::hasColumn('festival_translations', 'highlight')) {
                $table->string('highlight')->nullable()->after('festival_type');
            }
        });

        Schema::table('tours', function (Blueprint $table) {
            if (!Schema::hasColumn('tours', 'category')) {
                $table->string('category', 50)->default('cultural')->after('status');
            }
            if (!Schema::hasColumn('tours', 'max_group_size')) {
                $table->unsignedSmallInteger('max_group_size')->nullable()->after('cost');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $cols = array_values(array_filter(['category', 'max_group_size'], fn ($c) => Schema::hasColumn('tours', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });

        Schema::table('festival_translations', function (Blueprint $table) {
            $cols = array_values(array_filter(['event_season', 'festival_type', 'highlight'], fn ($c) => Schema::hasColumn('festival_translations', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });

        Schema::table('festivals', function (Blueprint $table) {
            if (Schema::hasColumn('festivals', 'video_url')) {
                $table->dropColumn('video_url');
            }
        });

        Schema::table('city_translations', function (Blueprint $table) {
            $cols = array_values(array_filter(['era', 'heritage_status', 'recommended_time', 'highlights'], fn ($c) => Schema::hasColumn('city_translations', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });

        Schema::table('dish_translations', function (Blueprint $table) {
            $cols = array_values(array_filter(['origin', 'type', 'history', 'ingredients'], fn ($c) => Schema::hasColumn('dish_translations', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });

        Schema::table('hotel_translations', function (Blueprint $table) {
            $cols = array_values(array_filter(['amenities', 'rooms'], fn ($c) => Schema::hasColumn('hotel_translations', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });

        Schema::table('hotels', function (Blueprint $table) {
            $cols = array_values(array_filter(['stars', 'price_from', 'email'], fn ($c) => Schema::hasColumn('hotels', $c)));
            if ($cols !== []) {
                $table->dropColumn($cols);
            }
        });
    }
};

