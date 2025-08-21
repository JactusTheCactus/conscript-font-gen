<script>
	import favicon from "$lib/assets/favicon.svg";
	import "$lib/assets/style.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<body>
	<nav>
		<a href="/">Home</a>
	</nav>
</body>

{@render children?.()}
