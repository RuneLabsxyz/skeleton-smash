<script lang="ts">
    import { commitSeppuku } from "$lib/api/run";
</script>

<div class="absolute top-4 right-4 text-xl font-bold">
    <button class="bg-red-500 text-white px-4 py-2 rounded-md" onclick={commitSeppuku}>Commit Seppuku</button>
</div>