<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
    <title>EPTIC Solutions</title>
    <meta name="description" content="EPTIC Solutions is a romanian based software agency." />
    <script async src="https://analytics.eptic.ro/script.js" data-website-id="8b56bd02-1b30-4f98-93e2-7994bd258d25">
    </script>
    @vite(['resources/css/app.css'])
</head>

<body>
    <div class="flex flex-col items-center justify-center h-screen min-h-screen px-2 text-zinc-500">
        <div class="mb-16">
            <img width="300" height="100" src="https://raw.githubusercontent.com/EPTIC-Solutions/art/master/logos/default-monochrome.svg" alt="Eptic LOGO" />
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-screen-lg">
            @foreach($repos as $repo)
            <div class="flex flex-col justify-between shadow hover:drop-shadow hover:scale-105 transition border border-zinc-300 rounded-md p-4 bg-gradient-to-b to-zinc-50 from-white">
                <div class="mb-2">
                    <a href="{{ $repo['html_url'] }}" class="text-blue-400">
                        {{ $repo['full_name'] }}
                    </a>
                    @if($repo['description'])
                    <p class="mt-1 text-sm">{{ $repo['description'] }}</p>
                    @endif
                </div>
                <div class="flex items-center justify-between text-sm">
                    @if($repo['language'])
                    <span>{{ $repo['language'] }}</span>
                    @endif
                    @isset($repo['licence'])
                    <span>{{ $repo['licence']['name'] }}</span>
                    @endisset
                </div>
            </div>
            @endforeach
        </div>
    </div>
</body>

</html>
