<script lang="ts">
import { onMount } from "svelte";

import type { liquid } from "./flask";
import Flask from "./flask.svelte";
import GameplayCapture from "./gameplay_capture.svelte";
import { is_solved, move, solve } from "./solver";

let move_amt = 1;
let flasks: liquid[][] = [
[
	{ammount: 1, id: 0},
	{ammount: 1, id: 1},
	{ammount: 2, id: 2},
],
[
	{ammount: 1, id: 3},
	{ammount: 1, id: 4},
	{ammount: 1, id: 5},
	{ammount: 1, id: 6},
],
[
	{ammount: 1, id: 7},
	{ammount: 1, id: 3},
	{ammount: 1, id: 8},
	{ammount: 1, id: 9},
],
[
	{ammount: 1, id: 7},
	{ammount: 1, id: 4},
	{ammount: 1, id: 8},
	{ammount: 1, id: 7},
],
[
	{ammount: 1, id: 1},
	{ammount: 1, id: 8},
	{ammount: 1, id: 10},
	{ammount: 1, id: 0},
],
[
	{ammount: 1, id: 10},
	{ammount: 1, id: 1},
	{ammount: 1, id: 9},
	{ammount: 1, id: 1},
],
[
	{ammount: 1, id: 9},
	{ammount: 1, id: 3},
	{ammount: 1, id: 8},
	{ammount: 1, id: 11},
],
[
	{ammount: 1, id: 11},
	{ammount: 1, id: 3},
	{ammount: 1, id: 4},
	{ammount: 1, id: 11},
],
[
	{ammount: 1, id: 5},
	{ammount: 1, id: 6},
	{ammount: 1, id: 2},
	{ammount: 1, id: 0},
],
[
	{ammount: 1, id: 9},
	{ammount: 1, id: 10},
	{ammount: 1, id: 6},
	{ammount: 1, id: 5},
],
[
	{ammount: 1, id: 6},
	{ammount: 1, id: 10},
	{ammount: 1, id: 11},
	{ammount: 1, id: 0},
],
[
	{ammount: 1, id: 5},
	{ammount: 1, id: 2},
	{ammount: 1, id: 4},
	{ammount: 1, id: 7},
],
[],
[]
];
	// 0 "lightgreen",
	// 1 "purple",
	// 2 "brown",
	// 3 "lightblue",
	// 4 "green",
	// 5 "red",
	// 6 "gray",
	// 7 "yellow",
	// 8 "pink",
	// 9 "darkgreen",
	// 10 "magenta",
	// 11 darkblue
let selected: number | undefined = undefined;


let prev: Generator | undefined; 
function pour(from: number, to: number){
	move(flasks, from, to, move_amt);
	flasks = flasks;
}



function onFlaskPressed(index: number){
	if(selected === undefined) {
		if(flasks[index].length === 0) return;
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
	 <p>{i}</p>
			<Flask isSelected={i === selected} contents={flask} on:click={
				() => {
					onFlaskPressed(i);
				}
			}/>
{/each}
</div>

<button on:click={() => {
	if(prev == undefined) prev = solve(flasks); 

	setInterval(() => {
		if(prev == undefined) {
			alert("Prev was undefiend");
		  return;
		}

		prev.next();
		flasks = flasks;
	}, 0);

}
}>Slove</button>

<button on:click={() => {
	if(prev == undefined) prev = solve(flasks); 
	prev.next();
	flasks = flasks;
}
}>Take one step</button>

<input type="range" min="1" max="4" bind:value={move_amt}>
{move_amt}
<GameplayCapture></GameplayCapture>
<style>
.shelf {
	display: flex; 
	height: 200px;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>
