<script lang="ts">

</script>

<div class="w-full h-1/4 bg-red-800/50 flex items-center justify-center">
    <div class="container mx-auto px-4 text-center text-white text-4xl">
        <div>You died</div>
        <button class="bg-white text-black px-4 py-2 rounded-md" onclick={() => {
                window.location.href = '/game';
            }}>Try again
        </button>
    </div>
</div>
