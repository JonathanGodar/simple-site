<script lang="ts">
	import { SvelteComponent } from 'svelte/internal';


let background:  "normal" | "correct" | "incorrect" = "normal";
let typed = "";

type Test = {
	letter: string;
	answer: string;
}

// let tests: Test[] = [{ letter: "a", answer: "adam"}, {letter: "b", answer: "bertil"}, {letter: "c", answer: "ceasar"}, {letter: "d", answer: "david"}, {letter: "e", answer: "erik"}, {letter: "f", answer: "filip"}, {letter: "g", answer: "gustav"}, {letter: "h", answer: "helge"}, {letter: "i", answer: "ivar"}, {letter: "j", answer: "johan"}, {letter: "k", answer: "kalle"}, {letter: "l", answer: "ludwig"}, {letter: "m", answer: "martin"}, {letter: "n", answer: "niklas"}, {letter: "o", answer: "olof"}, {letter: "p", answer: "petter"}, {letter: "q", answer: "qvintus"}, {letter: "r", answer: "rudolf"}, {letter: "s", answer: "sigurd"}, {letter: "t", answer: "tore"}, {letter: "u", answer: "urban"}, {letter: "v", answer: "viktor"}, {letter: "w", answer: "wilhelm"}, {letter: "x", answer: "xerxes"}, {letter: "y", answer: "yngve"}, {letter: "z", answer: "zäta"}, {letter: "å", answer: "åke"}, {letter: "ä", answer: "ärlig"}, {letter: "ö", answer: "östen"}, ];
let tests: Test[] = 
[
{letter: "a",	answer: "alpha"},
{letter: "b", answer: "bravo"},
{letter: "c", answer: "charlie"},
{letter: "d", answer: "delta"},
{letter: "e", answer: "echo"},
{letter: "f", answer: "foxtrot"},
{letter: "g", answer: "golf"},
{letter: "h", answer: "hotel"},
{letter: "i", answer: "india"},
{letter: "j", answer: "juliett"},
{letter: "k", answer: "kilo"},
{letter: "l", answer: "lima"},
{letter: "m", answer: "mike"},
{letter: "n", answer: "november"},
{letter: "o", answer: "oscar"},
{letter: "p", answer: "papa"},
{letter: "q", answer: "quebec"},
{letter: "r", answer: "romeo"},
{letter: "s", answer: "sierra"},
{letter: "t", answer: "tango"},
{letter: "u", answer: "uniform"},
{letter: "v", answer: "victor"},
{letter: "w", answer: "whiskey"},
{letter: "x", answer: "xRay"},
{letter: "y", answer: "yankee"},
{letter: "z", answer: "zulu"},
]

let currentTest: Test = getNextTest();

function getNextTest(){
	let nextTest;
	// TODO FIX
	// do {
	nextTest = tests[Math.floor(Math.random() * tests.length)];
	// } while(nextTest === currentTest)
	return nextTest;
}

function keyPress(evt: KeyboardEvent){
	if(evt.metaKey) return;

	if(evt.key === "Backspace") {
		if(evt.ctrlKey) {
			typed = typed.split(" ").slice(0, -1).join(" ");

		} else {
			typed = typed.slice(0, typed.length -1);
		}
	} else if(evt.key === "Enter"){
		if(typed.toLowerCase() == currentTest.answer.toLocaleLowerCase()){
			onCorrectGuess();
		} else {
			onIncorrectGuess();
		}
	} else if(evt.key.length == 1) {
		typed = typed + evt.key;
	}
}
 
let backgroundResetTimeout: any;
 
// let timeoutStopper?: ;

function onIncorrectGuess(){
	alert("Fel!");
	clearTyped();
}

function onCorrectGuess(){
	if(backgroundResetTimeout){
		clearTimeout(backgroundResetTimeout);
	}
	backgroundResetTimeout = setTimeout(() => {
		background = "normal";
	}, 200);
	background = "correct";

	currentTest = getNextTest();
	clearTyped();
}

function clearTyped(){
	typed = "";
}
</script>

<svelte:window on:keydown={keyPress}/>


<div class={background}>
	<p>Vad är namnet som är associerat till bokstaven?</p>


	<h1 >
		{currentTest.letter.toUpperCase()}
	</h1>

	<h1>{typed}</h1>
</div>

<style>
.incorrect {
	background-color: red;
}

.correct {
	background-color: green;
}
</style>
