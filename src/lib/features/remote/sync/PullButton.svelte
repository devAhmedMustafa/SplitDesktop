<script>

    import RemoteSync from "$lib/features/remote/sync/RemoteSync";

    async function handleButtonClick(){
        try {
            await RemoteSync.pull();
        } catch (error) {
            console.error("Error pulling changes:", error);
        }
    }

</script>

<button on:click={handleButtonClick}>Pull</button>

