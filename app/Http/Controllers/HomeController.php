<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    public function index(): Response
    {
        $repos = Cache::remember('repos', 3600, function () {
            return collect(Http::pool(fn ($pool) => [
                $pool->get('https://api.github.com/users/wizzymore/repos'),
                $pool->get('https://api.github.com/users/EPTIC-Solutions/repos'),
            ]))
                ->map(fn ($i) => $i->json())
                ->collapse()
                ->sortByDesc('updated_at')
                ->values()
                ->map(fn ($repo) => [
                    'full_name' => $repo['full_name'],
                    'description' => $repo['description'],
                    'html_url' => $repo['html_url'],
                    'language' => $repo['language'],
                ]);
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
