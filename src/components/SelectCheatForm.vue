<template>
    <notification  v-if="isError"  :type="error_type" 
    :text="error_msg" @close="close"></notification>
    <div class="select-form">
       <label>Choose a {{label}}</label>
       <select name="cheats" id="cheat-selector" @change="choiceChanged()" v-model="selectedOptions">
           <option value="">--Please choose an option--</option>
           <option v-for="option of options" :key="option.id" :value="option">{{option.label}}</option>
       </select>
       <buttons label="Delete This Cheat" btnwidth="100%" btnheight="40px" class="btn" :disable="disableDelete" :OnClick="onDelete"></buttons>
       <buttons label="Create New" btnwidth="100%" btnheight="40px" :disable="disableCreate" :OnClick="onCreate"></buttons>
       <buttons label="Submit" 
       btnwidth="100%" 
       btnheight="40px" 
       :disable="disableSubmit"
       :OnClick="checkCategory"
       ></buttons>
       <label>Tags</label>
       <div class="tag-preview">{{tags}}</div>
       <input class="tag-input" v-model="tag_text" placeholder="Enter Tag To Add or Delete">
       <buttons btnwidth="30%" btnheight="40px" label="Add Tag" :OnClick="addTag"></buttons>
       <buttons v-if="cheatFormData.cheatData.title!=''" btnwidth="30%" btnheight="40px" label="Auto Tag" 
       style="margin-left:5px" :OnClick="autoTag"></buttons>
       <buttons v-if="tags.length!=0" btnwidth="30%" btnheight="40px" label="Delete" 
       style="margin-left:5px" :OnClick="deleteTag"></buttons>
    </div>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import {firestore} from '../database/firebase.js';
import NotificationLayout from '../notifications/NotificationLayout.vue';
export default {
    props:["label","options","disableDelete","disableCreate","disableSubmit","onCreate"],
    inject:['cheatFormData'],
    emits:['getDataLength'],
    components:{
        'buttons':Buttons,
        'notification':NotificationLayout
    },
    data(){
        return{
            isError:false,
            error_type:"",
            selectedOptions:"",
            tags:this.cheatFormData.cheatData.tagList,
            tag_text:"",
            categoryId:null,
            error_msg:""
        }
    },
    methods:{
        setValuesForData(title,image,description,selectedCheat,tagList){
                const value=this.cheatFormData.cheatData;
                value.title = title;
                value.image = image;
                value.description = description;
                value.tagList = tagList;
                this.tags = value.tagList;
                this.cheatFormData.imageSrc = image===""?null:image;
                this.cheatFormData.selectedCheat=selectedCheat;
        },
        setCategoryList(id){
           
            firestore.collection('Category').where('cheat_id','==',id).get().then(data=>{
                data.docs.forEach(data=>{
                    this.categoryId = data.id;
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
            if(selected===""){
                this.setValuesForData("","","","",[]);
                this.cheatFormData.categoryList=[];
                return;
           }
            this.setValuesForData(selected.label,selected.image,selected.description,selected.label,selected.tagList);
            this.setCategoryList(selected.id);
        },
        checkCategory(){
            const verified = this.cheatFormData.categoryList.every(function(item){
                return item.categoryName !="";
            }) 
            if(verified)
                this.onSubmit();
            else{
                this.isError = true;
                this.error_type = 'warning';
                this.error_msg = 'Category Name is empty or Category is not locked';
            }  
        },
        onSubmit(){
         
             if(this.selectedOptions!=""){
                firestore.collection('Cheats').doc(this.selectedOptions.id).update(
                   this.cheatFormData.cheatData
               ).then(()=>{
                   firestore.collection('Category').doc(this.categoryId).update({
                   catgeory_list:this.cheatFormData.categoryList
                }).then(()=>{
                    this.isError = true;
                    this.error_type = 'success';
                    this.error_msg = 'Submitted Successfully';
                }).catch(()=>{
                    this.isError = true;
                    this.error_type = 'error';
                    this.error_msg = 'Submission Failed';
                })
               })
               
               return;
           }
            const firestore_id = firestore.collection('Cheats').doc();
            firestore_id.set(this.cheatFormData.cheatData);
            firestore.collection('Category').add({
                cheat_id:firestore_id.id,
                catgeory_list:this.cheatFormData.categoryList
            }).then(()=>{
                this.isError=true;
                this.error_type='success';
                this.error_msg ='submitted successfully';
            }).catch(()=>{
                this.isError=true;
                this.error_type='error';
                this.error_msg =  'submission failed';
            })
        },
        onDelete(){
            const selectedId = this.selectedOptions.id;
            firestore.collection('Category').where('cheat_id','==',selectedId).get()
            .then(data=>{
                data.docs.forEach(data=>{
                    firestore.collection('Category').doc(data.id).delete().then(()=>{
                        
                        firestore.collection('Cheats').doc(selectedId).delete().then(()=>{
                            this.isError=true;
                            this.error_type ='success'
                        }).catch(()=>{
                            this.isError=true;
                            this.error_type='error';
                        })
                    })
                })
                
                
            })
        },
        addTag(){
            if(!this.alreadyPresent(this.tag_text) && this.tag_text!="")
                this.tags.push(this.tag_text.toLowerCase());
            else
                alert("Tag is either blank or contains space or duplicated. Tag must be of single word");
           
        },
        autoTag(){
            const words = this.cheatFormData.cheatData.title.split(' ');
            for(const item in words)
                this.tags.push(words[item].toLowerCase());
            
        },
        deleteTag(){
            this.tags = this.tags.filter(tag=>tag!=this.tag_text.toLowerCase())
            this.cheatFormData.cheatData.tagList=this.tags;
            
        },
        alreadyPresent(text){
            for(const item in this.tags)
                if(this.tags[item]==text)
                    return true;
            
            return false;    
        },
        close(){
            this.isError=false;
            this.error_type=null;
        }

    }
}
</script>
<style scoped>
.select-form{
    padding:15px;
    padding-bottom: 5px;
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
.tag-preview{
    width:100%;
    height:150px;
    background-color:#EEEEEE;
    font-family: Raleway;
    font-size: 13px;
    padding:15px;
    font-weight: 600;
}
.tag-input{
    width:100%;
    height:40px;
    margin-top: 5px;
    color:#0790F9;
    padding-left: 15px;
    font-family: Raleway;
    font-weight: 500;
}
</style>