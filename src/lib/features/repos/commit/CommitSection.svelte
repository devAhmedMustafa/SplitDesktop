<script lang="ts">
    import CommitHandler from "./CommitHandler";


    const commitHandler = CommitHandler.getInstance();
    let commitMessage = "";

    function handleCommitButtonClick() {
        commitHandler.triggerCommit(commitMessage);
        commitMessage = "";
    }

</script>

<div class="commit-section">
    <input class="commit-input" bind:value={commitMessage} type="text" placeholder="Enter commit message" />
    <button class="commit-btn" on:click={handleCommitButtonClick}>Commit</button>
</div>

<style>
    .commit-section {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1rem;
    }
    .commit-input {
        flex: 1;
        padding: 0.7rem 1rem;
        border-radius: 8px;
        border: 1px solid #2d2e4a;
        background: #23243a;
        color: #e6e6f0;
        font-size: 1rem;
        outline: none;
        transition: border 0.2s;
    }
    .commit-input:focus {
        border: 1.5px solid #7c3aed;
        background: #23243a;
    }
    .commit-btn {
        background: #7c3aed;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        padding: 0.7rem 1.3rem;
        transition: background 0.2s, color 0.2s;
        box-shadow: 0 2px 8px 0 rgba(80, 60, 180, 0.10);
        outline: none;
    }
    .commit-btn:hover {
        background: #a78bfa;
        color: #e6e6f0;
    }
</style>