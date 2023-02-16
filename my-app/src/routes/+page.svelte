<script>
    import Map from '../components/Map.svelte';
</script>

<main>
    <Map />
</main>

<style>
    main {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    :global(body) {
        height: 100%;
        width: 100%;
        background-color: rgb(106, 110, 113);
        font-size: 12px;
        font-family: Helvetica, sans-serif;
        color:rgb(30, 30, 30);
    }
</style>