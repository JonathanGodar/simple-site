<script lang="ts">
import Flask from "./flask.svelte";
import type { flask } from "./flask";

let flasks: flask[] = [{
	liquids: {
			id: 1,
			ammount: 10,
	}
}];

</script>

{#each flasks as flask }
	<Flask me={flask}/>
{/each}

