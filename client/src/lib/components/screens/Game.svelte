<script lang="ts">
    interface Props {
		changeScene: () => void;
	}

    let { changeScene }: Props = $props();
</script>


<div>
    <button class="button" onclick={changeScene}>Change Scene</button>
</div>

<style>
    .button {
        width: 140px;
        margin: 10px;
        padding: 10px;
        background-color: #1eff00;
        color: rgba(8, 8, 8, 0.87);
        border: 1px solid rgba(0, 0, 0, 0.87);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            border: 1px solid #0ec3c9;
            color: #0ec3c9;
        }

        &:active {
            background-color: #0ec3c9;
        }

        /* Disabled styles */
        &:disabled {
            cursor: not-allowed;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.3);
        }
    }
</style>