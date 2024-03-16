<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index(): Response
    {
        $repos = Cache::store('octane')->remember('repos', 3600, function () {
            return Http::get('https://api.github.com/users/EPTIC-Solutions/repos')->json();
        });

        return response()
            ->view('home.index', ['repos' => $repos])
            ->withHeaders([...$this->getCacheHeaders()]);
    }

    private function getCacheHeaders(): array
    {
        return [
            'Cache-Control' => 'public, max-age=600, s-maxage=3600, stale-while-revalidate=60'
        ];
    }
}
