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

<ul>
    {#if status}
        <li>Modified: {status.modifiedFiles.length}</li>
        <li>Removed: {status.deletedFiles.length}</li>
        <li>Untracked: {status.untrackedFiles.length}</li>
    {:else}
        <li>Loading...</li>
    {/if}
</ul>

<ul>
    {#if status}
        {#each status.modifiedFiles as file}
            <input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
            <label for={file}>Modified: {file}</label>
        {/each}
        {#each status.deletedFiles as file}
            <input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
            <label for={file}>Removed: {file}</label>
        {/each}
        {#each status.untrackedFiles as file}
            <input type="checkbox" id={file} on:change={e => toggleFileSelection(file, (e.target as HTMLInputElement).checked)} />
            <label for={file}>Untracked: {file}</label>
        {/each}
    {:else}
        <li>Loading...</li>
    {/if}
</ul>

