<template>
    <div class="container">
        <div class="cheat-menu-container">
            <div class="cheat-menu">
                <activation-button v-for="item in category" 
                :key="item.id"
                :label="item.categoryName" 
                btnwidth="100%" 
                btnheight="40px" 
                :OnActive="OnActiveCall" 
                :OnNotActive="OnDeactivate" 
                :idx="item.id">
                </activation-button>
            </div>
            <div class="cheat-preview">
                <div class="cheat-preview-area" v-for="active_category in activeCategories" :key="active_category.id">
                    <dynamic-box v-for="item in active_category.description" 
                    :key="item.id" 
                    :description="item.description" 
                    :type="item.type">
                    </dynamic-box>
                </div>
            </div>
        </div>
    </div>
    <back-button @click="goBack"></back-button>  
</template>
<script>
import ActivationButton from '../UI/ActivationButton.vue';
import {firestore} from '../database/firebase.js';
import DynamicBox from '../UI/DynamicBox.vue';
import BackButton from '../UI/BackButton.vue';
export default {
    props:['activeCategory'],
    emits:['changeView'],
    components:{
        'activation-button':ActivationButton,
        'dynamic-box':DynamicBox,
        'back-button':BackButton
    },
    mounted(){
        firestore.collection('Category').where('cheat_id','==',this.activeCategory).get()
        .then(data=>{
            data.docs.forEach(data=>{
                this.category = data.data().catgeory_list;
                console.log(this.category)
            })
        })
    },
    data(){
        return{
            activeCategories:[],
            category:[]
        }
    },
    methods:{
        OnActiveCall(id){
           this.activeCategories.push({
               id:id,
               description:this.category[id].categoryDescription
           });
           console.log(this.activeCategories)
            
        },
        OnDeactivate(id){
           this.activeCategories = this.activeCategories.filter(active=>active.id!=id);
           console.log(this.activeCategories);
        },
        goBack(){
            console.log("called");
             this.$emit('changeView');
        }
    }
}
</script>
<style scoped>
.container{
    width:100%;
    height:100%;
    background-color:#EEEEEE;
    padding:60px;
}
.cheat-menu-container{
    width:100%;
    height:fit-content;
    display: flex;
    justify-content: space-between;
   
}
.cheat-menu{
    width:35%;
    height:fit-content;
    background-color: white;
    padding:15px;
    box-shadow:rgba(189, 195, 199,1) 0px 0px 15px;
}
.cheat-preview{
    width:55%;
    padding:15px;
    height:fit-content;
    background-color: white;
    box-shadow:rgba(189, 195, 199,1) 0px 0px 15px;
}
.cheat-preview-area{
    width:100%;
    height:fit-content;
    padding:5px;
    color:white;
    margin-bottom: 5px;
    font-family: Raleway;
}

</style>