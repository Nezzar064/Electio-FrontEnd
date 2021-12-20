<script>
	import '../app.css';
	import { scrollTop } from 'svelte-scrolling'
</script>

<div class="navbar  shadow-lg bg-neutral text-neutral-content bg-base-100 ">
	<div class="flex-none px-2 mx-2">
    <span class="text-lg font-bold">
            KEA PROTOKOL
          </span>
	</div>
	<div class="flex-1 px-2 mx-2">
		<div class="items-stretch lg:flex">
			<a sveltekit:prefetch="" href="/" class="btn btn-ghost rounded-btn">
				Home
			</a>
			<div class="dropdown dropdown-hover bg-base-100">
				<div tabindex="0" class="bg-base-100 btn btn-ghost">Classes</div>
				<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-32">

				</ul>
			</div>
			<a sveltekit:prefetch="" href="/statistics" class="btn btn-ghost rounded-btn">
				Statistics
			</a>
		</div>
	</div>
	<div class="flex-none">
		<!--
		<button class="btn btn-square btn-ghost text-error" on:click={() => isAuthenticated.set(false)}>
			LOG OUT
		</button>
		-->
	</div>
</div>

<main>
	<!--
	{#if (!$isAuthenticated)}
		<Index/>
	{:else }
		<slot />
	{/if}
	-->
</main>

<footer>
	<p>I am footer</p>
	<button class="btn btn-ghost btn-sm btn-outline" on:click="{() => scrollTop()}">To Top</button>
</footer>



<style>

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: #8ba4b5;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		background-color: #3d4451;
		color: white;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>

<slot></slot>