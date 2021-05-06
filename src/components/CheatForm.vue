<template>
   
   <category @changeView="ChangeActiveView" v-if="change"></category>
   <div :class="[change?'do-not-show':'cheat-form-container']">
        
            <form-container>
                <category-editor v-for="item in cheatFormData.categoryList" 
                :key="item.id" 
                :idx="item.id" 
                :cat_name="item.categoryName"
                :data_length="dataLength"
                >
                </category-editor>
                <div class="button-container">
                     <buttons 
                     :OnClick="newCategory" 
                     label="Create New Category" 
                     btnwidth="100%" 
                     btnheight="40px" 
                     :disable="checkDisableCondition('category')">
                     </buttons>
                </div>
                
             </form-container>
        
        
            <form-container>
                <cheat-layout 
                :disable="checkDisableCondition('update')">
                </cheat-layout>
            </form-container>
        
       
            <form-container>
                <select-cheat-form 
                label="cheat" 
                :options="cheats" 
                :disableDelete="checkDisableCondition('Delete')"
                :disableCreate="checkDisableCondition('Create')"
                :disableSubmit="checkDisableCondition('Submit')"
                :onCreate="createNewButton"
                @getDataLength="setDataLength"
                >
                </select-cheat-form>
                <div class="button-container-logout">
                    <buttons
                    btnwidth="100%" 
                    btnheight="40px" 
                    label="Logout" 
                    :OnClick="onLogout">
                    </buttons>
                </div>
                
            </form-container>
        </div>
        
   
   
</template>
<script>
import FormContainer from '../UI/FormContainer.vue';
import CategoryEditor from '../UI/CategoryEditor.vue';
import CheatLayout from './CheatLayout.vue';
import SelectCheatForm from './SelectCheatForm.vue';
import Buttons from '../UI/Buttons.vue';
import {firestore} from '../database/firebase.js';
import Category from './Category.vue';

export default {
    emits:['onLogout'],
    inject:['author'],
    mounted(){
        firestore.collection('Cheats').where('creator_uid','==',this.author.id).get().then(data=>{
            data.docs.forEach(data=>{
            const cheat_obj=data.data();
            this.cheats.push({
                        id:data.id,
                        image:cheat_obj.image,
                        label:cheat_obj.title,
                        description:cheat_obj.description,
                        author:cheat_obj.author,
                        tagList:cheat_obj.tagList
                })
            })
        })
        
        
    },
    
    components:{
        'form-container':FormContainer,
        'category-editor':CategoryEditor,
        'cheat-layout':CheatLayout,
        'select-cheat-form':SelectCheatForm,
        'buttons':Buttons,
        'category':Category,
        
    },
    provide(){
        return {
            'cheatFormData':this.cheatFormData,
            'revertView':this.RevertCategoryView
        }
        
    },
    data(){
        return{
           
            change:false,
            dataLength:0,
            cheatFormData:{
                //category data
                categoryList:[],
                activatedCategoryId:null,
                //cheat data
                selectedCheatId:null,
                selectedCheat:null,
                imageSrc:null,
                cheatData:{
                    title:"",
                    description:"",
                    image:"",
                    author:this.author.name,
                    creator_uid:this.author.id,
                    tagList:[],
                }
            },
            
            cheats:[],
            createNew:false,
        }
    },
    
    methods:{
        newCategory(){
            this.cheatFormData.categoryList.push({
                id:this.cheatFormData.categoryList.length,
                categoryName:"",
                categoryDescription:[]
            })
            
        },
        checkDisableCondition(btnName){
            const choice = this.cheatFormData.selectedCheat!==null;
            if(btnName==='category' || btnName === 'update')
                return (choice || this.createNew)?false:true;
            else if(btnName === 'Delete')
                return choice?false:true;
            else if(btnName === 'Create')
                return !choice && !this.createNew?false:true;
            else if(btnName === 'Submit')
                return choice || this.createNew?false:true;
                
                
        },
        createNewButton(){
            this.createNew = true;
            
        },
        ChangeActiveView(){
            this.change =  false;
        },
        RevertCategoryView(){
            this.change =  true;
        },
        setDataLength(length){
            this.dataLength = length;
        },
        onLogout(){
            this.$emit('onLogout');
        },
        
    }
    
}
</script>
<style scoped>
.cheat-form-container{
    width:100%;
    min-height:100%;
    height: fit-content;
    background-color: #EEEEEE;
    padding:15px;
    display: flex;
    justify-content: center;
    
}
.button-container-logout{
    padding:15px;
    padding-top: 0px;
    cursor: pointer;

}
.button-container{
    padding:15px;
    cursor: pointer;

}
.do-not-show{
    display: none;
    background-color: cyan;
}
@media only screen and (max-width: 600px) {
    .cheat-form-container{
        display: block;
    }
}
</style>