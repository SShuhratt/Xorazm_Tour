<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Align posts table (`published` -> `status`) and unique slug
        Schema::table('posts', function (Blueprint $table) {
            if (Schema::hasColumn('posts', 'published') && ! Schema::hasColumn('posts', 'status')) {
                $table->renameColumn('published', 'status');
            }
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->unique('slug');
        });

        // 2. Make optional coordinates/dimensions nullable and enforce unique slugs
        Schema::table('cities', function (Blueprint $table) {
            $table->decimal('longitude', 10, 7)->nullable()->change();
            $table->decimal('latitude', 10, 7)->nullable()->change();
            $table->unique('slug');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->foreignId('city_id')->nullable()->after('id')->constrained('cities')->nullOnDelete();
            $table->string('phone_number')->nullable()->change();
            $table->decimal('latitude', 10, 7)->nullable()->change();
            $table->decimal('longitude', 10, 7)->nullable()->change();
            $table->unique('slug');
        });

        Schema::table('festivals', function (Blueprint $table) {
            $table->foreignId('city_id')->nullable()->after('id')->constrained('cities')->nullOnDelete();
            $table->decimal('latitude', 11, 8)->nullable()->change();
            $table->decimal('longitude', 11, 8)->nullable()->change();
            $table->unique('slug');
        });

        Schema::table('transports', function (Blueprint $table) {
            $table->decimal('height', 8, 2)->nullable()->change();
            $table->decimal('width', 8, 2)->nullable()->change();
            $table->decimal('length', 8, 2)->nullable()->change();
        });

        // Backfill hotels.city_id and festivals.city_id from translation tables if any rows exist
        if (Schema::hasColumn('hotel_translations', 'city_id')) {
            $hotelCities = DB::table('hotel_translations')
                ->select('hotel_id', DB::raw('MIN(city_id) as city_id'))
                ->whereNotNull('city_id')
                ->groupBy('hotel_id')
                ->get();

            foreach ($hotelCities as $row) {
                if (DB::table('cities')->where('id', $row->city_id)->exists()) {
                    DB::table('hotels')->where('id', $row->hotel_id)->update(['city_id' => $row->city_id]);
                }
            }
        }

        if (Schema::hasColumn('festival_translations', 'city_id')) {
            $festivalCities = DB::table('festival_translations')
                ->select('festival_id', DB::raw('MIN(city_id) as city_id'))
                ->whereNotNull('city_id')
                ->groupBy('festival_id')
                ->get();

            foreach ($festivalCities as $row) {
                if (DB::table('cities')->where('id', $row->city_id)->exists()) {
                    DB::table('festivals')->where('id', $row->festival_id)->update(['city_id' => $row->city_id]);
                }
            }
        }

        // 3. Add cascade foreign keys and unique constraints on translation tables
        Schema::table('city_translations', function (Blueprint $table) {
            $table->foreign('city_id')->references('id')->on('cities')->cascadeOnDelete();
        });

        Schema::table('transport_translations', function (Blueprint $table) {
            $table->foreign('transport_id')->references('id')->on('transports')->cascadeOnDelete();
            $table->unique(['transport_id', 'locale']);
        });

        Schema::table('hotel_translations', function (Blueprint $table) {
            if (Schema::hasColumn('hotel_translations', 'city_id')) {
                $table->dropColumn('city_id');
            }
            $table->foreign('hotel_id')->references('id')->on('hotels')->cascadeOnDelete();
            $table->unique(['hotel_id', 'locale']);
        });

        Schema::table('festival_translations', function (Blueprint $table) {
            if (Schema::hasColumn('festival_translations', 'city_id')) {
                $table->dropColumn('city_id');
            }
            $table->foreign('festival_id')->references('id')->on('festivals')->cascadeOnDelete();
            $table->unique(['festival_id', 'locale']);
        });

        Schema::table('post_translations', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->cascadeOnDelete();
            $table->unique(['post_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_translations', function (Blueprint $table) {
            $table->dropUnique(['post_id', 'locale']);
            $table->dropForeign(['post_id']);
        });

        Schema::table('festival_translations', function (Blueprint $table) {
            $table->dropUnique(['festival_id', 'locale']);
            $table->dropForeign(['festival_id']);
            $table->integer('city_id')->nullable()->after('festival_id');
        });

        Schema::table('hotel_translations', function (Blueprint $table) {
            $table->dropUnique(['hotel_id', 'locale']);
            $table->dropForeign(['hotel_id']);
            $table->integer('city_id')->nullable()->after('hotel_id');
        });

        Schema::table('transport_translations', function (Blueprint $table) {
            $table->dropUnique(['transport_id', 'locale']);
            $table->dropForeign(['transport_id']);
        });

        Schema::table('city_translations', function (Blueprint $table) {
            $table->dropForeign(['city_id']);
        });

        Schema::table('festivals', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropConstrainedForeignId('city_id');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropConstrainedForeignId('city_id');
        });

        Schema::table('cities', function (Blueprint $table) {
            $table->dropUnique(['slug']);
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropUnique(['slug']);
        });

        Schema::table('posts', function (Blueprint $table) {
            if (Schema::hasColumn('posts', 'status') && ! Schema::hasColumn('posts', 'published')) {
                $table->renameColumn('status', 'published');
            }
        });
    }
};

