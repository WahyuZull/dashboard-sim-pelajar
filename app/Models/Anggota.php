<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Anggota extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'nia',
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'rt',
        'rw',
        'village_name',
        'district_name',
        'regency_name',
        'province_name',
        'no_hp',
        'nama_orangtua',
        'pekerjaan_orangtua',
        'foto',
        'is_active',
        'province_id',
        'regency_id',
        'district_id',
        'village_id',
        'user_id',
    ];

    protected $guarded = [
        'id',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_active' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pimpinan(): BelongsToMany
    {
        return $this->belongsToMany(Pimpinan::class, 'anggota_has_pimpinan')
            ->withPivot('jabatan', 'periode_kepengurusan');
    }

    public function pelatihan(): BelongsToMany
    {
        return $this->belongsToMany(Pelatihan::class, 'anggota_has_pelatihan')
            ->withPivot(
                'nomor_sertifikat',
                'tempat_pelatihan',
                'tanggal_pelatihan',
                'penyelenggara_pelatihan'
            );
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class)->as('provinsi');
    }

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class)->as('kota/kabupaten');
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class)->as('kecamatan');
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class)->as('desa');
    }
}
