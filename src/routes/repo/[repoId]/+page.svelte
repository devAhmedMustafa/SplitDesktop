<script lang="ts">

    import {page} from "$app/stores";
    import RepoStatusSection from "$lib/features/repos/status/RepoStatusSection.svelte";
    import RepositoryStore from "$lib/features/repos/store/RepositoryStore";
    import RepositoryContext from "$lib/features/repos/store/RepositroyContext";
    import { onMount } from "svelte";
    import { on } from "svelte/events";

    $: repoId = $page.params.repoId;

    onMount(()=>{

        if (!repoId){
            throw new Error("repoId is undefined");
        }

        if (!RepositoryStore.getInstance().hasRepository(repoId)){
            throw new Error(`Repository with id ${repoId} not found`);
        }

        RepositoryContext.getInstance().setRepository(repoId!);
    })

</script>

<main>
    <h1>Repository</h1>
    <h3>{repoId}</h3>

    <RepoStatusSection repoPath={RepositoryStore.getInstance().getRepositoryPath(repoId!)} />
</main>