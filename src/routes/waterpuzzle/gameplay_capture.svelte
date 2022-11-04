<script lang="ts">
import { onMount } from "svelte";
	import { claim_text } from 'svelte/internal';


let videoElement: HTMLVideoElement;
let canvasElement: HTMLCanvasElement;

async function startCalibration(){
	/* canvasElement.getContext("2d")?.ellipse(10, 10, 10, 10, 0, 2 * Math.PI, 0); */
	/* (canvasElement as any).getContext("2d").drawImage(videoElement, 200, 200); */
	canvasElement.width = videoElement.videoWidth;
	canvasElement.height = videoElement.videoHeight;
	canvasElement.hidden = false;
	videoElement.hidden = true;

	let ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
	ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
	console.log(canvasElement);

	ctx.beginPath();
	ctx.rect(10, 10, 20, 20);
	ctx.stroke();
}

async function enableScreenCapture(){
	videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia();
}

let pos =  {x: 0, y: 0};
function setPosition(evt: MouseEvent){
	console.log(evt.clientX + ", " + evt.clientY);
	pos.x = evt.x;
	pos.y = evt.y;
}

onMount(() => {
	let ctx: CanvasRenderingContext2D = canvasElement.getContext("2d") as any;
	ctx.fillStyle = "blue";
	ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
})


let firstPoint: undefined | {x: number, y: number};
function onCanvasClicked(evt: MouseEvent){
	let ctx: CanvasRenderingContext2D = canvasElement.getContext("2d") as any;

	ctx.lineWidth = 2;
	ctx.lineCap = "butt";
	// ctx.strokeStyle = "#c0392b";
	// let rect = canvasElement.getBoundingClientRect();

	// canvasElement.requestFullscreen();
	// canvasElement.clientHeight

	console.log(canvasElement.clientHeight, canvasElement.height);

	let coords = getPosition(evt, canvasElement);
	ctx.rect(coords.x * canvasElement.height / canvasElement.clientHeight, coords.y * canvasElement.height / canvasElement.clientHeight, 10, 10 );
	ctx.stroke();
	console.log(evt);
}

function getPosition(mouseEvent: PointerEvent |MouseEvent, canvasElem: HTMLCanvasElement) {
				var x, y;
				if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
					x = mouseEvent.pageX;
					y = mouseEvent.pageY;
				} else {
					x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}

				return { x: x - canvasElem.offsetLeft, y: y - canvasElem.offsetTop };
		}

function drawRect(evt: MouseEvent){
	if(evt.buttons !== 1) return;
	let ctx: CanvasRenderingContext2D = canvasElement.getContext("2d") as any;
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.lineCap = "butt";
	ctx.strokeStyle = "#c0392b";

	ctx.moveTo(pos.x, pos.y);
	setPosition(evt);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
}
</script>

<button on:click={enableScreenCapture}>Start screen capture</button>
<button on:click={startCalibration}>Start calibration</button>

<canvas hidden bind:this={canvasElement} on:click={onCanvasClicked}></canvas>
<!-- <canvas hidden on:mouseenter={setPosition} on:mousedown={setPosition} on:mousemove={drawRect} bind:this={canvasElement}></canvas> -->
<video autoplay bind:this={videoElement}></video>
