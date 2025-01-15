<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgendaSurat extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function surat()
    {
        return $this->hasMany(Surat::class);
    }

    public function jenisSurat()
    {
        return $this->belongsTo(JenisSurat::class);
    }
}
