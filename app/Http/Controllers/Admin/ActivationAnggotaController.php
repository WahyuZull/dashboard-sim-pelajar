<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ActivationAnggotaController extends Controller
{
    public function actived($id)
    {
        $anggota = Anggota::findOrFail($id);

        // Create NIA
        $new_nia = '';
        if ($anggota->jenis_kelamin == 'Laki-laki') {
            $prefix_kode = '11.02.' . date('y', strtotime($anggota->tanggal_lahir)) . '.';
            $new_nia = Anggota::select(DB::raw('(SUBSTRING(nia, 10) + 1) as stats'))
                ->where('jenis_kelamin', 'Laki-laki')
                ->orderBy('stats', 'desc')
                ->first();

            $new_nia = empty($new_nia) ? 1 : $new_nia->stats;
            $new_nia = $prefix_kode . sprintf('%05s', $new_nia);
        }

        if ($anggota->jenis_kelamin == 'Perempuan') {
            $prefix_kode = '33.19.' . date('ym', strtotime($anggota->tanggal_pelatihan)) . '.';
            $new_nia = Anggota::select(DB::raw('(SUBSTRING(nia, 12) + 1) as stats'))
                ->where('jenis_kelamin', 'Perempuan')
                ->orderBy('stats', 'desc')
                ->first();

                $new_nia = empty($new_nia) ? 1 : $new_nia->stats;
                $new_nia = $prefix_kode . sprintf('%04s', $new_nia);
        }

        $anggota->update([
            'nia' => $new_nia,
            'is_active' => true,
        ]);

        session()->flash('success', 'Anggota berhasil diaktifasi!');
        return redirect(route('dashboard.anggota.show', $anggota->id));
    }

    public function deactived($id)
    {
        $anggota = Anggota::find($id);

        $anggota->update([
            'is_active' => false,
        ]);

        session()->flash('success', 'Anggota berhasil dinonaktifkan!');
        return redirect(route('dashboard.anggota.show', $anggota->id));
    }
}
