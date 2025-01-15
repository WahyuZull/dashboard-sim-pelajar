<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PimpinanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make Pimpinan Cabang Kudus
        $kabupatenKudus = \App\Models\Regency::where('name', 'Kabupaten Kudus')->first();
        $pimpinanCabangKudus = \App\Models\PimpinanCabang::create([
            'nama' => 'PIMPINAN CABANG' . Str::replace("KABUPATEN", "", $kabupatenKudus->name),
        ]);

        \App\Models\Pimpinan::create([
            'nama' => 'PIMPINAN CABANG KUDUS',
            'pimpinan_cabang_id' => $pimpinanCabangKudus->id,
        ]);

        // Make Pimpinan Anak Cabang Se-Kudus
        $kecamatanSekudus = \App\Models\District::where('regency_id', $kabupatenKudus->id)->get();
        foreach ($kecamatanSekudus as $kecamatan) {
            $pimpinanAnakCabangSeKudus = \App\Models\PimpinanAnakCabang::create([
                'nama' => 'PIMPINAN ANAK CABANG ' . $kecamatan->name,
                'pimpinan_cabang_id' => $pimpinanCabangKudus->id,
            ]);

            \App\Models\Pimpinan::create([
                'nama' => 'PIMPINAN ANAK CABANG ' . $kecamatan->name,
                'pimpinan_cabang_id' => $pimpinanCabangKudus->id,
                'pimpinan_anak_cabang_id' => $pimpinanAnakCabangSeKudus->id,
            ]);

            // Make Pimpinan Ranting Se-Kudus
            $desaSekudus = \App\Models\Village::where('district_id', $kecamatan->id)->get();
            foreach ($desaSekudus as $desa) {
                $pimpinanRantingSekudus = \App\Models\PimpinanRanting::create([
                    'nama' => 'PIMPINAN RANTING ' . $desa->name,
                    'pimpinan_cabang_id' => $pimpinanCabangKudus->id,
                    'pimpinan_anak_cabang_id' => $pimpinanAnakCabangSeKudus->id,
                ]);

                \App\Models\Pimpinan::create([
                    'nama' => 'PIMPINAN RANTING ' . $desa->name,
                    'pimpinan_cabang_id' => $pimpinanCabangKudus->id,
                    'pimpinan_anak_cabang_id' => $pimpinanAnakCabangSeKudus->id,
                    'pimpinan_ranting_id' => $pimpinanRantingSekudus->id,
                ]);
            }
        }
    }
}
