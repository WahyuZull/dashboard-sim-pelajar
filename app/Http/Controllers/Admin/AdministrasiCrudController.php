<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Surat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministrasiCrudController extends Controller
{
    //
    public function index()
    {
        $surats = Surat::paginate(20);
        return Inertia::render('Dashboard/Administrasi/Index', [
            'surats' => $surats,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Administrasi/Manage');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nomor_surat' => 'required',
                'perihal' => 'required',
                'file' => 'required',
                'file.*' => 'mimes:pdf',
                'jenis_surat' => 'required',
                'user_id' => 'required'
            ]);

            $file = $request->file('file');

            $surat = Surat::create([
                'nomor_surat' => $request->nomor_surat,
                'perihal' => $request->perihal,
            ]);

            $surat->file()->create([
                'file' => $file->store('surat', 'public'),
            ]);
        } catch (\Throwable $th) {
            session()->flash('error', $th->getMessage());
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function edit($id)
    {
        $surat = Surat::find($id);
        return Inertia::render('Dashboard/Administrasi/Manage', [
            'surat' => $surat
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'nomor_surat' => 'required',
                'perihal' => 'required',
                'jenis_surat' => 'required',
                'user_id' => 'required'
            ]);

            if ($request->hasFile('file')) {
                $file = $request->file('file');

                $surat = Surat::find($id);
                $surat->update([
                    'nomor_surat' => $request->nomor_surat,
                    'perihal' => $request->perihal,
                ]);
                $surat->file()->update([
                    'file' => $file->store('surat', 'public'),
                ]);
            }

            $surat = Surat::find($id);
            $surat->update([
                'nomor_surat' => $request->nomor_surat,
                'perihal' => $request->perihal,
            ]);

            session()->flash('success', 'Surat berhasil diperbarui!');
            return redirect()->route('dashboard.surats');
        } catch (\Throwable $th) {
            session()->flash('error', $th->getMessage());
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function read($id)
    {
        try {
            $surat = Surat::findOrFail($id);

            $surat->update([
                'status' => 'Sudah Dibaca'
            ]);

            session()->flash('success', 'Surat telah dibaca!');
            return redirect()->route('dashboard.surats');
        } catch (\Throwable $th) {
            session()->flash('error', $th->getMessage());
            return redirect()->route('dashboard.surats');
        }
    }

    public function destroy($id)
    {
        try {
            $surat = Surat::find($id);
            $surat->delete();

            session()->flash('success', 'Surat berhasil dihapus!');
            return redirect()->route('dashboard.surats');
        } catch (\Throwable $th) {
            session()->flash('error', $th->getMessage());
            return redirect()->route('dashboard.surats');
        }
    }
}
