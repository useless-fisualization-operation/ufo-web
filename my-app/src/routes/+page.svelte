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

    :global(body, html) {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: rgb(124, 128, 132);
        font-size: 1.2vh;
        font-family: Helvetica, sans-serif;
        color:rgb(30, 30, 30);
        overflow: hidden;
    }
</style>