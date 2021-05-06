<template>
     <div class="form-container">
         <div class="form">
             <slot></slot>
        </div>
     </div>
</template>
<style scoped>
.form-container{
    width:100%;
    min-height:100%;
    height:fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
}
.form{
    text-align: center;
    width:25%;
    padding:25px;
    padding-top: 30px;
    background-color: white;
    font-family: Raleway;
    box-shadow:#B8B8B8 0px 0px 20px;
    border-radius: 8px;
}
@media only screen and (max-width: 600px) {
    .form-container{
        padding:15px;
    }
    .form{
        width: 100%;
    }
}
</style>