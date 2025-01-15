<?php

namespace App\Imports;

use App\Models\Anggota;
use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Village;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class AnggotasImport implements ToCollection, WithValidation, WithHeadingRow
{
    use Importable;
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        //
        foreach ($rows as $row) {
            $foto = '';
            $province_name = Province::find($row['province_id'])->first();
            $regency_name = Regency::find($row['regency_id'])->first();
            $district_name = District::find($row['district_id'])->first();
            $village_name = Village::find($row['village_id'])->first();

            $anggota = Anggota::create([
                'nik' => $row['nik'],
                'nama_lengkap' => $row['nama_lengkap'],
                'tempat_lahir' => $row['tempat_lahir'],
                'tanggal_lahir' => $row['tanggal_lahir'],
                'jenis_kelamin' => $row['jenis_kelamin'],
                'province_id' => $row['province_id'],
                'province_name' => $province_name->name,
                'regency_id' => $row['regency_id'],
                'regency_name' => $regency_name->name,
                'district_id' => $row['district_id'],
                'district_name' => $district_name->name,
                'village_id' => $row['village_id'],
                'village_name' => $village_name->name,
                'rt' => $row['rt'],
                'rw' => $row['rw'],
                'no_np' => $row['no_np'],
                'orang_tua_nama' => $row['orang_tua_nama'],
                'orang_tua_pekerjaan' => $row['orng_tua_pekerjaan'],
                'pimpinan_id' => $row['pimpinan_id'],
                'foto' => $foto,
            ]);

            $anggota->pelatihan()->attach(
                $row['pelatihan_id'],
                [
                    'pelatihan_tempat' => $row['pelatihan_tempat'],
                    'pelatihan_tanggal' => $row['pelatihan_tanggal'],
                    'pelatihan_penyelenggara' => $row['pelatihan_penyelenggara'],
                ]
            );
        }
    }

    public function rules(): array
    {
        return [
            'nik' => Rule::in(['NIK', 'Nomer Induk Kependudukan']),
            'nama_lengkap' => Rule::in(['Nama Lengkap, Mohammad Iqbal']),
            'tempat_lahir' => Rule::in(['Tempat Lahir', 'Kudus']),
            'tanggal_lahir' => Rule::in(['Tanggal Lahir', '02-02-2002']),
            'jenis_kelamin' => Rule::in(['Jenis Kelamin', 'Laki-laki/Perempuan']),
            'province_id' => Rule::in(['Provinsi ID', 'Provinsi ID']),
            'regency_id' => Rule::in(['Regency ID', 'Regency ID']),
            'district_id' => Rule::in(['District ID', 'District ID']),
            'village_id' => Rule::in(['Village ID', 'Village ID']),
            'rt' => Rule::in(['RT', '004']),
            'rw' => Rule::in(['RW', '001']),
            'no_np' => Rule::in(['No. NP', '08123456789']),
            'orang_tua_nama' => Rule::in(['Orang Tua Nama', 'Orang Tua Nama']),
            'orang_tua_pekerjaan' => Rule::in(['Orang Tua Pekerjaan', 'Orang Tua Pekerjaan']),
            'pimpinan_id' => Rule::in(['Pimpinan ID', 'Pimpinan ID']),
            'pelatihan_id' => Rule::in(['Pelatihan ID', 'Pelatihan ID']),
            'pelatihan_tempat' => Rule::in(['Tempat Pelatihan', 'Gedung MWC NU/Lainnya']),
            'pelatihan_tanggal' => Rule::in(['Tanggal Pelatihan', '02-02-2022']),
            'pelatihan_penyelenggara' => Rule::in(['Penyelenggara Pelatihan', 'Pimpinan ID']),
        ];
    }

    public function customValidationMessages(): array
    {
        return [
            'nik.in' => 'Nomer Induk Kependudukan harus diisi!',
            'nama_lengkap.in' => 'Nama Lengkap harus diisi!',
            'tempat_lahir.in' => 'Tempat Lahir harus diisi!',
            'tanggal_lahir.in' => 'Tanggal Lahir harus diisi!',
            'jenis_kelamin.in' => 'Jenis Kelamin harus diisi!',
            'province_id.in' => 'Provinsi ID harus diisi!',
            'regency_id.in' => 'Regency ID harus diisi!',
            'district_id.in' => 'District ID harus diisi!',
            'village_id.in' => 'Village ID harus diisi!',
            'rt.in' => 'RT harus diisi!',
            'rw.in' => 'RW harus diisi!',
            'no_np.in' => 'No. NP harus diisi!',
            'orang_tua_nama.in' => 'Orang Tua Nama harus diisi!',
            'orang_tua_pekerjaan.in' => 'Orang Tua Pekerjaan harus diisi!',
            'pimpinan_id.in' => 'Pimpinan ID harus diisi!',
            'pelatihan_id.in' => 'Pelatihan ID harus diisi!',
            'pelatihan_tempat.in' => 'Tempat Pelatihan harus diisi!',
            'pelatihan_tanggal.in' => 'Tanggal Pelatihan harus diisi!',
            'pelatihan_penyelenggara.in' => 'Penyelenggara Pelatihan harus diisi!',
        ];
    }
}
