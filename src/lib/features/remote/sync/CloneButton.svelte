<script lang="ts">
    import SelectPath from "$lib/utils/ui/SelectPath.svelte";
    import type IRemoteRepo from "../IRemoteRepo";

    const repo: IRemoteRepo = $$props.repo;

    import RemoteSync from "./RemoteSync";

    function handlePathChange(path: string) {
        RemoteSync.clone(repo, path);
    }

</script>

<SelectPath
    onPathSelected={handlePathChange}
>

Clone

</SelectPath>