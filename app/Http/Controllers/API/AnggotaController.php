<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Anggota;
use Illuminate\Http\Request;

class AnggotaController extends BaseController
{
    public function searchByNia(Request $request)
    {
        try {

            $rules = [
                'captcha' => 'required|captcha_api:' . $request->key . ',math',
                'nia' => 'required',
            ];

            $messages = [
                'captcha.required' => 'Captcha harus diisi!',
                'captcha.captcha_api' => 'Captcha tidak sesuai!',
                'nia.required' => 'NIA harus diisi!',
            ];

            $validator = validator()->make(request()->all(), $rules, $messages);
            if ($validator->fails()) {
                return $this->sendError('Validation error.' . $validator->errors());
            }
            ;

            $anggota = Anggota::where('nia', $request->nia)->first();
            return $this->sendResponse($anggota, 'Anggota retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('An unexpected error occurred. Please try again later.');
        }
    }

    public function searchByNameAndTtl(Request $request)
    {
        try {
            $rules = [
                'captcha' => 'required|captcha_api:' . $request->key . ',math',
                'nama_lengkap' => 'required',
                'tanggal_lahir' => 'required',
            ];

            $messages = [
                'captcha.required' => 'Captcha harus diisi!',
                'captcha.captcha_api' => 'Captcha tidak sesuai!',
                'nama_lengkap.required' => 'Nama harus diisi!',
                'tanggal_lahir.required' => 'Tanggal lahir harus diisi!',
            ];

            $validator = validator()->make(request()->all(), $rules, $messages);
            if ($validator->fails()) {
                return $this->sendError('Validation error.' . $validator->errors());
            }
            ;

            $anggota = Anggota::where([
                'nama_lengkap',
                $request->nama_lengkap,
                'tanggal_lahir' => $request->tanggal_lahir,
            ])->get();
            return $this->sendResponse($anggota, 'Anggota retrieved successfully.');
        } catch (\Throwable $th) {
            return $this->sendError('An unexpected error occurred. Please try again later.');
        }
    }
}
