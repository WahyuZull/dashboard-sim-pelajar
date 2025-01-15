<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use App\Models\Pimpinan;
use App\Models\Surat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardCrudController extends Controller
{
    //
    public function index()
    {
        $roles = auth()->user()->roles;
        if ($roles[0]->name == 'secretary') {
            $new_surat = Surat::where('status', 'Belum Dibaca')
                ->paginate(20);
            return Inertia::render('DashboardSecretary', [
                'new_surat' => $new_surat
            ]);
        } else if (in_array($roles[0]->name, ['admin', 'super-admin'])) {
            $anggota = Anggota::count();
            $pimpinanId = auth()->user()->pimpinan_id;
            $anggota_ipnu = Anggota::with([
                'pimpinan',
                function ($query) use ($pimpinanId) {
                    $query->where('pimpinan_id', $pimpinanId);
                }
            ])
                ->where('jenis_kelamin', 'Laki-laki')
                ->count();
            $anggota_ippnu = Anggota::with([
                'pimpinan',
                function ($query) use ($pimpinanId) {
                    $query->where('pimpinan_id', $pimpinanId);
                }
            ])
                ->where('jenis_kelamin', 'Perempuan')
                ->count();
            $year = date('Y');
            $new_anggota = Anggota::whereYear('created_at', $year)
                ->orderBy('created_at', 'desc')
                ->paginate(10);
            $pimpinan = Pimpinan::count();
            return Inertia::render('Dashboard', [
                'anggota_count' => $anggota,
                'anggota_ipnu_count' => $anggota_ipnu,
                'anggota_ippnu_count' => $anggota_ippnu,
                'new_anggota' => $new_anggota,
                'pimpinan_count' => $pimpinan
            ]);
        }
    }
}
