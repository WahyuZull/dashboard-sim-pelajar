<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pimpinan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pimpinanAnakCabang()
    {
        return $this->belongsTo(PimpinanAnakCabang::class);
    }

    public function pimpinanRanting()
    {
        return $this->belongsTo(PimpinanRanting::class);
    }

    public function pimpinanKomisariat()
    {
        return $this->belongsTo(PimpinanKomisariat::class);
    }

    public function pimpinanCabang()
    {
        return $this->belongsTo(PimpinanCabang::class);
    }

    public function anggota()
    {
        return $this->belongsToMany(Anggota::class, 'anggota_has_pimpinan')
            ->withPivot('jabatan', 'periode_kepengurusan');
    }
}
