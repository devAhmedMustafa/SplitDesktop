<script lang="ts">

    const {repoPath} = $$props;

    import RepoStatus from "./RepoStatus";
    import RepoStatusStringParser from "./RepoStatusStringParser";
    import EngineAPI from "$lib/core/EngineAPI";
    import { onMount } from "svelte";

    onMount(() => {
        EngineAPI.getRepositoryStatus(repoPath).then(status => {
            console.log(status);
        });
    });

</script>

