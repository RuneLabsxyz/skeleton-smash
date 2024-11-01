<script lang="ts">
    import Game from "./screens/Game.svelte";
    import MainMenu from "./screens/MainMenu.svelte";
    import GameOver from "./screens/GameOver.svelte";
    import type { TPhaserRef } from "./PhaserGame.svelte";

    interface Props {
		currentScene: string;
        phaserRef: TPhaserRef;
	}

    let { currentScene, phaserRef }: Props = $props();

    const changeScene = () => {
        // @todo - create abstract scene class and use it here
        const scene = phaserRef.scene;

        if (scene) {
             // @ts-ignore
            scene.changeScene();
        }
    }
</script>

<div class="ui">
    {#if currentScene === "Game"}
        <Game changeScene={changeScene} />
    {/if}

    {#if currentScene === "MainMenu"}
        <MainMenu changeScene={changeScene} />
    {/if}

    {#if currentScene === "GameOver"}
        <GameOver changeScene={changeScene} />
    {/if}
</div>

<style>
    .ui {
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column-reverse;
        text-align: center;
    }
</style>