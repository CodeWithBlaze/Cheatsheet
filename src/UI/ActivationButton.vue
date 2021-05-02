<template>
    <button class="btn" :style="{width:btnwidth,height:btnheight,fontSize:btnfontsize,borderRadius:btnradius,backgroundColor:color}" 
     @click="clickEvent">{{label}}</button>
</template>
<script>
export default {
    props:['label','btnwidth','btnheight','btnfontsize','btnradius','OnActive','OnNotActive','idx'],
    data(){
        return {
            isOn:false,
            color:'red',
            
        }
    },
    methods:{
       clickEvent(){
           this.isOn=!this.isOn;
           this.color=this.isOn?'#0790F9':'red';
           if(this.isOn)
                this.OnActive(this.idx);
           else
                this.OnNotActive(this.idx);
       }
    }
}
</script>
<style scoped>
 .btn{
     color:white;
     border:black 1px solid;
     font-family: Righteous;
     cursor: pointer;
     margin-bottom: 7px;
     
 }
 
</style>