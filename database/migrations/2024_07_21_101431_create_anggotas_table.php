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
        Schema::create('anggotas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nia')->nullable();
            $table->string('nik', 16);
            $table->string('nama_lengkap', 255);
            $table->string('tempat_lahir', 255);
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('rt', 3);
            $table->string('rw', 3);
            $table->string('village_name', 255);
            $table->string('district_name', 255);
            $table->string('regency_name', 255);
            $table->string('province_name', 255);
            $table->string('no_hp', 15);
            $table->string('nama_orangtua', 255);
            $table->string('pekerjaan_orangtua', 255);
            $table->string('foto');
            $table->boolean('is_active')->default(false);

            $table->unsignedBigInteger('province_id')->constrained('provinces');
            $table->unsignedBigInteger('regency_id')->constrained('regencies');
            $table->unsignedBigInteger('district_id')->constrained('districts');
            $table->unsignedBigInteger('village_id')->constrained('villages');

            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggotas');
    }
};
