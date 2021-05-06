<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>
.container{
    width:30%;
    min-height:80vh;
    height: fit-content;
    background-color: white;
    border-radius:5px;
    margin:5px;
}
@media only screen and (max-width: 600px) {
    .container{
        width:100%;
        margin-left: 0px;
        min-height: fit-content;
        height: fit-content;
        margin-bottom: 30px;
    }
}
</style>