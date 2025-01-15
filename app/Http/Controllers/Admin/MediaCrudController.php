<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MediaCrudController extends Controller
{
    //
    public function index()
    {
        $medias = Media::paginate(10);

        return Inertia::render('Dashboard/Media/Index', [
            'medias' => $medias
        ]);
    }

    public function destroy($id)
    {
        $media = Media::find($id);

        if (!$media) {
            session()->flash('error', 'Media tidak ditemukan');
        }

        // delete file
        $file_path = $media->filepath;
        $file_path = str_replace('storage/', '', $file_path);
        $file_path = storage_path('app/public/' . $file_path);
        if (file_exists($file_path)) {
            unlink($file_path);
        }

        // delete database
        $media->delete();

        session()->flash('success', 'Media berhasil dihapus');
        return redirect()->route('dashboard.media.index');
    }
}
