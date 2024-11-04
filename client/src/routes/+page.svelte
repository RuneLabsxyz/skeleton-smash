<script lang="ts">
  let startGame = false;
</script>

{#if !startGame}
  <div class="title-screen">
    <h1 class="font-halloween text-6xl text-white pb-8">Skeleton Smash</h1>
    <button
      class="start-button"
      on:click={() => {
        startGame = true;
        window.location.href = "/game";
      }}
    >
      Start Playing
    </button>
  </div>
{/if}

<style>
  .title-screen {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
  }

  .start-button {
    padding: 15px 40px;
    font-size: 24px;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .start-button:hover {
    transform: scale(1.1);
  }

  @keyframes glow {
    from {
      text-shadow:
        0 0 5px #fff,
        0 0 10px #fff;
    }
    to {
      text-shadow:
        0 0 10px #fff,
        0 0 20px #fff;
    }
  }
</style>
