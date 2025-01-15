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
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat')->nullable();
            $table->string('perihal')->nullable();
            $table->string('filename')->nullable();
            $table->string('filepath')->nullable();
            $table->string('type')->nullable()->default('pdf');
            $table->string('tipe_surat')->nullabe();
            $table->enum('status', ['Dikirim', 'Diterima', 'Disetujui', 'Ditolak'])->default('Dikirim');
            $table->enum('agenda_surat', ['Surat Keluar', 'Surat Masuk'])->nullabe()->default('Surat Keluar');
            $table->string('pengirim')->nullable();
            $table->text('keterangan')->nullable();

            $table->foreignId('jenis_surat_id')->constrained('jenis_surats')->onDelete('cascade');
            $table->foreignId('agenda_surat_id')->constrained('agenda_surats')->onDelete('cascade');
            $table->foreignId('penerima_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pengirim_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
