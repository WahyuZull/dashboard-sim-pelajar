<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pimpinan;
use App\Models\PimpinanAnakCabang;
use App\Models\PimpinanCabang;
use App\Models\PimpinanKomisariat;
use App\Models\PimpinanRanting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PimpinanCrudController extends Controller
{
    public function index(Request $request)
    {
        $pimpinansQuery = Pimpinan::query();
        $pimpinansQuery->when($request->search, function ($query, $search) {
            $query->where('nama', 'like', '%' . $search . '%');
        });

        $pimpinans = $pimpinansQuery->paginate(20);

        return Inertia::render('Dashboard/Pimpinan/Index', [
            'pimpinans' => $pimpinans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Pimpinan/Manage');
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

        if ($request['pimpinan_cabang_id'] && $request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id']) {
            $newPimpinanRanting = PimpinanRanting::create(
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
                    'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id']
                ]
            );

            $request['pimpinan_ranting_id'] = $newPimpinanRanting->id;
        }

        Pimpinan::create([
            'nama' => Str::upper($validatedRequest['nama']),
            'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
            'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id'],
            'pimpinan_ranting_id' => $request['pimpinan_ranting_id'],
        ]);

        session()->flash('success', 'Pimpinan berhasil ditambahkan!');
        return redirect(route('dashboard.pimpinans'));
    }

    public function edit(Pimpinan $pimpinan)
    {
        $pimpinan = Pimpinan::find($pimpinan->id);
        return Inertia::render('Dashboard/Pimpinan/Manage', [
            'pimpinan' => $pimpinan,
        ]);
    }

    public function update(Request $request, Pimpinan $pimpinan)
    {
        $validatedRequest = $request->validate([
            'nama' => 'required',
        ], [
            'nama.required' => 'Nama pimpinan harus diisi!',
        ]);

        $pimpinan = Pimpinan::find($pimpinan->id);

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

        if ($request['pimpinan_cabang_id'] && $request['pimpinan_anak_cabang_id'] && !$request['pimpinan_ranting_id']) {
            $newPimpinanRanting = PimpinanRanting::updateOrCreate(
                ['id' => $pimpinan['pimpinan_ranting_id']],
                [
                    'nama' => Str::upper($request['nama']),
                    'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
                    'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id']
                ]
            );

            $request['pimpinan_ranting_id'] = $newPimpinanRanting->id;
        }

        $pimpinan->update([
            'nama' => Str::upper($validatedRequest['nama']),
            'pimpinan_cabang_id' => $request['pimpinan_cabang_id'],
            'pimpinan_anak_cabang_id' => $request['pimpinan_anak_cabang_id'],
            'pimpinan_ranting_id' => $request['pimpinan_ranting_id'],
        ]);
        $pimpinan->save();

        session()->flash('success', 'Pimpinan berhasil diubah!');
        return redirect(route('dashboard.pimpinans.edit', $pimpinan->id));
    }

    public function destroy(Pimpinan $pimpinan)
    {
        $pimpinan = Pimpinan::findOrFail($pimpinan->id);

        $pc = PimpinanCabang::find($pimpinan['pimpinan_cabang_id']);
        $pac = PimpinanAnakCabang::find($pimpinan['pimpinan_anak_cabang_id']);
        $pr = PimpinanRanting::find($pimpinan['pimpinan_ranting_id']);
        $pk = PimpinanKomisariat::find($pimpinan['pimpinan_komisariat_id']);

        if ($pc && !$pac && !$pr && !$pk) {
            $pc->delete();
        }

        if ($pc && $pac && !$pr && !$pk) {
            $pac->delete();
        }

        if ($pc && $pac && $pr) {
            $pr->delete();
        }

        $pimpinan->delete();

        session()->flash('success', 'Pimpinan berhasil dihapus!');
        return redirect(route('dashboard.pimpinans'));
    }
}
