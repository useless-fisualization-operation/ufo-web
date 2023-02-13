<script>
    import Map from './Map.svelte';
</script>

<main>
    <Map />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    :global(body) {
        background-color: rgb(106, 110, 113);
    }
</style>