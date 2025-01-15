<?php

namespace App\Http\Controllers;

use App\Exports\AnggotasExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReferensiController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('Dashboard/Referensi/Index');
    }
}
