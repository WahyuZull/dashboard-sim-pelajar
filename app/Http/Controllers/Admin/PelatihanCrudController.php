<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelatihan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PelatihanCrudController extends Controller
{
    public function index()
    {
        $pelatihanQuery = Pelatihan::query();
        $pelatihanQuery->when(request('search'), function ($query, $search) {
            $query->where('nama', 'like', '%' . $search . '%');
        });

        $pelatihans = $pelatihanQuery->paginate(20);
        return Inertia::render('Dashboard/Pelatihan/Index', [
            'pelatihans' => $pelatihans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Pelatihan/Manage');
    }

    public function store(Request $request)
    {
        // Validasi request
        $request->validate([
            'nama' => 'required|max:255',
            'sertifikat' => 'required',
        ], [
            'nama.required' => 'Nama pelatihan harus diisi!',
            'nama.max' => 'Nama pelatihan tidak boleh lebih dari 255 karakter!',
            'sertifikat.required' => 'Sertifikat harus diisi!',
        ]);

        // Create Pelatihan
        Pelatihan::create($request->all());

        session()->flash('success', 'Pelatihan berhasil ditambahkan!');
        return redirect(route('dashboard.pelatihans'));
    }

    public function show(Pelatihan $pelatihan)
    {
        $data = Pelatihan::find($pelatihan->id);
        return Inertia::render('Dashboard/Pelatihan/Show', [
            'pelatihan' => $data,
        ]);
    }

    public function edit(Pelatihan $pelatihan)
    {
        return Inertia::render('Dashboard/Pelatihan/Manage', [
            'pelatihan' => $pelatihan,
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validasi request
        $request->validate([
            'nama' => 'required|max:255',
        ], [
            'nama.required' => 'Nama pelatihan harus diisi!',
            'nama.max' => 'Nama pelatihan tidak boleh lebih dari 255 karakter!',
        ]);

        $pelatihan = Pelatihan::find($id);
        $pelatihan->fill($request->all());
        $pelatihan->save();

        session()->flash('success', 'Pelatihan berhasil diupdate!');
        return redirect(route( 'dashboard.pelatihans', $pelatihan->id));
    }

    public function destroy($id)
    {
        $pelatihan = Pelatihan::find($id);
        $pelatihan->delete();

        session()->flash('success', 'Pelatihan berhasil dihapus!');
        return redirect(route('dashboard.pelatihans'));
    }
}
