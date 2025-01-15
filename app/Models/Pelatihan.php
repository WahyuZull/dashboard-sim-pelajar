<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pelatihan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'sertifikat',
    ];

    protected $casts = [
        'sertifikat' => 'array',
    ];

    public function anggota(): BelongsToMany
    {
        return $this->belongsToMany(Anggota::class, 'anggota_has_pelatihan')
            ->withPivot(
                'nomor_sertifikat',
                'tempat_pelatihan',
                'tanggal_pelatihan',
                'penyelenggara_pelatihan'
            );
    }
}
