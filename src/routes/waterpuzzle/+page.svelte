<script lang="ts">
import type { liquid } from "./flask";
import Flask from "./flask.svelte";

let flasks: liquid[][] = [
	[
		{
				id: 1,
				ammount: 1,
		},
		{
				id: 2,
				ammount: 3,
		}
	],
	[
		{
				id: 2,
				ammount: 2,
		},
		{
				id: 3,
				ammount: 2,
		}
	],
	[
		{
				id: 2,
				ammount: 1,
		},
		{
				id: 3,
				ammount: 1,
		} ],

	[
		{
				id: 2,
				ammount: 1,
		},
		{
				id: 3,
				ammount: 3,
		}
	],
];

let selected: number | undefined = undefined;


function pour(from: number, to: number){
	
}


function onFlaskPressed(index: number){
	if(!selected) {
		selected = index;
	} else if(selected == index) {
		selected = undefined;
	} else {
		pour(selected, index);
		selected = undefined;
	}
}
</script>

<div class="shelf">
{#each flasks as flask, i}
	<Flask contents={flask} on:click={
		() => {
			onFlaskPressed(i);
		}
	}/>
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
