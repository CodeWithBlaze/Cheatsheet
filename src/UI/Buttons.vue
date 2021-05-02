<template>
    <button class="btn" :style="{width:btnwidth,
    height:btnheight,
    fontSize:btnfontsize,
    borderRadius:btnradius}" 
    @click="clickEvent" type="button" :disabled="disable">{{label}}</button>
</template>
<script>
export default {
    props:['label','btnwidth','btnheight','btnfontsize','btnradius','OnClick','disable'],
    methods:{
       clickEvent(){
           
           this.OnClick();
       }
    }
}
</script>
<style scoped>
 .btn{
     background-image: linear-gradient(to right,#6C63FF,#0790F9);
     color:white;
     border:none;
     font-family: Righteous;
     cursor: pointer;
 }
 .btn:hover{
     transform:scale(1.2);
 }
 button:disabled{
     /* background-image: linear-gradient(to right,#28313b,#485461); */
     background-image: none;
     border: 1px solid #999999;
     background-color: #cccccc;
     color: #666666;
     cursor:no-drop;
 }
</style>