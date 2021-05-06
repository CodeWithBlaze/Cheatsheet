<template>
    <button class="go-back-button" @click="goBack">
            <i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i>
    </button>
</template>

<style scoped>
.go-back-button{
    position: absolute;
    top:50%;
    left:5px;
    width:40px;
    height:40px;
    border-radius: 50%;
    border:none;
    background-color: #3A79FC;
    color:white;
    box-shadow:5px 5px 10px grey;
}
@media only screen and (max-width: 600px) {
    .go-back-button{
        left:85%;
        top:15px;
    }
}
</style>