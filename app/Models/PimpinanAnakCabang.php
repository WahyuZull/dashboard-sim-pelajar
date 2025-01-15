<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PimpinanAnakCabang extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pimpinanCabang()
    {
        return $this->belongsTo(PimpinanCabang::class);
    }

    public function pimpinanRanting()
    {
        return $this->hasMany(PimpinanRanting::class);
    }

    public function pimpinanKomisariat()
    {
        return $this->hasMany(PimpinanKomisariat::class);
    }
}
