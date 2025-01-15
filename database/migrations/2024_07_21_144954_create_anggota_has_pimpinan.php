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
        Schema::create('anggota_has_pimpinan', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('anggota_id')->constrained('anggotas')->cascadeOnDelete();
            $table->foreignId('pimpinan_id')->constrained('pimpinans')->cascadeOnDelete();
            $table->string('jabatan');
            $table->string('periode_kepengurusan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_has_pimpinan');
    }
};
