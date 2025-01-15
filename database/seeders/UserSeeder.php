<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pcId = \App\Models\PimpinanCabang::where('nama', 'PIMPINAN CABANG KUDUS')->first()->id;

        // make super-admin PC
        \App\Models\User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@pelajarkudus.com',
            'password' => Hash::make('superadmin5455'),
            'pimpinan_id' => $pcId,
        ])->assignRole('super-admin');

        // make admin PC
        \App\Models\User::factory()->create([
            'name' => 'Admin PC',
            'email' => 'adminpc@pelajarkudus.com',
            'password' => Hash::make('adminpc5455'),
            'pimpinan_id' => $pcId,
        ])->assignRole('admin');

        // make secretary PC
        \App\Models\User::factory()->create([
            'name' => 'Sekretaris PC',
            'email' => 'sekretarispc@pelajarkudus.com',
            'password' => Hash::make('sekrepc5455'),
            'pimpinan_id' => $pcId,
        ])->assignRole('secretary');

        // make admin PAC
        $pacSeKudus = \App\Models\PimpinanAnakCabang::where('pimpinan_cabang_id', $pcId)->get();
        foreach ($pacSeKudus as $pac) {
            \App\Models\User::factory()->create([
                'name' => 'Admin ' . Str::title($pac->nama),
                'email' => 'adminpac-' . Str::replace('pimpinan-anak-cabang-', '', Str::slug($pac->nama)) . '@pelajarkudus.com',
                'password' => Hash::make('adminpac5455'),
                'pimpinan_id' => $pac->id,
            ])->assignRole('admin');

            // make secretary PAC
            \App\Models\User::factory()->create([
                'name' => 'Sekretaris ' . Str::title($pac->nama),
                'email' => 'sekretarispac-' . Str::replace('pimpinan-anak-cabang-', '', Str::slug($pac->nama)) . '@pelajarkudus.com',
                'password' => Hash::make('sekrepac5455'),
                'pimpinan_id' => $pac->id,
            ])->assignRole('secretary');

            // make admin PR
            $prSeKudus = \App\Models\PimpinanRanting::where('pimpinan_anak_cabang_id', $pac->id)->get();
            foreach ($prSeKudus as $pr) {
                \App\Models\User::factory()->create([
                    'name' => 'Admin ' . Str::title($pr->nama),
                    'email' => 'adminpr-' . Str::replace('pimpinan-ranting-', '', Str::slug($pr->nama)) . '@pelajarkudus.com',
                    'password' => Hash::make('adminpr5455'),
                    'pimpinan_id' => $pr->id,
                ])->assignRole('admin');

                // make secretary PR
                \App\Models\User::factory()->create([
                    'name' => 'Sekretaris ' . Str::title($pr->nama),
                    'email' => 'sekretarispr-' . Str::replace('pimpinan-ranting-', '', Str::slug($pr->nama)) . '@pelajarkudus.com',
                    'password' => Hash::make('sekrepr5455'),
                    'pimpinan_id' => $pr->id,
                ])->assignRole('secretary');
            }
        }

    }
}
