<script lang="ts">
  export let name: string;
  export let color: string = "white";
  export let icon: string | undefined = undefined;
  export let text: string = "";
  export let click: Function;
</script>

<div
  style={`background-color: ${color}; font-size: ${text.length === 1 ? "22px" : "84%"}`}
  class="m-2 rounded-3xl w-16 h-16 flex justify-center items-center cursor-pointer shadow-sm shadow-white/50"
  on:click={() => click(name)}
>
  {#if icon}
    <img src={`assets/symbols/${icon}`} alt={""}/>
  {/if}

  {#if text}
    {text}
  {/if}
</div>