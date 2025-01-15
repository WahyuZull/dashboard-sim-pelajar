<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use App\Models\District;
use App\Models\Pelatihan;
use App\Models\Pimpinan;
use App\Models\PimpinanAnakCabang;
use App\Models\PimpinanCabang;
use App\Models\PimpinanKomisariat;
use App\Models\PimpinanRanting;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AnggotaCrudController extends Controller
{
    public function index(Request $request)
    {
        $anggotaQuery = Anggota::query();
        $role = auth()->user()->roles->map(function ($role) {
            return $role->name;
        });
        $pimpinanId = auth()->user()->pimpinan_id;

        if ($role == 'super-admin') {
            $anggotaQuery->get();
        } else {
            $anggotaQuery->with('pimpinan', function ($query) use ($pimpinanId) {
                $query->where('pimpinan_id', $pimpinanId);
            });
        }
        ;

        if ($request->has('search') && $request->search != '') {
            $anggotaQuery->where('nama_lengkap', 'like', "%{$request->search}%")
                ->orWhere('nia', 'like', "%{$request->search}%")
                ->orWhere('nik', 'like', "%{$request->search}%");
        }

        if ($request->has('is_active') && $request->is_active != '') {
            $anggotaQuery->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('jenis_anggota') && $request->jenis_anggota != '') {
            $anggotaQuery->where('jenis_kelamin', $request->jenis_anggota);
        }

        $anggotas = $anggotaQuery->paginate(20);

        return Inertia::render('Dashboard/Anggota/Index', [
            'anggotas' => $anggotas,
        ]);
    }

    public function create()
    {
        $pimpinanId = auth()->user()->pimpinan_id;
        $pimpinan = Pimpinan::find($pimpinanId);
        $pc = PimpinanCabang::find($pimpinan['pimpinan_cabang_id']);
        $pac = PimpinanAnakCabang::find($pimpinan['pimpinan_anak_cabang_id']);
        $pr = PimpinanRanting::find($pimpinan['pimpinan_ranting_id']);
        $pk = PimpinanKomisariat::find($pimpinan['pimpinan_komisariat_id']);

        $pimpinans = [];
        if ($pc) {
            $pimpinans = Pimpinan::where('pimpinan_cabang_id', $pc->id)->get()->toArray();
        }

        if ($pac) {
            $pimpinans = Pimpinan::where('pimpinan_anak_cabang_id', $pac->id)->get()->toArray();
        }

        if ($pr) {
            $pimpinans = Pimpinan::where('pimpinan_ranting_id', $pr->id)->get()->toArray();
        }

        if ($pk) {
            $pimpinans = Pimpinan::where('pimpinan_komisariat_id', $pk->id)->get()->toArray();
        }

        $pelatihans = Pelatihan::all();
        return Inertia::render('Dashboard/Anggota/Create', [
            'pimpinans' => $pimpinans,
            'pelatihans' => $pelatihans
        ]);
    }

    public function store(Request $request)
    {
        // Validasi request
        $validatedRequest = $request->validate([
            'nik' => 'required|unique:anggotas,nik|max:16',
            'nama_lengkap' => 'required|max:255',
            'tempat_lahir' => 'required|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'province_id' => 'required|exists:provinces,id',
            'regency_id' => 'required|exists:regencies,id',
            'district_id' => 'required|exists:districts,id',
            'village_id' => 'required|exists:villages,id',
            'rt' => 'required|max:3',
            'rw' => 'required|max:3',
            'no_hp' => 'required|max:13',
            'nama_orangtua' => 'required|max:255',
            'pekerjaan_orangtua' => 'required|max:255',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pelatihan_id' => 'exists:pelatihans,id',
            'tempat_pelatihan' => 'max:255',
            'tanggal_pelatihan' => 'date',
            'penyelenggara_pelatihan' => 'exists:pimpinans,id|max:255',
            'pimpinan_id' => 'exists:pimpinans,id',
            'jabatan' => 'max:255',
            'periode_kepengurusan' => 'max:255',
        ], [
            'nik.required' => 'NIK harus diisi!',
            'nik.unique' => 'NIK sudah terdaftar!',
            'nik.max' => 'NIK harus berjumlah 16 digit!',
            'nama_lengkap.required' => 'Nama lengkap harus diisi!',
            'nama_lengkap.max' => 'Nama lengkap harus berjumlah maksimal 255 karakter!',
            'tempat_lahir.required' => 'Tempat lahir harus diisi!',
            'tempat_lahir.max' => 'Tempat lahir harus berjumlah maksimal 255 karakter',
            'tanggal_lahir.required' => 'Tanggal lahir harus diisi!',
            'tanggal_lahir.date' => 'Tanggal lahir harus berformat tanggal!',
            'jenis_kelamin.required' => 'Jenis kelamin harus diisi!',
            'jenis_kelamin.in' => 'Jenis kelamin harus diisi dengan Laki-laki atau Perempuan!',
            'province_id.required' => 'Provinsi harus diisi!',
            'province_id.exists' => 'Provinsi tidak ditemukan!',
            'regency_id.required' => 'Kabupaten/Kota harus diisi!',
            'regency_id.exists' => 'Kabupaten/Kota tidak ditemukan!',
            'district_id.required' => 'Kecamatan harus diisi!',
            'district_id.exists' => 'Kecamatan tidak ditemukan!',
            'village_id.required' => 'Kelurahan/Desa harus diisi!',
            'village_id.exists' => 'Kelurahan/Desa tidak ditemukan!',
            'rt.required' => 'RT harus diisi!',
            'rt.max' => 'RT harus berjumlah maksimal 3 digit!',
            'rw.required' => 'RW harus diisi!',
            'rw.max' => 'RW harus berjumlah maksimal 3 digit!',
            'no_hp.required' => 'Nomor HP harus diisi!',
            'no_hp.max' => 'Nomor HP harus berjumlah maksimal 13 digit!',
            'nama_orangtua.required' => 'Nama orang tua harus diisi!',
            'nama_orangtua.max' => 'Nama orang tua harus berjumlah maksimal 255 karakter!',
            'pekerjaan_orangtua.required' => 'Pekerjaan orang tua harus diisi!',
            'pekerjaan_orangtua.max' => 'Pekerjaan orang tua harus berjumlah maksimal 255 karakter!',
            'foto.required' => 'Foto harus diisi!',
            'foto.image' => 'Foto harus berformat gambar!',
            'foto.mimes' => 'Foto harus berformat jpeg, png, jpg, gif, atau svg!',
            'foto.max' => 'Foto harus berukuran maksimal 2 MB!',
            'pelatihan_id.exists' => 'Pelatihan tidak ditemukan!',
            'tempat_pelatihan.max' => 'Tempat pelatihan harus berjumlah maksimal 255 karakter!',
            'tanggal_pelatihan.date' => 'Tanggal pelatihan harus berformat tanggal!',
            'penyelenggara_pelatihan.exists' => 'Penyelenggara pelatihan tidak ditemukan!',
            'penyelenggara_pelatihan.max' => 'Penyelenggara pelatihan harus berjumlah maksimal 255 karakter!',
            'pimpinan_id.exists' => 'Pimpinan tidak ditemukan!',
            'jabatan.max' => 'Jabatan harus berjumlah maksimal 255 karakter!',
            'periode_kepengurusan.max' => 'Periode kepengurusan harus berjumlah maksimal 255 karakter!',
        ]);

        // Upload foto
        $image = $request->file('foto');
        $originalName = $image->getClientOriginalName();
        $fileName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '-' . time() . '.' . $image->getClientOriginalExtension();
        $filepath = $image->storeAs('uploads/foto-anggota', $fileName, 'public');
        $image->url = asset('storage/' . $filepath);

        if (isset($validatedRequest['province_id'])) {
            $province = Province::find($validatedRequest['province_id']);
        }

        if (isset($validatedRequest['regency_id'])) {
            $regency = Regency::find($validatedRequest['regency_id']);
        }

        if (isset($validatedRequest['district_id'])) {
            $district = District::find($validatedRequest['district_id']);
        }

        if (isset($validatedRequest['village_id'])) {
            $village = Village::find($validatedRequest['village_id']);
        }

        $anggota = Anggota::create([
            'nik' => $validatedRequest['nik'],
            'nama_lengkap' => Str::upper($validatedRequest['nama_lengkap']),
            'tempat_lahir' => Str::upper($validatedRequest['tempat_lahir']),
            'tanggal_lahir' => date('Y-m-d', strtotime($validatedRequest['tanggal_lahir'])),
            'jenis_kelamin' => $validatedRequest['jenis_kelamin'],
            'province_id' => $validatedRequest['province_id'],
            'province_name' => $province->name,
            'regency_id' => $validatedRequest['regency_id'],
            'regency_name' => $regency->name,
            'district_id' => $validatedRequest['district_id'],
            'district_name' => $district->name,
            'village_id' => $validatedRequest['village_id'],
            'village_name' => $village->name,
            'rt' => $validatedRequest['rt'],
            'rw' => $validatedRequest['rw'],
            'no_hp' => $validatedRequest['no_hp'],
            'nama_orangtua' => Str::upper($validatedRequest['nama_orangtua']),
            'pekerjaan_orangtua' => Str::upper($validatedRequest['pekerjaan_orangtua']),
            'foto' => $filepath,
            // 'user_id' => auth()->user()->id,
        ]);

        // Add Pelatihan Anggota
        if (isset($request->pelatihan_id)) {
            $penyelenggaraPelatihan = Pimpinan::find($request->penyelenggara_pelatihan)->nama;

            $anggota->pelatihan()->syncWithPivotValues(
                [
                    'pelatihan_id' => $request->pelatihan_id,
                ],
                [
                    'tempat_pelatihan' => Str::upper($request->tempat_pelatihan),
                    'tanggal_pelatihan' => date('Y-m-d', strtotime($request->tanggal_pelatihan)),
                    'penyelenggara_pelatihan' => Str::upper($penyelenggaraPelatihan),
                ]
            );
        }

        // Add Jabatan Anggota
        if (isset($request->pimpinan_id)) {
            $anggota->pimpinan()->syncWithPivotValues(
                [
                    'pimpinan_id' => $request->pimpinan_id,
                ],
                [
                    'jabatan' => Str::upper($request->jabatan),
                    'periode_kepengurusan' => $request->periode_kepengurusan,
                ]
            );
        }

        session()->flash('success', 'Anggota berhasil ditambahkan!');
        return redirect(route('dashboard.anggota'));
    }

    public function show($id)
    {
        $anggota = Anggota::with(['pelatihan', 'pimpinan'])->find($id);

        return Inertia::render('Dashboard/Anggota/Show', ['anggota' => $anggota]);
    }

    public function edit($id)
    {
        $anggota = Anggota::findOrFail($id);
        return Inertia::render('Dashboard/Anggota/Edit', ['anggota' => $anggota]);
    }

    public function update(Request $request, $id)
    {
        // Validate Request
        $validatedRequest = $request->validate([
            'nik' => 'unique:anggotas,nik|max:16',
            'nama_lengkap' => 'max:255',
            'tempat_lahir' => 'max:255',
            'tanggal_lahir' => 'date',
            'jenis_kelamin' => 'in:Laki-laki,Perempuan',
            'province_id' => 'exists:provinces,id',
            'regency_id' => 'exists:regencies,id',
            'district_id' => 'exists:districts,id',
            'village_id' => 'exists:villages,id',
            'rt' => 'max:3',
            'rw' => 'max:3',
            'no_hp' => 'max:13',
            'nama_orangtua' => 'max:255',
            'pekerjaan_orangtua' => 'max:255',
        ], [
            'nik.max' => 'NIK harus berjumlah 16 digit!',
            'nik.unique' => 'NIK sudah terdaftar!',
            'nama_lengkap.max' => 'Nama lengkap harus berjumlah maksimal 255 karakter!',
            'tempat_lahir.max' => 'Tempat lahir harus berjumlah maksimal 255 karakter',
            'tanggal_lahir.date' => 'Tanggal lahir harus berformat tanggal!',
            'jenis_kelamin.in' => 'Jenis kelamin harus diisi dengan Laki-laki atau Perempuan!',
            'province_id.exists' => 'Provinsi tidak ditemukan!',
            'regency_id.exists' => 'Kabupaten/Kota tidak ditemukan!',
            'district_id.exists' => 'Kecamatan tidak ditemukan!',
            'village_id.exists' => 'Kelurahan/Desa tidak ditemukan!',
            'rt.max' => 'RT harus berjumlah maksimal 3 digit!',
            'rw.max' => 'RW harus berjumlah maksimal 3 digit!',
            'no_hp.max' => 'Nomor HP harus berjumlah maksimal 13 digit!',
            'nama_orangtua.max' => 'Nama orang tua harus berjumlah maksimal 255 karakter!',
            'pekerjaan_orangtua.max' => 'Pekerjaan orang tua harus berjumlah maksimal 255 karakter!',
        ]);

        if (isset($validatedRequest['province_id'])) {
            $province = Province::find($validatedRequest['province_id']);
        }

        if (isset($validatedRequest['regency_id'])) {
            $regency = Regency::find($validatedRequest['regency_id']);
        }

        if (isset($validatedRequest['district_id'])) {
            $district = District::find($validatedRequest['district_id']);
        }

        if (isset($validatedRequest['village_id'])) {
            $village = Village::find($validatedRequest['village_id']);
        }

        // Update Anggota
        $anggota = Anggota::find($id);
        $anggota->update([
            'nik' => $validatedRequest['nik'],
            'nama_lengkap' => Str::upper($validatedRequest['nama_lengkap']),
            'tempat_lahir' => Str::upper($validatedRequest['tempat_lahir']),
            'tanggal_lahir' => date('Y-m-d', strtotime($validatedRequest['tanggal_lahir'])),
            'jenis_kelamin' => $validatedRequest['jenis_kelamin'],
            'province_id' => $validatedRequest['province_id'],
            'province_name' => $province->name,
            'regency_id' => $validatedRequest['regency_id'],
            'regency_name' => $regency->name,
            'district_id' => $validatedRequest['district_id'],
            'district_name' => $district->name,
            'village_id' => $validatedRequest['village_id'],
            'village_name' => $village->name,
            'rt' => $validatedRequest['rt'],
            'rw' => $validatedRequest['rw'],
            'no_hp' => $validatedRequest['no_hp'],
            'nama_orangtua' => Str::upper($validatedRequest['nama_orangtua']),
            'pekerjaan_orangtua' => Str::upper($validatedRequest['pekerjaan_orangtua']),
            'user_id' => auth()->user()->id,
        ]);

        if ($request->hasFile('foto')) {
            $existing_foto = $anggota->foto;
            $existing_filepath = Str::replace('storage/', '', $existing_foto);
            $existing_filepath = storage_path('app/public/' . $existing_filepath);

            if (file_exists($existing_filepath)) {
                unlink($existing_filepath);
            }

            $image = $request->file('foto');
            $original_name = $image->getClientOriginalName();
            $file_name = Str::slug(pathinfo($original_name, PATHINFO_FILENAME)) . '-' . time() . '.' . $image->getClientOriginalExtension();

            $file_path = $image->storeAs('uploads/foto-anggota', $file_name, 'public');
            $existing_foto->url = asset('storage/' . $file_path);

            $anggota->update(['foto' => $file_name]);
            $anggota->save();
        }

        session()->flash('success', 'Anggota berhasil diupdate!');
        return redirect(route('dashboard.anggota.edit', $id));
    }

    public function destroy($id)
    {
        $anggota = Anggota::find($id);

        $existing_foto = $anggota->foto;
        $existing_filepath = Str::replace('storage/', '', $existing_foto);
        $existing_filepath = storage_path('app/public/' . $existing_filepath);

        if (file_exists($existing_filepath)) {
            unlink($existing_filepath);
        }

        $anggota->delete();
        session()->flash('success', 'Anggota berhasil dihapus!');
        return redirect(route('dashboard.anggota'));
    }

    public function searchByNia(Request $request) {
        
    }
}
