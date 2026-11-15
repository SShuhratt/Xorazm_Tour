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
        Schema::table('tours', function (Blueprint $table) {
            $table->decimal('single_supplement', 10, 2)->nullable()->after('cost');
            $table->json('pricing_tiers')->nullable()->after('single_supplement');
        });

        Schema::table('tour_translations', function (Blueprint $table) {
            $table->text('custom_transport')->nullable()->after('route');
            $table->json('included')->nullable()->after('description');
            $table->json('not_included')->nullable()->after('included');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn(['single_supplement', 'pricing_tiers']);
        });

        Schema::table('tour_translations', function (Blueprint $table) {
            $table->dropColumn(['custom_transport', 'included', 'not_included']);
        });
    }
};
