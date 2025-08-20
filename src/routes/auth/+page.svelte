<script lang="ts">

    import GoogleSignIn from "$lib/auth/GoogleSignIn.svelte";

</script>


<div class="auth-bg">
    <div class="auth-card">
        <h1>Sign in to Your Account</h1>
        <GoogleSignIn />
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
</style>