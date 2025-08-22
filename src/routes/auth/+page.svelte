<script lang="ts">


    import { writable } from "svelte/store";
    import SignupForm from "$lib/auth/SignupForm.svelte";
    import LoginForm from "$lib/auth/LoginForm.svelte";

    const mode = writable<'login' | 'signup'>('login');

</script>



<div class="auth-bg">
    <div class="auth-card">
            <h1>{$mode === 'signup' ? 'Create an Account' : 'Sign in to Your Account'}</h1>
            <p class="subtitle">{$mode === 'signup' ? 'Sign up to get started' : 'Access your dashboard securely'}</p>

            {#if $mode === 'signup'}
                <SignupForm />
            {:else}
                <LoginForm />
            {/if}

            <div class="switch-mode">
                {#if $mode === 'signup'}
                    Already have an account?
                    <button on:click|preventDefault={() => mode.set('login')}>Sign in</button>
                {:else}
                    Don't have an account?
                    <button on:click|preventDefault={() => mode.set('signup')}>Sign up</button>
                {/if}
            </div>
    </div>
</div>

<style>
    .auth-bg {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
        font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    }
    .auth-card {
        background: #fff;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        border-radius: 18px;
        padding: 3rem 2.5rem 2.5rem 2.5rem;
        min-width: 350px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        border: 1px solid #e5e7eb;
    }
    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        color: #1a202c;
        letter-spacing: -1px;
    }
    .subtitle {
        color: #64748b;
        font-size: 1rem;
        margin-bottom: 1.5rem;
        text-align: center;
    }
    .switch-mode {
        margin-top: 1rem;
        font-size: 1rem;
        color: #64748b;
        text-align: center;
    }
    .switch-mode button {
        color: #6366f1;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.3em;
        cursor: pointer;
        transition: color 0.2s;
    }
    .switch-mode button:hover {
        color: #1e40af;
    }
</style>