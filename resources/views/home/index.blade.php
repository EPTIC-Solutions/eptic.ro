<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" href="/favicon.png" />
    <title>EPTIC Solutions</title>
    <meta name="description" content="EPTIC Solutions is a romanian based software agency." />
    @vite(['resources/css/app.css', 'resources/js/main.ts'])
</head>

<body>
    <div id="loader">
        Loading
        <span class="loader"></span>
    </div>
    <div id="app" class="loading">
        <div id="terminal"></div>
        <div id="line" data-line="visitor@eptic.ro:~$" hidden>
            <input type="text" id="command-input" class="command-text" />
        </div>
    </div>

    <script>
        window.repos = @json($repos);
    </script>
</body>

</html>
