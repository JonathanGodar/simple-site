import type { liquid } from "./flask";


type flask = {
	liquids: liquid[];
	remaining_space: number;
	id: number;
	is_complete: boolean;
}

export function* solve(flaks: liquid[][]){
	const moves: number[][] = [];

	console.log("Solving!")
	const generator = solver_inner(flaks, moves);
	let prev: IteratorResult<undefined>;
	do {
		prev = generator.next();
		yield;
	} while(!prev.done);
	alert("done!");
}

export function* solver_inner(flasks: liquid[][], moves: number[][]){
	// Favourable moves:
	// Fills a flask
	// Leaves a flask without anything inside
	// puts a liquid in a 
	console.log(moves);
	if(is_solved(flasks)) alert("solved!");

	const possible_moves: number[][] = [];
	for(let from = 0; from < flasks.length; from++){
		if(flasks[from].length === 0 || flasks[from].length === 1 && flasks[from][0].ammount === 4) continue;
		for(let to = 0; to < flasks.length; to++) {
			if(from === to) continue;
			if(flasks[to].length === 0){
				possible_moves.push([from, to]);
				continue;
			} 

			const capacity = 4 - flasks[to].reduce((prev, next) => next.ammount + prev, 0);
			if(capacity == 0) continue;

			if(flasks[to][0].id === flasks[from][0].id){
				const move_amt = Math.min(capacity, flasks[from][0].ammount);
				possible_moves.push([from, to, move_amt]);
			}

		}
	}

	console.log(possible_moves);
	for(const next_move of possible_moves) {
		const [from, to, amt_to_move] = next_move;
		// const amt_to_move = Math.min(flasks[from][0].ammount, 4 - flasks[to].reduce((prev, flask) => flask.ammount + prev, 0));

		moves.push(next_move);
		move(flasks, from, to, amt_to_move);

		yield;
		// solver_inner(flasks, moves);
		const generator = solver_inner(flasks, moves);
		let prev: IteratorResult<undefined>;
		do {
			prev = generator.next();
			yield;
		} while(!prev.done);

		console.log("back tracking");
		alert("back tracking");

		move(flasks, to, from, amt_to_move);
		moves.pop();
		yield;
	}
}


/// Expects the move to be valid
export function move(flasks: liquid[][], from: number, to: number, ammount: number){
	if(flasks[to].length == 0){
		console.log("doing quick shift")
		flasks[to].push(flasks[from].shift() as any);
		return;
	}

	if(flasks[from][0].id == flasks[to][0].id) {
		flasks[to][0].ammount += ammount;
		flasks[from][0].ammount -= ammount;
	} else {
		flasks[to].unshift({
			ammount,
			id: flasks[from][0].id,
		})
		flasks[from][0].ammount -= ammount;
	}

	if(flasks[to][0].ammount === 0) flasks[to].shift();
	if(flasks[from][0].ammount === 0) flasks[from].shift();
}


// export function solve(flasks: liquid[][]){
// 	const moves: number[][] = [];

// 	let remapped: flask[] = flasks.map((liquids, id) => {
// 		return {
// 			liquids,
// 			remaining_space: 4 - liquids.reduce((prev, flask) => prev + flask.ammount, 0),
// 			is_complete: liquids.length === 1 && liquids[0].ammount === 4,
// 			id,
// 		}
// 	});
// 	solve_inner(remapped, moves, 0);
// }


export function is_solved(flasks: liquid[][]){
	return flasks.every((flask) =>  flask.length === 0 || flask.length === 1 && flask[0].ammount === 4);
}


// function solve_inner(flasks: flask[], moves: number[][], depth: number){
// 	if(depth > 15) {
// 		return;
// 	};

// 	if(flasks.every((flask) => flask.is_complete || flask.remaining_space === 4)) {
// 		alert("eureka");
// 	}
// 	console.log("hello");

// 	let possible_moves = [];
// 	for(let from = 0; from < flasks.length; from++){
// 		if(flasks[from].liquids.length === 0 || flasks[from].is_complete) continue;

// 		for(let to = 0; to < flasks.length; to++){
// 			if(to == from || flasks[to].is_complete) continue;

// 			// Flask is empty, the move is possible no matter what
// 			if(flasks[to].remaining_space === 4) {
// 			possible_moves.push([flasks[from].id, flasks[to].id])
// 			continue;
// 		};

// 		if(flasks[to].liquids[0].id !== flasks[from].liquids[0].id) continue;
// 		if(flasks[to].remaining_space === 0) continue;
// 		possible_moves.push([from, to])
// 	}
// }

// for(let move of possible_moves){
// 	const from = move[0];
// 	const to = move[1];
// 	let filled_flask = undefined;

// 	moves.push([flasks[from].id, flasks[to].id]);

// 	const to_move = Math.min(flasks[to].remaining_space, flasks[from].liquids[0].ammount);

// 	// Add to the "to" flask
// 	if(flasks[to].remaining_space === 4){
// 		flasks[to].liquids.push({
// 			ammount: to_move,
// 			id: flasks[from].liquids[0].id
// 		})
// 	} else {
// 		flasks[to].liquids[0].ammount += to_move;
// 	}
// 	// Remove from "from" flask
// 	flasks[from].liquids[0].ammount -= to_move;

// 	if(flasks[to].liquids.length === 1 && flasks[to].remaining_space === 0){
// 		flasks[to].is_complete = true;
// 		filled_flask = to;
// 	}


// 	flasks[from].remaining_space += to_move;
// 	flasks[to].remaining_space -= to_move;
// 	// console.log(move);
// 	// console.log(flasks);
// 	solve_inner(flasks, moves, depth + 1);

// 		if(filled_flask){
// 			flasks[to].is_complete = false;
// 		}
// 		moves.pop();
// 	}
// }

