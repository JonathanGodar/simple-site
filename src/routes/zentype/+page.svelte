<script lang="ts">
import { onMount } from "svelte";

type letterStatus = "typed" | "notTyped" | "incorrect" | "next";
type letters = {character: string, status: letterStatus}[];

let stringToType: letters = "hello world this is a simple test".split('').map(val => {
		return {
			character: val,
			status: "notTyped",
		}
	});

let typed = "";

$: {
	for(let i = 0; i < typed.length; i++){
		stringToType[i].status = typed[i] == stringToType[i].character ? "typed" : "incorrect";
}

	for(let i = typed.length; i < stringToType.length; i++){
			stringToType[i].status = "notTyped";
	}
}


function keyPress(evt: KeyboardEvent){
	if(evt.metaKey) return;

	if(evt.key === "Backspace") {
		if(evt.ctrlKey) {
			typed = typed.split(" ").slice(0, -1).join(" ");

		} else {
			typed = typed.slice(0, typed.length -1);
		}
	} 
	if(evt.key.length == 1) {
		typed = typed + evt.key;
	}
}


</script>

<svelte:window on:keydown={keyPress}/>

<h1>
	{#each stringToType as letter, i }
		<span class={letter.status}>{letter.character}</span>
	{/each}
</h1>

<h1>{typed}</h1>


<style>
.notTyped {
		color: gray;
}

.typed {
	color: black;
}

.incorrect {
	color: red;
	opacity: 0.7;
}

</style>
