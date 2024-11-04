<script lang="ts">
  import { onMount } from 'svelte';

  interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
  }

  let stars: Star[] = [];
  
  function generateStars(count = 200) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Random size between 0.5px and 2.5px
      opacity: Math.random() * 0.7 + 0.3 // Random opacity between 0.3 and 1
    }));
  }

  onMount(() => {
    stars = generateStars();
  });
</script>

<style>
  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    overflow: hidden;
    background-color: #000000;
  }

  .star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
  }

  .background-image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%); /* Center the image vertically */
    max-height: 66%; /* Limit the height to 66% of the container */
    width: auto; /* Maintain aspect ratio */
  }

  .left-image {
    left: 0;
    transform: translate(-50%, -50%); /* Move half off-screen to the left and center vertically */
  }

  .right-image {
    right: 0;
    transform: translate(50%, -50%); /* Move half off-screen to the right and center vertically */
  }

  /* Hide images on smaller screens */
  @media (max-width: 800px) {
    .left-image,
    .right-image {
      display: none;
    }
  }
</style>

<div class="background-container">
    {#each stars as star}
      <div
        class="star"
        style="
          left: {star.x}%;
          top: {star.y}%;
          width: {star.size}px;
          height: {star.size}px;
          opacity: {star.opacity};
        "
      ></div>
    {/each}
    
    <img
      src="/bg/SKULL.jpg"
      alt="Background image"
      class="background-image left-image"
      aria-hidden="true"
    />
    
    <img
      src="/bg/SKULL.jpg"
      alt="Background image"
      class="background-image right-image"
      aria-hidden="true"
    />
  </div>
  