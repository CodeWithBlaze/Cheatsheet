<template>
    <div class="select-form">
       <label>Choose a {{label}}</label>
       <select name="cheats" id="cheat-selector" @change="choiceChanged()" v-model="selectedOptions">
           <option value="">--Please choose an option--</option>
           <option v-for="option of options" :key="option.id" :value="option">{{option.label}}</option>
       </select>
       <buttons label="Delete This Cheat" btnwidth="100%" btnheight="40px" class="btn" :disable="disableDelete"></buttons>
       <buttons label="Create New" btnwidth="100%" btnheight="40px" :disable="disableCreate" :OnClick="onCreate"></buttons>
       <buttons label="Submit" 
       btnwidth="100%" 
       btnheight="40px" 
       :disable="disableSubmit"
       :OnClick="onSubmit"
       ></buttons>
    </div>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import {firestore} from '../database/firebase.js';
export default {
    props:["label","options","disableDelete","disableCreate","disableSubmit","onCreate"],
    inject:['cheatFormData'],
    components:{
        'buttons':Buttons
    },
    data(){
        return{
            selectedOptions:"",
        }
    },
    methods:{
        setValuesForData(title,image,description,selectedCheat){
                const value=this.cheatFormData.cheatData;
                value.title = title;
                value.image = image;
                value.description = description;
                this.cheatFormData.imageSrc = image===""?null:image;
                this.cheatFormData.selectedCheat=selectedCheat;
        },
        setCategoryList(id){
            //let categoryProps={};
            firestore.collection('Category').where('cheat_id','==',id).get().then(data=>{
                data.docs.forEach(data=>{
                    const catgeories = data.data().catgeory_list;
                    this.dataListLength(catgeories.length);
                    this.cheatFormData.categoryList = catgeories;    
                })
            })
            
        },
        dataListLength(length){
            this.$emit('getDataLength',length);
        },
       choiceChanged(){
           const selected = this.selectedOptions;
           if(selected.label===""){
                this.setValuesForData("","","",null);
                this.cheatFormData.categoryList=[];
                return;
           }
            this.setValuesForData(selected.label,selected.image,selected.description,selected.label);
            this.setCategoryList(selected.id);
        },
        onSubmit(){
            const firestore_id = firestore.collection('Cheats').doc();
            firestore_id.set(this.cheatFormData.cheatData);
            firestore.collection('Category').add({
                cheat_id:firestore_id.id,
                catgeory_list:this.cheatFormData.categoryList
            }).then(()=>{
                console.log("Successful")
            }).catch(()=>{
                console.log("unsuccessful");
            })
        }
    }
}
</script>
<style scoped>
.select-form{
    padding:15px;
   
    
}
.btn{
    position:relative;
    margin-top: 5px;
    margin-bottom:5px;
}
label{
    font-family: Raleway;
    margin-right:8px;
    font-weight: 500;
}
select{
    width: 100%;
    height: 40px;
    font-family: Raleway;
     font-weight: 500;
     border:2px solid black;
     padding-left: 15px;
}
</style>