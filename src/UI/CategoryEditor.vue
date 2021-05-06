<template>
    
    <div class="category-editor-container">
        
        <div :class="['heading-box',isLocked?'locked':'not-locked']" @click="toggleEditor">
            <h3 class="editor-heading">{{name}}</h3>
        </div>
       
        <keep-alive>
        <editor-option v-if="iseditorActive" @changeHeading="changeName" image_one="fa fa-trash" image_two="fa fa-pencil" 
        image_three="fa fa-lock" :idx="idx" @changeLock="toggleLock" :data_length="data_length">
        </editor-option>
        </keep-alive>
    </div>

</template>
<script>
import EditorOptions from './EditorOptions.vue';

export default {
    props:['idx','cat_name','data_length'],
    components:{
        'editor-option':EditorOptions,
    },
    data(){
        return{
            name:this.cat_name==""?"Category Editor":this.cat_name,
            iseditorActive:false,
            isLocked:this.idx <this.data_length?true:false,
        }
    },
   
    methods:{
        changeName(name){
            this.name=name;
            if(this.name==="" && this.cat_name!="")
                this.name=this.cat_name;
            else if(this.name==="")
                this.name = "Category";
        },
        toggleEditor(){
            this.iseditorActive=!this.iseditorActive;
        },
        toggleLock(){
            this.isLocked=!this.isLocked;
        }
    }
}
</script>
<style scoped>
.category-editor-container{
   padding-top: 20px;
   padding-left: 20px;
   padding-right: 20px;
   
}
.heading-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 60px;
    cursor: pointer;
    font-family:Raleway;
    color:white;
    border: 2px solid black;
}
.locked{
    background-color: #00cc00;
}
.not-locked{
    background-color: #DD0004;
}
</style>