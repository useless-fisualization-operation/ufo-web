<script lang="ts">
	import type { SharedState } from './shared';
	let clazz = '';
	export { clazz as class };
</script>

<div class="header {clazz}">header</div>

<style lang="scss">
	.header {
		background-color: var(--surface-1);
		height: 20px;
	}
</style>
