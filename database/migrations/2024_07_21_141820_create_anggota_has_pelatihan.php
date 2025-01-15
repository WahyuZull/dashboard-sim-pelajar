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
        Schema::create('anggota_has_pelatihan', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('anggota_id')->constrained('anggotas')->cascadeOnDelete();
            $table->foreignId('pelatihan_id')->constrained('pelatihans')->cascadeOnDelete();

            $table->string('nomor_sertifikat')->nullable();
            $table->string('tempat_pelatihan');
            $table->date('tanggal_pelatihan');
            $table->string('penyelenggara_pelatihan');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_has_pelatihan');
    }
};
