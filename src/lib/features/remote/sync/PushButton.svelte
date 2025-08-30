<script lang="ts">
    import RemoteSync from "./RemoteSync";


    function handlePush(){
        RemoteSync.push();
    }

</script>

<button on:click={handlePush}>Push</button>

