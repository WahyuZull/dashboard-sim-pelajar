<?php

namespace App\Exports;

use App\Models\Anggota;
use Inertia\Inertia;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;

class AnggotasExport implements FromQuery
{
    use Exportable;

    protected $jenis_kelamin,
        $pimpinan_id,
        $is_active,
        $start_date,
        $end_date;
    public function __construct(
        $jenis_kelamin,
        $pimpinan_id,
        $is_active,
        $start_date,
        $end_date
    ) {
        $this->jenis_kelamin = $jenis_kelamin;
        $this->pimpinan_id = $pimpinan_id;
        $this->is_active = $is_active;
        $this->start_date = $start_date;
        $this->end_date = $end_date;
    }
    public function query()
    {
        $anggota_query = Anggota::query();

        $anggota_query->when($this->jenis_kelamin, function ($query) {
            return $query->where('jenis_kelamin', $this->jenis_kelamin);
        });

        $anggota_query->when($this->pimpinan_id, function ($query) {
            return $query->where('pimpinan_id', $this->pimpinan_id);
        });

        $anggota_query->when($this->is_active, function ($query) {
            return $query->where('is_active', $this->is_active);
        });

        $anggota_query->when($this->start_date && $this->end_date, function ($query) {
            return $query->whereBetween('created_at', [$this->start_date, $this->end_date]);
        });

        $anggotas = $anggota_query->get();
        return Inertia::render('Dashboard/Export/Show', [
            'anggotas' => $anggotas
        ]);
    }
}
