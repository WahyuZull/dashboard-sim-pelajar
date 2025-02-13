<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MediaController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/media/bulk-upload', [MediaController::class, 'bulkStore']);
Route::apiResource('media', MediaController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('permissions', PermissionController::class);
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
