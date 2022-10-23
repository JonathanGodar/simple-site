<script lang="ts">
import type { liquid } from "./flask";
import Flask from "./flask.svelte";

let flasks: liquid[][] = [
	[
		{
				id: 1,
				ammount: 10,
		},
		{
				id: 2,
				ammount: 50,
		}
	],
	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],
	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		} ],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

	[
		{
				id: 2,
				ammount: 50,
		},
		{
				id: 3,
				ammount: 50,
		}
	],

];

</script>

<div class="shelf">
{#each flasks as flask}
	<Flask contents={flask}/>
{/each}
</div>


<style>
.shelf {
	display: flex; 
	height: 200px;
	justify-content: space-around;
	flex-wrap: wrap;
}

</style>
