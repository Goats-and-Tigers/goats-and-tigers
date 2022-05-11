<script>
    import { user } from "..//user";

    let password;
    let username;

    const login = () => {
        user.auth(username, password, ({ err }) => err && console.log(err));
    };
    const signup = () => {
        user.create(username, password, ({ err }) => err && console.log(err));
        console.log("success");
    };
</script>

<input bind:value={username} placeholder="username" class="text-[black]" />
<input
    bind:value={password}
    placeholder="password"
    type="password"
    class="text-[black]"
/>

<button on:click={login}>Login</button>
<button on:click={signup}>signup</button>
