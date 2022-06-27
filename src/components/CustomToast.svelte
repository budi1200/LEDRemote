<script lang="ts">
  import {SvelteToast} from "@zerodevx/svelte-toast";
</script>

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 0.5rem;
    --toastContainerLeft: 1rem;

    --toastMinHeight: 3rem;

    --toastBackground: rgb(49, 49, 49);
    --toastBorderRadius: 4px;

    --toastBarHeight: 3px;
    --toastBarBackground: rgba(255, 255, 255, .50);

    --toastMsgPadding: 0.5rem 0.5rem;
  }
</style>

<SvelteToast/>