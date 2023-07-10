<template>
    <div id="m-loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
</template>

<style scoped>
#m-loading {
    background: rgba(155, 143, 143, 0.8);
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>