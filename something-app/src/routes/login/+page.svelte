<script lang="ts">
	interface User {
		email: string;
		password: string;
	}
</script>

<div class="form-container">
	<form method="POST" action="?/login">
		<label for="email">Email</label>
		<input type="email" name="email" />

        <label for="password">Password</label>
        <input type="password" name="password">

        <button>Log in</button>
	</form>
</div>

<style>
</style>
