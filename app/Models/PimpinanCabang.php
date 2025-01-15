<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PimpinanCabang extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pimpinanAnakCabang()
    {
        return $this->hasMany(PimpinanAnakCabang::class);
    }
}
