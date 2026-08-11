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
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->boolean('status')->default(true);
            $table->string('origin_region')->nullable();
            $table->string('category')->nullable();
            $table->timestamps();
        });

        Schema::create('dish_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dish_id')->constrained()->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('name');
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->unique(['dish_id', 'locale']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dish_translations');
        Schema::dropIfExists('dishes');
    }
};
