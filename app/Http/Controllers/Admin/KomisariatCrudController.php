<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pimpinan;
use App\Models\PimpinanAnakCabang;
use App\Models\PimpinanCabang;
use App\Models\PimpinanKomisariat;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KomisariatCrudController extends Controller
{
    public function create()
    {
        return Inertia::render('Dashboard/Komisariat/Manage');
    }

    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'nama' => 'required',
        ], [
            'nama.required' => 'Nama pimpinan harus diisi!',
        ]);

        if (!$request['pimpinan_cabang_id'] && !$request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanCabang = PimpinanCabang::create(
                [
                    'id' => $request['pimpinan_cabang_id'],
                    'nama' => Str::upper($request['nama'])
                ]
            );

            $request['pimpinan_cabang_id'] = $newPimpinanCabang->id;
        }

        if ($request['pimpinan_cabang_id'] && !$request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanCabang = PimpinanAnakCabang::create(
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id']
                ]
            );

            $request['pimpinan_anak_cabang_id'] = $newPimpinanCabang->id;
        }

        if ($request['pimpinan_cabang_id'] && $request['pimpinan_anak_cabang_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanKomisariat = PimpinanKomisariat::create(
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
                    'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id']
                ]
            );

            $request['pimpinan_komisariat_id'] = $newPimpinanKomisariat->id;
        }

        Pimpinan::create([
            'nama' => Str::upper($validatedRequest['nama']),
            'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
            'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id'],
            'pimpinan_komisariat_id' => $request['pimpinan_komisariat_id'],
        ]);

        session()->flash('success', 'Komisariat berhasil ditambahkan!');
        return redirect(route('dashboard.pimpinans'));
    }
    public function edit($id)
    {
        $komisariat = Pimpinan::find($id);
        return Inertia::render('Dashboard/Komisariat/Manage', [
            'komisariat' => $komisariat,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedRequest = $request->validate([
            'nama' => 'required',
        ], [
            'nama.required' => 'Nama pimpinan harus diisi!',
        ]);

        $pimpinan = Pimpinan::find($id);

        if (!$request['pimpinan_cabang_id'] && !$request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanCabang = PimpinanCabang::updateOrCreate(
                ['id' => $pimpinan['pimpinan_cabang_id']],
                [
                    'nama' => Str::upper($request['nama'])
                ]
            );

            $request['pimpinan_cabang_id'] = $newPimpinanCabang->id;
        }

        if ($request['pimpinan_cabang_id'] && !$request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanCabang = PimpinanAnakCabang::updateOrCreate(
                ['id' => $pimpinan['pimpinan_anak_cabang_id']],
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id']
                ]
            );

            $request['pimpinan_anak_cabang_id'] = $newPimpinanCabang->id;
        }

        if ($request['pimpinan_cabang_id'] && $request['pimpinan_anak_cabang_id'] && !$request['pimpinan_komisariat_id']) {
            $newPimpinanKomisariat = PimpinanKomisariat::updateOrCreate(
                ['id' => $pimpinan['pimpinan_komisariat_id']],
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
                    'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id']
                ]
            );

            $request['pimpinan_komisariat_id'] = $newPimpinanKomisariat->id;
        }

        $pimpinan->update([
            'nama' => Str::upper($validatedRequest['nama']),
            'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
            'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id'],
            'pimpinan_ranting_id' => $request['pimpinan_ranting_id'],
        ]);
        $pimpinan->save();


        session()->flash('success', 'Komisariat berhasil diubah!');
        return redirect(route('dashboard.pimpinans'));
    }

    public function destroy($id)
    {
        $pimpinan = Pimpinan::where('pimpinan_komisariat_id', $id)->first();
        $pk = PimpinanKomisariat::where('id', $pimpinan->pimpinan_komisariat_id)->first();

        if ($pk->id == $pimpinan->pimpinan_komisariat_id) {
            $pk->delete();
        }

        $pimpinan->delete();

        session()->flash('success', 'Komisariat berhasil dihapus!');
        return redirect(route('dashboard.pimpinans'));
    }
}
