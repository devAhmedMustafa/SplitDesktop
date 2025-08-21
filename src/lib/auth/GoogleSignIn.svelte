<script lang="ts">
  import { onMount } from 'svelte';
  import api from '../utils/api';
    import AuthContext from './AuthContext';
    import type IUser from './IUser';
    import { goto } from '$app/navigation';

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;

  let buttonEl: HTMLDivElement;

  async function handleGoogleSignInCallback(response: { credential: string }) {

    const res = await api.post('/auth/google-login', {
      token: response.credential
    });

    const authContext = AuthContext.getInstance();

    const data = res.data;

    const user : IUser = {
      id: data.id,
      email: data.email,
    }

    authContext.login(user, data.token);
    goto('/');
  }

  onMount(() => {
    
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = () => {
      // @ts-ignore - global from GIS
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleGoogleSignInCallback,
        ux_mode: 'redirect',
        login_url: "http://localhost:1420/auth"
      });

      // @ts-ignore
      google.accounts.id.renderButton(buttonEl, {
        type: 'standard', size: 'large', shape: 'pill', theme: 'outline'
      });

      // Optional One Tap
      // @ts-ignore
      google.accounts.id.prompt();
    };
    document.head.appendChild(s);
  });
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={buttonEl} />
