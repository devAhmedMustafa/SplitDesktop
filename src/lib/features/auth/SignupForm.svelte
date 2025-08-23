<script lang="ts">
    import { goto } from "$app/navigation";
  import api from "$lib/utils/apis/api";
  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleSignup() {
    error = '';
    loading = true;
    try {
      const res = await api.post('/auth/signup', { username, password });

      if (res.status !== 200) {
        throw new Error('Signup failed.');
      }

      goto('/auth/login');

    } catch (e: any) {
      error = e?.response?.data?.message || 'Signup failed.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSignup} class="auth-form">
  <input
    class="input"
    type="text"
    placeholder="Username"
    bind:value={username}
    required
    autocomplete="username"
  />
  <input
    class="input"
    type="password"
    placeholder="Password"
    bind:value={password}
    required
    autocomplete="new-password"
  />
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <button class="submit-btn" type="submit" disabled={loading}>
    {loading ? 'Signing up...' : 'Sign Up'}
  </button>
</form>

<style>
    .auth-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        background: #f9fafb;
        transition: border 0.2s;
    }
    .input:focus {
        border: 1.5px solid #6366f1;
        outline: none;
        background: #fff;
    }
    .submit-btn {
        width: 100%;
        padding: 0.75rem 1rem;
        background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
        color: #fff;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    .error {
        color: #ef4444;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.98rem;
        text-align: center;
    }
</style>