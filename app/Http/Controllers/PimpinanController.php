<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PimpinanController extends Controller
{
    public function pimpinanCabang()
    {
        $pimpinanCabang = \App\Models\PimpinanCabang::all();
        return response()->json($pimpinanCabang);
    }

    public function pimpinanAnakCabang($pimpinan_cabang_id)
    {
        $pimpinanAnakCabang = \App\Models\PimpinanAnakCabang::where('pimpinan_cabang_id', $pimpinan_cabang_id)->get();
        return response()->json($pimpinanAnakCabang);
    }

    public function pimpinanRanting($pimpinan_anak_cabang_id)
    {
        $pimpinanRanting = \App\Models\PimpinanRanting::where('pimpinan_anak_cabang_id', $pimpinan_anak_cabang_id)->get();
        return response()->json($pimpinanRanting);
    }

    public function pimpinanKomisariat($pimpinan_anak_cabang_id)
    {
        $pimpinanKomisariat = \App\Models\PimpinanKomisariat::where('pimpinan_anak_cabang_id', $pimpinan_anak_cabang_id)->get();
        return response()->json($pimpinanKomisariat);
    }
}
