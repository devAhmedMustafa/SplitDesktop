<script lang="ts">

    import {page} from "$app/stores";
    import PublishButton from "$lib/features/remote/link/PublishButton.svelte";
    import Publisher from "$lib/features/remote/link/Publisher";
    import PullButton from "$lib/features/remote/sync/PullButton.svelte";
    import PushButton from "$lib/features/remote/sync/PushButton.svelte";
    import CommitSection from "$lib/features/repos/commit/CommitSection.svelte";
    import RepoStatusSection from "$lib/features/repos/status/RepoStatusSection.svelte";
    import RepositoryStore from "$lib/features/repos/store/RepositoryStore";
    import RepositoryContext from "$lib/features/repos/store/RepositroyContext";
    import { onMount } from "svelte";

    $: repoId = $page.params.repoId;
    $: isPublished = false;

    onMount(async ()=>{

        if (!repoId){
            throw new Error("repoId is undefined");
        }

        if (!RepositoryStore.getInstance().hasRepository(repoId)){
            throw new Error(`Repository with id ${repoId} not found`);
        }

        RepositoryContext.getInstance().setRepository(repoId!);
        
        isPublished = await Publisher.isPublished(repoId);
    })

</script>


<main class="repo-main">
    <section class="repo-panel">
        <header class="repo-header">
            <h1>Repository</h1>
            <h3>{repoId}</h3>
        </header>
        <div class="repo-status">
            <RepoStatusSection repoPath={RepositoryStore.getInstance().getRepositoryPath(repoId!)} />
        </div>
        <div class="repo-commit">
            <CommitSection/>
        </div>
        <div class="repo-actions">
            {#if !isPublished}
                <PublishButton/>
            {/if}
            {#if isPublished}
                <PushButton/>
                <PullButton/>
            {/if}
        </div>
    </section>
</main>

<style>
    :global(body) {
        background: #191a22;
        color: #e6e6f0;
        font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        min-height: 100vh;
    }
    .repo-main {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #191a22;
    }
    .repo-panel {
        background: #23243a;
        border-radius: 18px;
        box-shadow: 0 8px 32px 0 rgba(80, 60, 180, 0.10);
        padding: 2.5rem 2.5rem 2rem 2.5rem;
        min-width: 350px;
        max-width: 600px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
        border: 1px solid #23243a;
    }
    .repo-header h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #b7aaff;
        margin: 0 0 0.5rem 0;
        letter-spacing: -1px;
        text-align: left;
    }
    .repo-header h3 {
        color: #7c7ca6;
        font-size: 1.1rem;
        font-weight: 400;
        margin: 0 0 1.5rem 0;
        word-break: break-all;
    }
    .repo-status, .repo-commit, .repo-actions {
        margin-bottom: 1.2rem;
    }
    .repo-actions {
        display: flex;
        gap: 1.2rem;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    .repo-actions :global(button) {
        color: #fff;
        font-size: 1.08rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        box-shadow: 0 2px 8px 0 rgba(80, 60, 180, 0.10);
        outline: none;
        padding: 0.7rem 1.3rem;
    }
    .repo-actions :global(button:hover) {
        color: #e6e6f0;
    }
</style>