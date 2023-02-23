<script lang="ts">
  import FirebaseSingleton from "../libs/firebase";
  import { getBoolean } from "firebase/remote-config";
  import { onMount } from "svelte";
  import { logEvent } from "firebase/analytics";

  let show = false;
  onMount(async () => {
    const remoteConfig = await FirebaseSingleton.getRemoteConfig();
    if (remoteConfig) {
      show = getBoolean(remoteConfig, "show_terminal");
    }

    if (show && FirebaseSingleton.analytics) {
      logEvent(FirebaseSingleton.analytics, "terminal_shown");
    }
  });
</script>

<div
  class="absolute px-2 text-right text-white -translate-x-1/2 bg-blue-500 top-2 left-1/2 rounded py-0.5"
>
  <a
    href="https://terminal.eptic.ro/?ref=eptic.ro"
    class="flex items-center justify-center font-mono"
  >
    Check out the new terminal app
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      class="ml-2 h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </a>
</div>
