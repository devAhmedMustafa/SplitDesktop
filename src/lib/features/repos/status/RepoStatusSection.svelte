<script lang="ts">

    const {repoPath} = $$props;

    import RepoStatus from "./RepoStatus";
    import RepoStatusStringParser from "./RepoStatusStringParser";
    import EngineAPI from "$lib/core/EngineAPI";
    import { onMount } from "svelte";
    import CommitHandler from "../commit/CommitHandler";

    let status : RepoStatus | null = null;

    onMount(() => {
        EngineAPI.getRepositoryStatus(repoPath).then(repoStatus => {
            status = repoStatus ? RepoStatusStringParser.parse(repoStatus) : null;
        });
    });

    function toggleFileSelection(file: string, selection: boolean) {
        const commitHandler = CommitHandler.getInstance();
        if (selection) {
            commitHandler.addFileToStage(file);
        } else {
            commitHandler.removeFileFromStage(file);
        }
    }

</script>

<div class="repo-status-section">
    <ul class="repo-status-summary">
        {#if status}
            <li><span class="repo-status-label modified"></span>Modified: {status.modifiedFiles.length}</li>
            <li><span class="repo-status-label removed"></span>Removed: {status.deletedFiles.length}</li>
            <li><span class="repo-status-label untracked"></span>Untracked: {status.untrackedFiles.length}</li>
        {:else}
            <li>Loading...</li>
        {/if}
    </ul>
    <ul class="repo-status-files">
        {#if status}
            {#each status.modifiedFiles as file}
                <li><input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
                <label class="modified" for={file}>Modified: {file}</label></li>
            {/each}
            {#each status.deletedFiles as file}
                <li><input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
                <label class="removed" for={file}>Removed: {file}</label></li>
            {/each}
            {#each status.untrackedFiles as file}
                <li><input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
                <label class="untracked" for={file}>Untracked: {file}</label></li>
            {/each}
        {:else}
            <li>Loading...</li>
        {/if}
    </ul>
</div>

<style>
    .repo-status-section {
        background: #23243a;
        border-radius: 10px;
        padding: 1.2rem 1.5rem;
        margin-bottom: 1.2rem;
        box-shadow: 0 2px 8px 0 rgba(80, 60, 180, 0.06);
    }
    .repo-status-summary {
        display: flex;
        gap: 2rem;
        margin-bottom: 0.7rem;
        color: #b7aaff;
        font-weight: 600;
        font-size: 1rem;
        list-style: none;
        padding: 0;
    }
    .repo-status-label {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 0.5em;
    }
    .repo-status-label.modified { background: #fbbf24; }
    .repo-status-label.removed { background: #ef4444; }
    .repo-status-label.untracked { background: #38bdf8; }
    .repo-status-files {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }
    .repo-status-files label.modified { color: #fbbf24; }
    .repo-status-files label.removed { color: #ef4444; }
    .repo-status-files label.untracked { color: #38bdf8; }
    .repo-status-files input[type="checkbox"] {
        accent-color: #7c3aed;
        margin-right: 0.5em;
    }
</style>

