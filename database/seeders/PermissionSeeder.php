<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::insert([
            // User permission
            [
                'name' => 'find-all-user',
                'display_name' => 'Find All User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-user',
                'display_name' => 'Find User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
            [
                'name' => 'create-user',
                'display_name' => 'Create User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
            [
                'name' => 'edit-user',
                'display_name' => 'Edit User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],
            [
                'name' => 'delete-user',
                'display_name' => 'Delete User',
                'group_name' => 'User',
                'guard_name' => 'web'
            ],

            // Anggota permission
            [
                'name' => 'find-all-anggota',
                'display_name' => 'Find All Anggota',
                'group_name' => 'Anggota',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-anggota',
                'display_name' => 'Find Anggota',
                'group_name' => 'Anggota',
                'guard_name' => 'web'
            ],
            [
                'name' => 'create-anggota',
                'display_name' => 'Create Anggota',
                'group_name' => 'Anggota',
                'guard_name' => 'web'
            ],
            [
                'name' => 'edit-anggota',
                'display_name' => 'Edit Anggota',
                'group_name' => 'Anggota',
                'guard_name' => 'web'
            ],
            [
                'name' => 'delete-anggota',
                'display_name' => 'Delete Anggota',
                'group_name' => 'Anggota',
                'guard_name' => 'web'
            ],
            // Pelatihan permission
            [
                'name' => 'find-all-pelatihan',
                'display_name' => 'Find All Pelatihan',
                'group_name' => 'Pelatihan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-pelatihan',
                'display_name' => 'Find Pelatihan',
                'group_name' => 'Pelatihan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'create-pelatihan',
                'display_name' => 'Create Pelatihan',
                'group_name' => 'Pelatihan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'edit-pelatihan',
                'display_name' => 'Edit Pelatihan',
                'group_name' => 'Pelatihan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'delete-pelatihan',
                'display_name' => 'Delete Pelatihan',
                'group_name' => 'Pelatihan',
                'guard_name' => 'web'
            ],
            // Surat permission
            [
                'name' => 'find-all-surat',
                'display_name' => 'Find All Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-surat',
                'display_name' => 'Find Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            [
                'name' => 'create-surat',
                'display_name' => 'Create Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            [
                'name' => 'edit-surat',
                'display_name' => 'Edit Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            [
                'name' => 'read-surat',
                'display_name' => 'Read Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            [
                'name' => 'delete-surat',
                'display_name' => 'Delete Surat',
                'group_name' => 'Surat',
                'guard_name' => 'web'
            ],
            // Pimpinan permission
            [
                'name' => 'find-all-pimpinan',
                'display_name' => 'Find All Pimpinan',
                'group_name' => 'Pimpinan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'find-pimpinan',
                'display_name' => 'Find Pimpinan',
                'group_name' => 'Pimpinan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'create-pimpinan',
                'display_name' => 'Create Pimpinan',
                'group_name' => 'Pimpinan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'edit-pimpinan',
                'display_name' => 'Edit Pimpinan',
                'group_name' => 'Pimpinan',
                'guard_name' => 'web'
            ],
            [
                'name' => 'delete-pimpinan',
                'display_name' => 'Delete Pimpinan',
                'group_name' => 'Pimpinan',
                'guard_name' => 'web'
            ],
            // Profile permission
            [
                'name' => 'edit-profile',
                'display_name' => 'Edit Profile',
                'group_name' => 'Profile',
                'guard_name' => 'web'
            ],
        ]);
    }
}
