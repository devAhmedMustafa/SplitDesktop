<script lang="ts">
    import CommitHandler from "./CommitHandler";


    const commitHandler = CommitHandler.getInstance();
    let commitMessage = "";

    function handleCommitButtonClick() {
        commitHandler.triggerCommit(commitMessage);
        commitMessage = "";
    }

</script>

<div>

    <input bind:value={commitMessage} type="text" placeholder="Enter commit message" />
    <button on:click={handleCommitButtonClick}>Commit</button>

</div>