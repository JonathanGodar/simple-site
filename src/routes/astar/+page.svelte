<script lang="ts">
import { PriorityQueue } from "$lib/priority_queue";

let animation_speed: number = 5;

type Cell = {
	cost: number,
	queue_pos?: number;
	is_target: boolean;
	is_done: boolean;
	best_path_through?: number[];
	pos: number[];
	is_part_of_path: boolean;
	is_blocked: boolean;
	unfavourability: number,
};

let board: Cell[][] = []

let le_func: any = (cellA: any, cellB :any) => cellA.cost + cellA.unfavourability < cellB.cost + cellB.unfavourability;
let queue: PriorityQueue<Cell> = new PriorityQueue(le_func);

let target = [8,8];
let start = [0,0];

const board_size = 9;

function init_board(){
	for (let y = 0; y < board_size; y++) {
		board[y] = [];
		for (let x = 0; x < board_size; x++) {
			board[y][x] = {
					cost: Infinity,
					is_part_of_path: false,
					pos: [y,x],
					is_done: false,
					is_target: false,
					is_blocked: false,
					unfavourability: Infinity,
			}
		}
	}

	board[target[0]][target[1]].is_target = true;
	board[start[0]][start[1]].cost = 0;
	queue.enqueue(board[start[0]][start[1]]);

	/* let aqueue = new PriorityQueue<number>((a,b) => a < b); */
	/* /1* aqueue.enqueue(2); *1/ */
	/* /1* aqueue.enqueue(2); *1/ */
	/* console.log(aqueue); */
}

function toggle_blocked(cell: Cell){
	cell.is_blocked = !cell.is_blocked;
	board = board;
}

function reset_algorithm(){
	clearTimeout(animation_timeout);

	for(let row of board) {
		for(let cell of row) {
			cell.unfavourability = Infinity;
			cell.cost = Infinity;
			cell.best_path_through = undefined;
			cell.is_part_of_path = false;
			cell.is_done = false;
		}
	}
	board[start[0]][start[1]].cost = 0;

	queue = new PriorityQueue(le_func);
	queue.enqueue(board[start[0]][start[1]]);


	target_found = false;

	board = board;
}

function on_path_found(target: Cell){
	target_found = true;
	let prev = target;
	while(true){
		if(prev.pos[0] == start[0] && prev.pos[1] == start[1]) {
			break;
		}
		prev.is_part_of_path = true;
		console.log(prev.best_path_through);
		// @ts-ignore
		prev = board[prev.best_path_through[0]][prev.best_path_through[1]];
	}
	board = board;
}

let target_found = false;
let animation_timeout: undefined | NodeJS.Timeout = undefined;

function process_animated(){
	if(animation_timeout != undefined) return;

	let step = () => {
			if(!target_found) {
				process()
				animation_timeout = setTimeout(step, 1000/animation_speed);
			} else {
				animation_timeout = undefined;
			}
	}

	step();
}

function process() {
		clearTimeout(animation_timeout);
		let curr;
		do {
			curr = queue.dequeue();
			if(curr == undefined)
				return;
		} while(curr.is_blocked);

		if(curr.is_target) {
			on_path_found(curr);
			return;
		}


		let neighbors = get_neighbors(curr);

		for(let neighbor of neighbors) {
			if(!neighbor.is_done && neighbor.cost > curr.cost + 1){
				neighbor.cost = curr.cost + 1;
				neighbor.best_path_through = curr.pos; 
				if(neighbor.unfavourability === Infinity){
					neighbor.unfavourability = Math.sqrt(Math.pow(neighbor.pos[0] - target[0], 2) + Math.pow(neighbor.pos[1] - target[1], 2));
				}

				queue.enqueue(neighbor);
			}
		}

		curr.is_done = true;
		board = board;
}

function get_neighbors(origin: Cell): Cell[] {
	const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [1, -1], [0, -1]];
	let build = [];
	for(let dir of dirs) {
		let coord = [origin.pos[0] + dir[0], origin.pos[1] + dir[1]];
		if(Math.min(...coord) < 0 || Math.max(...coord) >= board_size) continue; 
		build.push(board[coord[0]][coord[1]]);
	}
	return build;
}

init_board();
</script>

<div class="board">
	{#each board as row, y }
		{#each row as cell, x}
			<div class="cell" 
			class:target={target[0] == y && target[1] == x}
			class:start={start[0] == y && start[1] == x}
			class:is_done={cell.is_done}
			class:part_of_path={cell.is_part_of_path}
			class:is_blocked={cell.is_blocked}
			on:click={() => toggle_blocked(cell)}
			><p>{x}, {y}<br>{cell.cost}</p></div>
		{/each}
	{/each}
</div>

<button on:click={process_animated}>Press to process</button>
<button on:click={process}>Press to step</button>
<button on:click={reset_algorithm}>Press to reset</button>


<label for="animationspeed">Animation speed</label>
<input name="animationspeed" type="range" min="1" max="10" bind:value={animation_speed}>


<p>{queue}</p>

<style>
.board {
	/* background-color: red; */
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	justify-items: center;
	gap: 10px 10px;
	min-width: 450px;
	aspect-ratio: 1/1;
}

.part_of_path {
	border: 2px dotted orange;
	color: red;
	opacity: 100%;
}

.cell {
	flex: 1 0 9%;
	background-color: orange;
	display: flex;
	justify-content: center;
	justify-items: center;
}

.target {
	background-color: green;
}

.start {
	background-color: white
}

.is_blocked {
	background-color: black;
}

.is_done {
		opacity: 50%;
}

</style>
