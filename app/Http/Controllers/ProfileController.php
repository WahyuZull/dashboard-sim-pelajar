<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Pimpinan;
use App\Models\Province;
use App\Models\Regency;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


use Illuminate\Routing\Controllers\HasMiddleware;

class ProfileController extends Controller implements HasMiddleware
{
    /**
     * Display the user's profile form.
     */

    public static function middleware(): array
    {
        return ['permission:edit-profile'];
    }

    public function edit(Request $request): Response
    {

        $user = User::find(auth()->id());
        $pimpinans = Pimpinan::all();

        return Inertia::render('Dashboard/Profile/Edit', compact('user', 'pimpinans'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'pimpinan_id' => 'required',
        ]);

        $user = auth()->user();
        $data = $request->only('name', 'email', 'pimpinan_id');

        $user->update(
            ['user_id' => $user->id],
            $data
        );

        session()->flash('success', 'Profile updated successfully.');

        return Redirect::route('dashboard.profile.edit');
    }
}
