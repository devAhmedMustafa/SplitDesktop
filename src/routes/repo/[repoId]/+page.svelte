<script lang="ts">

    import {page} from "$app/stores";
    import RepoStatusSection from "$lib/features/repos/status/RepoStatusSection.svelte";
    import RepositoryStore from "$lib/features/repos/store/RepositoryStore";

    $: repoId = $page.params.repoId;

</script>

<main>
    <h1>Repository</h1>
    <h3>{repoId}</h3>

    <RepoStatusSection repoPath={RepositoryStore.getInstance().getRepositoryPath(repoId!)} />
</main>