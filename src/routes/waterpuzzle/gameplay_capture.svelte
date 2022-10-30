<script lang="ts">
import { onMount } from "svelte";


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
}

async function enableScreenCapture(){
	videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia();
}

let pos =  {x: 0, y: 0};
function setPosition(evt: MouseEvent){
	pos.x = evt.clientX;
	pos.y = evt.clientY;
}

onMount(() => {
	let ctx: CanvasRenderingContext2D = canvasElement.getContext("2d") as any;
	ctx.fillStyle = "blue";
	ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
})

function drawRect(evt: MouseEvent){
	if(evt.buttons !== 1) return;
	console.log("Drawing!");

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

<canvas hidden on:mouseenter={setPosition} on:mousedown={setPosition} on:mousemove={drawRect} bind:this={canvasElement}></canvas>
<video autoplay bind:this={videoElement}></video>
