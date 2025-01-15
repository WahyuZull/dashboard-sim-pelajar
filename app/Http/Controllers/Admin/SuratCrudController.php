<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Surat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuratCrudController extends Controller
{
    public function index()
    {
        $suratQuery = Surat::query();
        $suratQuery->orderBy('created_at', 'desc');
        
        $surats = $suratQuery->with(['user', 'jenisSurat', 'agendaSurat'])->paginate(20);

        return Inertia::render('Dashboard/Surat/Index',[
            'surats' => $surats
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Surat/Create');
    }
}
