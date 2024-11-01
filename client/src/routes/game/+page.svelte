<script lang="ts">

    import type { Scene } from "phaser";
    import PhaserGame, { type TPhaserRef } from "$lib/components/PhaserGame.svelte";
    import UiManager from "$lib/components/UiManager.svelte";

    let phaserRef: TPhaserRef = { game: null, scene: null};
    let currentScene = '';

    // Use Event Bus to avoid this
    const setCurrentScene = (scene: Scene) => {
        currentScene = scene.scene.key;
    }
    
</script>

<div id="app">
    <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={setCurrentScene} />
    <UiManager phaserRef={phaserRef} currentScene={currentScene} />
</div>

<style>
    #app {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>