<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // make Super Admin, Admin, Secretary
        $roles = [
            ['name' => 'super-admin', 'display_name' => 'Super Admin', 'guard_name' => 'web'],
            ['name' => 'admin', 'display_name' => 'Admin', 'guard_name' => 'web'],
            ['name' => 'secretary', 'display_name' => 'Secretary', 'guard_name' => 'web'],
            ['name' => 'anggota', 'display_name' => 'Anggota', 'guard_name' => 'web'],
        ];

        Role::insert($roles);

        // assign super-admin to all permission
        $superAdmin = Role::where('name', 'super-admin')->first();
        $superAdmin->syncPermissions(Permission::all());

        // assign admin to some permission
        $admin = Role::where('name', 'admin')->first();
        $admin->syncPermissions([
            'find-all-anggota',
            'find-anggota',
            'create-anggota',
            'edit-anggota',
            'delete-anggota',
            'find-all-pelatihan',
            'find-pelatihan',
            'find-all-pimpinan',
            'find-pimpinan',
            'edit-profile',
        ]);

        // assign secretary to some permission
        $secretary = Role::where('name', 'secretary')->first();
        $secretary->syncPermissions([
            'find-all-surat',
            'find-surat',
            'create-surat',
            'read-surat',
            'edit-surat',
            'delete-surat',
            'edit-profile',
        ]);

        $anggota = Role::where('name', 'anggota')->first();
        $anggota->syncPermissions('edit-profile');
    }
}
