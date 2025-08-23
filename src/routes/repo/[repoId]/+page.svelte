<script>

    import {page} from "$app/stores";

    $: repoPath = $page.params.repoId;

</script>

<main>
    <h1>Repository</h1>
    <h3>{repoPath}</h3>
</main>