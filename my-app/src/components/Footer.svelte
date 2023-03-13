<script lang="ts">
	import type { SharedState } from './shared';

	let clazz = '';
	export { clazz as class };
</script>

<div class="footer {clazz}">
	<!--Something here?-->
</div>

<style lang="scss">
	.footer {
		height: 20px;
		color: white;
	}
</style>
