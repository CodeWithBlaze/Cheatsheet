<template>
    <div class="card">
        <img :src="item.image" class="card-image">
        <div class="card-text">
            <h2>{{item.label}}</h2>
            <p class="card-description">
               {{item.description.substring(0,101)+" ..."}}
            </p>
            <p class="author">created by {{item.author}}</p>
        </div>
    </div>    
</template>
<script>
export default {
    props:['item']
}
</script>
<style scoped>
.card{
    cursor: pointer;
    font-family: Raleway;
    width:350px;
    height:fit-content;
    box-shadow:rgba(189, 195, 199,1) 0px 0px 15px;
    margin-right: 60px;
    margin-bottom: 30px;
    
}
p{
    margin-top:15px;
}
.card-image{
    width:350px;
    height:200px;
    object-fit:cover;
    overflow:hidden;
    
}
.card-text{
    padding:10px;
    width:100%;
    height:160px;
    text-align: center;
    background-color: white;
    
}
.card-description{
    overflow: hidden;
    height:auto;
    text-overflow: ellipsis;
    padding-left:5px;
    padding-right: 5px;
    color:#6F6B6B;
    font-size: 15px;
    font-weight: 500;
}
.author{
    font-weight: 400;
    font-size: 13px;
    color:#A9A9A9;
}
@media only screen and (max-width: 600px) {
 .card{
     margin:0px;
     margin-bottom:35px;
     padding:0px;
     overflow:hidden;
 }
 .card-image{
     width:100%;
     height:auto;
 }
}
</style>