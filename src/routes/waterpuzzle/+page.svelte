<script lang="ts">
import { onMount } from "svelte";

import type { liquid } from "./flask";
import Flask from "./flask.svelte";
import GameplayCapture from "./gameplay_capture.svelte";
import { is_solved, move, solve } from "./solver";

let move_amt = 1;
let flasks: liquid[][] = [
/* [ */
/* {ammount: 2, id: 2}, */
/* ], [ */
/* {ammount: 2, id: 2}, */
/* ] */


[
	{ammount: 1, id: 2},
	{ammount: 1, id: 0},
],
[
	{ammount: 1, id: 3},
	{ammount: 1, id: 1},
],
[
	{ammount: 1, id: 0},
	{ammount: 2, id: 4},
	{ammount: 1, id: 3},
],
[
	{ammount: 1, id: 3},
	{ammount: 1, id: 0},
	{ammount: 2, id: 1},
],
[
	{ammount: 1, id: 2},
	{ammount: 1, id: 1},
	{ammount: 2, id: 4},
],
[
	{ammount: 1, id: 0},
	{ammount: 1, id: 2},
	{ammount: 1, id: 3},
	{ammount: 1, id: 2},
],

// One case
	/* [ */
	/* 	{ammount: 1, id: 0}, */
	/* 	{ammount: 1, id: 1}, */
	/* 	{ammount: 1, id: 0}, */
	/* ], */
	/* [ */
	/* 	{ammount: 1, id: 1}, */
	/* 	{ammount: 1, id: 0}, */
	/* 	{ammount: 2, id: 2}, */
	/* ], */
	/* [ */
	/* 	{ammount: 1, id: 0}, */
	/* 	{ammount: 1, id: 3}, */
	/* 	{ammount: 1, id: 4}, */
	/* 	{ammount: 1, id: 3}, */
	/* ], */
	/* [ */
	/* 	{ammount: 1, id: 1}, */
	/* ], */
	/* [ */
	/* 	{ammount: 1, id: 4}, */
	/* 	{ammount: 1, id: 2}, */
	/* 	{ammount: 2, id: 4}, */
	/* ], */
	/* [ */
	/* 	{ammount: 1, id: 1}, */
	/* 	{ammount: 2, id: 3}, */
	/* 	{ammount: 1, id: 2}, */
	/* ], */
];

let selected: number | undefined = undefined;


let prev: Generator | undefined; 
function pour(from: number, to: number){
	move(flasks, from, to, move_amt);
	flasks = flasks;
	/* if(flasks[to].length === 0){ */
	/* 	flasks[to].push(flasks[from].shift() as any); */
	/* 	flasks = flasks; */
	/* 	return; */
	/* } */

	/* if(flasks[from][0].id !== flasks[to][0].id) return; */

	/* const to_filled = flasks[to].reduce((prev, flask) => prev + flask.ammount, 0); */
	/* const maximum_pour = flasks[from][0].ammount; */

	/* const remaining_space = 4 - to_filled; */
	/* const to_pour = Math.min(maximum_pour, remaining_space); */

	/* flasks[from][0].ammount = flasks[from][0].ammount - to_pour; */
	/* if(flasks[from][0].ammount === 0) flasks[from].shift(); */

	/* flasks[to][0].ammount = flasks[to][0].ammount + to_pour; */
	
	/* if(is_solved(flasks)) alert("You solved it!"); */
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
			<Flask isSelected={i === selected} contents={flask} on:click={
				() => {
					onFlaskPressed(i);
				}
			}/>
{/each}
</div>


<button on:click={() => {
	if(prev == undefined) prev = solve(flasks); prev.next();
	flasks = flasks;
}
}>Solve!</button>
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
