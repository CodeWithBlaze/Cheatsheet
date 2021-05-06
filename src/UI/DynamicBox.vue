<template>
    <div :class="['inputBox',type]">
            <label v-if="type === 'text'">{{description}}</label>
            <pre v-else-if="type==='code'" >
                <p v-html="description"></p>
            </pre>
            <div v-else>{{description}}</div>
    </div>
</template>
<script>
export default {
    props:['description','type']
}
</script>
<style scoped>
.inputBox {
    width:100%;
    height:fit-content;
    min-height: 30px;
    color:white;
    word-wrap: break-word;
    overflow-wrap: break-word;
    cursor: pointer;
    overflow:auto;
}
.text{
    color: black;
}
.description {
    min-height:40px;
    color: black;
    font-family: Raleway;
    font-weight: 500;
    margin-top: 10px;
}
.code {
    background-color:  #282C35;
    padding:15px;
    margin-top: 5px;
}
label{
    font-size: 20px;
    font-family: Raleway;
    font-weight: 600;
    
}
pre {
   white-space:pre;
}
@media only screen and (max-width: 600px) {
    .description{
        font-size: 15px;
        line-height: 21px;
    }
}
</style>