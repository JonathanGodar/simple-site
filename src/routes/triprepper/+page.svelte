<!-- A page where you can paste the url of an external website and it will copy the html of said website and when you navigate the site you will download the pages you have visited in a bundle-->
<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from '../../../.svelte-kit/types/src/routes/$types';
// https://stackoverflow.com/questions/68133276/ssr-explained-in-sveltekit

	let website_origin: string = "https://google.com";
	onMount(() => {
		console.log(data);
	});

	export let data: any;
</script>
<div class="settings">
	<form on:submit={() => alert("hello world!")}>
		<label for="url">Enter website url</label>
		<input name="url" type="textbox" placeholder="google.com" bind:value={website_origin}/>
		<input type="submit" />
	</form>
</div>


<div style="height: auto; width: auto;">
<!-- <iframe style="height: auto; width: auto;"> -->
{@html data.extern_site_body}
<!-- </iframe> -->
</div>