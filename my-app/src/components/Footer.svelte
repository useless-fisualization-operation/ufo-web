<script lang="ts">
	import type { SharedState } from './shared';

	let clazz = '';
	export { clazz as class };
</script>

<div class="footer {clazz}">footer</div>

<style lang="scss">
	.footer {
		background-color: var(--surface-1);
		height: 20px;
	}
</style>
