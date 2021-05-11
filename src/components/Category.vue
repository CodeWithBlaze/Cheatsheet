<template>
    <div class="catgeory-container">
        <div class="form-container">
        <label class="select-input">Choose input type</label><br>
        <select name="input_box" id="input_type" v-model="selectedInputType">
        <option value="text" selected>Text</option>
        <option value="description">Description</option>
        <option value="info">Info</option>
        <option value="code">Code</option>
        </select><br>
        <input v-if="selectedInputType==='text'" v-model="inputBoxQuery">
        <textarea v-else v-model="inputBoxQuery"></textarea><br>
        <buttons :label="isEditingActive?'Update':'Add'" 
        btnwidth="200px" 
        btnheight="40px" 
        :OnClick="isEditingActive?addEdited:add">
        </buttons>
       
        
    </div>
    <div class="output-container">
        <dynamic-container v-for="item in inputBoxArray" 
        :key="item.id" 
        :id="item.id"
        :type="item.type"
        @removeItemFromList="remove"
        @editItemFromList="edit"
        :description="item.description">
        </dynamic-container>
    </div>
    </div>
    <back-button @click="goBack"></back-button>
    
</template>
<script>
import DynamicContainer from '../UI/DynamicContainer.vue';
import Buttons from '../UI/Buttons.vue';
import getCodeColored from '../others/snippet.js';
import BackButton from '../UI/BackButton.vue';
export default {
    inject:['cheatFormData'],
    emits:['changeView'],
    
    data(){
        return {
            selectedInputType:'text',
            inputBoxArray:this.getList(),
            inputBoxQuery:'',
            codeLangauge:'',
            isEditingActive:false,
            editingId:null,
        }
    },
    components:{
        'dynamic-container':DynamicContainer,
        'buttons':Buttons,
        'back-button':BackButton,
    },
   methods:{
       getList(){
           const index = this.cheatFormData.activatedCategoryId;
           if(index===null || index === undefined)
                return [];
           return this.cheatFormData.categoryList[index].categoryDescription;
       },
       add(){
           this.inputBoxArray.push({
               id:this.inputBoxArray.length,
               description:this.selectedInputType === 'code' ? getCodeColored(this.inputBoxQuery) :  this.inputBoxQuery,
               type:this.selectedInputType
           })
           
       },
       addEdited(){
           this.inputBoxArray.splice(this.editingId,1,{
               id:this.editingId,
               description:this.selectedInputType === 'code' ? getCodeColored(this.inputBoxQuery,'javascript') :  this.inputBoxQuery,
               type:this.selectedInputType
           })
           this.isEditingActive=false;
           this.editingId=null;
       },
       remove(id){
           this.inputBoxArray.splice(id,1);
           this.updateIds(id);
       },
       edit(id){
           const item=this.inputBoxArray[id];
           this.selectedInputType = item.type;
           this.inputBoxQuery = this.selectedInputType == 'code'? 'code description cannot be shown':item.description;
           this.isEditingActive = true;
           this.editingId = id;
        },
        goBack(){
            this.$emit('changeView');
        },
        updateIds(id){
            
            for(let i=id;i<this.inputBoxArray.length;i++)
                this.inputBoxArray[i].id = i;
            
        }
        
   }
}
</script>
<style scoped>
textarea {
    width:100%;
    min-height:300px;
    height: fit-content;
    max-height: 700px;
    padding-left:15px;
    padding-top: 15px;
    font-family: Raleway;
}
.catgeory-container{
    display: flex;
    justify-content: space-around;
    height: 100%;
    background-color: #EEEEEE;
    
}
.form-container{
    width:30%;
    margin:30px;
    margin-left:60px;
    background-color: white;
    padding:25px;
    border-radius: 5px;
    
}
.output-container{
    width:70%;
    background-color: white;
    height:fit-content;
    margin:30px;
    margin-left: 15px;
    padding:15px;
    border-radius: 5px;
}
.select-input{
    font-family: Raleway;
    font-weight: 600;
    
}
select {
    width:100%;
    height: 40px;
    padding-left: 15px;
    font-family: Raleway;
    font-weight: 600;
    margin-bottom: 15px;
}
input{
    width:100%;
    height:40px;
    padding-left: 15px;
    font-family: Raleway;
    font-weight: 600;
    margin-bottom: 15px;
}
@media only screen and (max-width: 600px) {
    .catgeory-container{
        display: block;
        padding:15px;
    }
    .form-container{
        width:100%;
        margin:0px;
        padding:25px;
    }
    .output-container{
        width: 100%;
        margin:0px;
        padding:25px;
        margin-top:25px;
    }
    select {
        margin-top: 15px;
    }
}
</style>