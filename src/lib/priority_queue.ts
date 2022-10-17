export class PriorityQueue<T> {
	private queue: T[] = [];
	constructor(private le_func: (a: T, b: T) => boolean){}
	enqueue(obj: T){
		if(this.is_empty()){
			this.queue.push(obj);
			return;
		}

		for(let i = 0; i < this.queue.length; i++) {
			if(!this.le_func(this.queue[i], obj)){
				this.queue.splice(i, 0, obj);
				return;
			}
		}

		this.queue.push(obj);



		// // inclusive
		// let lower = 0;
		// // Exclusive
		// let upper = this.queue.length;

		// while(upper > lower + 1) {
		// 	let middle = Math.floor((upper - lower) / 2) + lower;
		// 	let le = this.le_func(obj, this.queue[middle]);

		// 	if(le) {
		// 		upper = middle;
		// 	} else {
		// 		lower = middle + 1;
		// 	}
		// }

		// let middle = Math.floor((upper - lower)/2 + lower);
		// let idx;
		// if(middle == this.queue.length) {
		// 	idx = middle - 1;
		// } else {
		// 	idx = middle + (this.le_func(obj, this.queue[middle]) ? 0 : 1);
		// }
		// // console.log(`middle: ${middle}, len: ${this.queue.length}`);
		// // let idx;
		// // if(middle = this.queue.length) {
		// // 	idx = middle - 1;
		// // } else {
		// // 	idx = middle + (this.le_func(this.queue[middle], obj) ? 1 : 0);
		// // }

	}

	dequeue(): T | undefined {
		return this.queue.shift();
	}

	is_empty(): boolean {
		return this.queue.length == 0;
	}
}
