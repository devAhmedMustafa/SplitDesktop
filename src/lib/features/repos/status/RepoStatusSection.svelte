<script lang="ts">

    const {repoPath} = $$props;

    import RepoStatus from "./RepoStatus";
    import RepoStatusStringParser from "./RepoStatusStringParser";
    import EngineAPI from "$lib/core/EngineAPI";
    import { onMount } from "svelte";

    let status : RepoStatus | null = null;

    onMount(() => {
        EngineAPI.getRepositoryStatus(repoPath).then(repoStatus => {
            status = repoStatus ? RepoStatusStringParser.parse(repoStatus) : null;
        });
    });

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
            <li>Modified: {file}</li>
        {/each}
        {#each status.deletedFiles as file}
            <li>Removed: {file}</li>
        {/each}
        {#each status.untrackedFiles as file}
            <li>Untracked: {file}</li>
        {/each}
    {:else}
        <li>Loading...</li>
    {/if}
</ul>

