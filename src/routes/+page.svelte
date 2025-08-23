<script lang="ts">
  import { goto } from "$app/navigation";
  import AuthContext from "$lib/features/auth/AuthContext";
  import { onMount } from "svelte";

  onMount(()=>{
    const authContext = AuthContext.getInstance();

    if (!authContext.isAuthenticated()){
      goto('/auth');
    }

  })

</script>

<main class="container">
  
</main>

