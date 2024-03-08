<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" href="/favicon.png" />
    <title>EPTIC Solutions</title>
    <meta name="description" content="EPTIC Solutions is a romanian based software agency." />
    @production
        <script async src="https://analytics.eptic.ro/script.js" data-website-id="8b56bd02-1b30-4f98-93e2-7994bd258d25">
        </script>
    @endproduction
    @vite(['resources/css/app.css'])
</head>

<body class="dark:bg-zinc-900">
    <div class="flex flex-col items-center min-h-screen px-4 md:px-8 text-zinc-500 dark:text-zinc-300">
        <div class="my-8 md:my-16">
            <img width="300" height="100" src="https://raw.githubusercontent.com/EPTIC-Solutions/art/master/logos/default-monochrome.svg" alt="Eptic LOGO" />
        </div>
        <div class="grid max-w-screen-lg grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            @foreach($repos as $repo)
            <div class="flex flex-col justify-between p-4 transition border rounded-md card border-zinc-300 dark:border-zinc-700 bg-gradient-to-b to-zinc-50 from-white dark:to-zinc-950 dark:from-zinc-900">
                <div class="mb-2">
                    <a href="{{ $repo['html_url'] }}" class="text-blue-400 dark:text-blue-500">
                        {{ $repo['full_name'] }}
                    </a>
                    @if($repo['full_name'] === 'EPTIC-Solutions/eptic.ro')
                        <p class="mt-1 text-sm">The website you are currently on.</p>
                    @else
                        @if($repo['description'])
                        <p class="mt-1 text-sm">{{ $repo['description'] }}</p>
                        @endif
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
