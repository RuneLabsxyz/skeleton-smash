<script lang="ts">
  import "../app.css";
  import { initializeStore } from "../stores/dojoStores";
  import { page } from "$app/stores";
  import type { Snippet } from 'svelte';

  const { children } = $props<{
    children: Snippet
  }>();

  async function initStore() {
    try {
      await initializeStore();
      console.log("store initialized");
    } catch (error) {
      console.error("Failed to initialize store:", error);
      throw error;
    }
  }

  let storeInitalization = $state(initStore());

  page.subscribe(p => {
    // We possibly changed the URL, so we need to reset the store.
    storeInitalization = initStore();
  })
</script>


{@render children()}

<!-- {#await storeInitalization}
  Loading...
{:then}
  {@render children()}
{/await}
 -->