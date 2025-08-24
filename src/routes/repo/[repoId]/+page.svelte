<script>

    import {page} from "$app/stores";
    import RepoStatusSection from "$lib/features/repos/status/RepoStatusSection.svelte";

    $: repoPath = $page.params.repoId;

</script>

<main>
    <h1>Repository</h1>
    <h3>{repoPath}</h3>

    <RepoStatusSection {repoPath} />
</main>