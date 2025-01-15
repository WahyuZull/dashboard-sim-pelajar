<?php

use App\Http\Controllers\Admin\ActivationAnggotaController;
use App\Http\Controllers\Admin\KomisariatCrudController;
use App\Http\Controllers\Admin\PermissionCrudController;
use App\Http\Controllers\Admin\RoleCrudController;
use App\Http\Controllers\Admin\SuratCrudController;
use App\Http\Controllers\Admin\UserCrudController;
use App\Http\Controllers\Admin\PimpinanCrudController;
use App\Http\Controllers\Admin\AnggotaCrudController;
use App\Http\Controllers\Admin\MediaCrudController;
use App\Http\Controllers\Admin\DashboardCrudController;
use App\Http\Controllers\Admin\PelatihanCrudController;
use App\Http\Controllers\PimpinanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferensiController;
use App\Http\Controllers\RegionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});

Route::middleware('auth')->prefix('dashboard')->as('dashboard.')->group(function () {
    Route::get('/', [DashboardCrudController::class, 'index'])->name('index');

    Route::resource('pimpinans', PimpinanCrudController::class)->names([
        'index' => 'pimpinans',
        'create' => 'pimpinans.create',
        'store' => 'pimpinans.store',
        'edit' => 'pimpinans.edit',
        'update' => 'pimpinans.update',
        'destroy' => 'pimpinans.destroy',
    ]);


    Route::resource('komisariats', KomisariatCrudController::class)->names([
        'index' => 'komisariats',
        'create' => 'komisariats.create',
        'store' => 'komisariats.store',
        'edit' => 'komisariats.edit',
        'update' => 'komisariats.update',
        'destroy' => 'komisariats.destroy',
    ]);

    Route::resource('anggota', AnggotaCrudController::class)->names([
        'index' => 'anggota',
        'create' => 'anggota.create',
        'store' => 'anggota.store',
        'show' => 'anggota.show',
        'edit' => 'anggota.edit',
        'update' => 'anggota.update',
        'destroy' => 'anggota.destroy',
    ]);

    Route::patch('anggota/activation/{id}', [ActivationAnggotaController::class, 'actived'])->name('activation-anggota');
    Route::patch('anggota/deativation/{id}', [ActivationAnggotaController::class, 'deactived'])->name('deactivation-anggota');

    

    Route::resource('pelatihans', PelatihanCrudController::class)->names([
        'index' => 'pelatihans',
        'create' => 'pelatihans.create',
        'store' => 'pelatihans.store',
        'show' => 'pelatihans.show',
        'edit' => 'pelatihans.edit',
        'update' => 'pelatihans.update',
        'destroy' => 'pelatihans.destroy'
    ]);

    Route::resource('surats', SuratCrudController::class)->names([
        'index' => 'surats',
        'create' => 'surats.create',
        'store' => 'surats.store',
        'edit' => 'surats.edit',
        'update' => 'surats.update',
        'read' => 'surats.read',
        'destroy' => 'surats.destroy'
    ]);

    Route::resource('users', UserCrudController::class)->names([
        'index' => 'users',
        'create' => 'users.create',
        'store' => 'users.store',
        'show' => 'users.show',
        'edit' => 'users.edit',
        'update' => 'users.update',
        'destroy' => 'users.destroy',
    ]);

    Route::resource('roles', RoleCrudController::class)->names([
        'index' => 'roles',
        'create' => 'roles.create',
        'store' => 'roles.store',
        'show' => 'roles.show',
        'edit' => 'roles.edit',
        'update' => 'roles.update',
        'destroy' => 'roles.destroy',
    ]);

    Route::resource('permissions', PermissionCrudController::class)->names([
        'index' => 'permissions',
        'create' => 'permissions.create',
        'store' => 'permissions.store',
        'show' => 'permissions.show',
        'edit' => 'permissions.edit',
        'update' => 'permissions.update',
        'destroy' => 'permissions.destroy',
    ]);

    Route::resource('media', MediaCrudController::class)->names([
        'index' => 'media',
        'destroy' => 'media.destroy',
    ]);

    Route::get('/referensi', [ReferensiController::class, 'index'])->name('referensi');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('region')->group(function () {
    Route::get('/provinces', [RegionController::class, 'provinces'])->name("region.provinces");
    Route::get('/regencies/{province_id}', [RegionController::class, 'regencies'])->name("region.regencies");
    Route::get('/districts/{regency_id}', [RegionController::class, 'districts'])->name("region.districts");
    Route::get('/villages/{district_id}', [RegionController::class, 'villages'])->name("region.village");
});

Route::prefix('pimpinan')->group(function () {
    Route::get('/cabang', [PimpinanController::class, 'pimpinanCabang'])->name("pimpinan.cabang");
    Route::get('/anak-cabang/{pimpinan_cabang_id}', [PimpinanController::class, 'pimpinanAnakCabang'])->name("pimpinan.anakCabang");
    Route::get('/ranting/{pimpinan_anak_cabang_id}', [PimpinanController::class, 'pimpinanRanting'])->name("pimpinan.ranting");
    Route::get('/komisariat/{pimpinan_anak_cabang_id}', [PimpinanController::class, 'pimpinanKomisariat'])->name("pimpinan.komisariat");
});

require __DIR__ . '/auth.php';
