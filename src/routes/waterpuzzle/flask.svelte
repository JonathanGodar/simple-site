<script lang="ts">
import { flask_volume, liquid_colors, type liquid } from "./flask";

export let contents: liquid[];
// export let id: number;

$: air_size = flask_volume - contents.map((v) => v.ammount).reduce((p, v) => p + v);
$: () => {
	console.log(air_size);
}
</script>

<div class="flask" on:click>
	{#each contents as liquid }
		<div class="liquid" style={`flex-grow: ${liquid.ammount}; background-color: ${liquid_colors[liquid.id]}`}></div>
	{/each}
	<div style={`flex-grow: ${air_size}; background-color: rgba(0, 0, 0, 0);`}></div>
</div>

<style>
.flask {
	display: flex;
	flex-direction: column-reverse;
	border-left: 2px solid black;
	border-right: 2px solid black;
	border-bottom: 2px solid black;
	min-width: 20px;
	margin: 0.7em 0.5rem;
}
</style>


