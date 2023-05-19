<template>
    <header class="header">
        <div class="container">
            <LocationMain />
        </div>
    </header>
</template>

<style scoped>
    .header {
        padding: 25px 20px;
        background-color: var(--bg-secondary);
        box-shadow: var(--shadow-primary);
    }
</style>

<script>
    import LocationMain from '@components/LocationMain.vue';

    export default {
        name: 'LayoutHeader',
        components: {
            LocationMain,
        }
    }
</script>