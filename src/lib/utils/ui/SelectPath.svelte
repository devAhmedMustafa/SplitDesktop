<script lang="ts">

    import {open} from "@tauri-apps/plugin-dialog";

    export let onPathSelected: (path: string) => void;

    async function selectPath(){
        const folderPath = await open({ 
            directory: true, 
            multiple: false, 
            title: "Select Repository Root" 
        });

        if (folderPath) {
            console.log("Selected folder:", folderPath);
            onPathSelected(folderPath);
        }
    }

</script>

<button on:click={selectPath}>
    <slot />
</button>