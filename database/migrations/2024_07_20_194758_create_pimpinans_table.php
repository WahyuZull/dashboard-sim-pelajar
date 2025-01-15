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
        Schema::create('pimpinans', function (Blueprint $table) {
            $table->id('id');
            $table->string('nama');

            $table->unsignedInteger('pimpinan_cabang_id')->nullable();
            $table->unsignedInteger('pimpinan_anak_cabang_id')->nullable();
            $table->unsignedInteger('pimpinan_ranting_id')->nullable();
            $table->unsignedInteger('pimpinan_komisariat_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pimpinans');
    }
};
