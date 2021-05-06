<template>
    <div class="form2-container">
    <img :src="cheatFormData.imageSrc" class="imagebox">
    <input placeholder="Title" 
           v-model="cheatFormData.cheatData.title" 
           :class="isEmpty1" @blur="verifyInput('title')">
    <textarea placeholder="Description" 
              v-model="cheatFormData.cheatData.description"
              :class="isEmptyDescription" @blur="verifyInput('description')">
    </textarea>
    <input placeholder="Image" 
           v-model="cheatFormData.cheatData.image"
           :class="isEmpty2" @blur="verifyInput('image')">
    <buttons label="Update" btnwidth="100%" btnheight="40px" :disable="disable" :OnClick="updateImage"></buttons>
    </div>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import {checkEmpty} from '../others/verification.js';
export default {
    props:['disable'],
    inject:['cheatFormData'],
    components:{
        'buttons':Buttons,
    },
    data(){
        return{
            isEmpty1:"",
            isEmpty2:"",
            isEmptyDescription:""
        }

    },
    methods:{
       updateImage(){
           this.cheatFormData.imageSrc = this.cheatFormData.cheatData.image;
       },
       setValue(value,className){
            if(value==='title')
                this.isEmpty1 = className;
            else if(value==='image')
                this.isEmpty2 = className;
            else
                this.isEmptyDescription = className;
       },
       verifyInput(value){
           if(checkEmpty(this.cheatFormData.cheatData[value]))
               this.setValue(value,'required')
           else
                this.setValue(value,"");
                
            
        }
    }
}
</script>
<style scoped>
.form2-container{
    padding:15px;
}
.imagebox{
    width:100%;
    height:180px;
}
input{
    width:100%;
    height:40px;
    border:2px solid  #0790F9;
    margin-bottom: 5px;
    padding-left: 15px;
    font-family:Raleway;
    font-weight: 500;
    border-radius: 5px;
}
textarea{
    width: 100%;
    height:180px;
    font-family:Raleway;
    font-weight: 500;
    padding-left: 15px;
    padding-top: 15px;
    border-radius: 5px;
}
.required{
    border:3px solid red;
    
}
</style>