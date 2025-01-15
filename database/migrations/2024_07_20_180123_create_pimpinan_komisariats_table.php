<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pimpinan_komisariats', function (Blueprint $table) {
            $table->id();
            $table->string('nama');

            $table->foreignId('pimpinan_cabang_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pimpinan_anak_cabang_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pimpinan_komisariats');
    }
};
