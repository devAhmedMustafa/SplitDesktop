<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, signInWithGoogle, signOutGoogle } from './firebase';
  import api from '$lib/utils/apis/api';
  import { onAuthStateChanged, type User } from 'firebase/auth';

  let user: User | null = null;
  let isCheckingAuth = true;

  function handleLogin() {
    // Call the function directly and use .then() for handling the promise
    signInWithGoogle()
      .then(result => {
        if (result) {
          console.log("ID Token:", result.token);
          // You can handle the backend call here
          api.post('/auth/google-login', { token: result.token })
            .then(res => {
              console.log("User authenticated:", res.data);
            })
            .catch(apiErr => {
              console.error("API call failed:", apiErr);
              alert("Backend authentication failed: " + apiErr.message);
            });
        }
      })
      .catch(err => {
        if (err.code === "auth/popup-blocked") {
          console.error("Popup blocked by browser.");
          alert("Popup blocked. Please enable popups for this site and try again.");
        } else {
          console.error("Login failed:", err);
          alert("Login failed: " + err.message);
        }
      });
  }

  async function handleLogout() {
    await signOutGoogle();
  }

  onMount(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      isCheckingAuth = false;
      if (user) {
        console.log("User is logged in:", user.displayName);
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  });
</script>

---

{#if isCheckingAuth}
  <p>Checking authentication status...</p>
{:else if user}
  <p>Welcome {user.displayName}</p>
  <button on:click={handleLogout}>Sign Out</button>
{:else}
  <button on:click={handleLogin}>Sign in with Google</button>
{/if}