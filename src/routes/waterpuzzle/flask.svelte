<script lang="ts">
import { flask_volume, liquid_colors, type liquid } from "./flask";

export let contents: liquid[];
export let isSelected: boolean;

$: air_size = flask_volume - contents.map((v) => v.ammount).reduce((p, v) => p + v, 0);
$: () => {
	console.log(air_size);
}
</script>

<div class:selected={isSelected} class="flask" on:click>
	<div style={`flex-grow: ${air_size}; background-color: rgba(0, 0, 0, 0);`}></div>
	{#each contents as liquid }
		<div class="liquid" style={`flex-grow: ${liquid.ammount}; background-color: ${liquid_colors[liquid.id]}`}></div>
	{/each}
</div>

<style>
.flask {
	display: flex;
	flex-direction: column;
	border-left: 2px solid black;
	border-right: 2px solid black;
	border-bottom: 2px solid black;
	min-width: 20px;
	margin: 0.7em 0.5rem;
}

.liquid {
	border-top: 2px dotted black;

}

.selected {
	transform: translateY(-20px);
	filter: drop-shadow(0px 10px 4px #4444dd);
}
</style>


