<template>

<div class="cheat-page-container">
    <div v-if="!isLoading" class="cheat-search">
        <search @SearchEvent="onSearch" @HomeEvent="onHome"></search>
    </div>
    
    <div class="cheat-page" v-if="!isLoading">
        <card v-for="cheat in cheats" 
        :key="cheat.id" 
        :item="cheat" 
        @click="sendDataCatgeory(cheat.id)"></card>
        <h1 v-if="!isLoading && cheats.length==0">No Cheats Available</h1>
        
    </div>
    <button class="btn-loader"  @click="loadData" v-if="!isEmpty && cheats.length>=12">Load More Data</button>
    <h3 v-if="isEmpty && cheats.length>0" style="font-family:Raleway;font-weight:600">NO MORE DATA TO LOAD</h3>
    <loader v-if="isLoading"></loader>
</div>
   
</template>
<script>
import Card from '../UI/Card.vue';
import Loader from '../UI/Loader.vue'
import {firestore} from '../database/firebase.js';
import Search from '../UI/Search.vue';

export default {
   mounted(){
        this.loadData();
    },
    components:{
        'card':Card,
        'loader':Loader,
        'search':Search,
        
    },
    emits:['categoryId'],
    data(){
        return{
            cheats:[],
            isLoading:true,
            last:0,
            isEmpty:false
        }
    },
    methods:{
        loadData(){
            this.isLoading=true;
            firestore.collection('Cheats').orderBy('title')
            .startAfter(this.last).limit(12).get().then(data=>{
               this.last = data.docs[data.docs.length -1];
                data.docs.forEach(data=>{
                const cheat_obj=data.data();
                this.cheats.push({
                        id:data.id,
                        image:cheat_obj.image,
                        label:cheat_obj.title,
                        description:cheat_obj.description,
                        author:cheat_obj.author,

                })
                
            })
            this.isLoading =false;
             if(data.empty)
                    this.isEmpty=true;
        })
        },
        sendDataCatgeory(id){
            this.$emit('categoryId',id);
        },
        onSearch(query){
            this.isLoading=true;
            const query_arr=query.split(' ');
            query_arr.push(query);
            const search_result=[];
            firestore.collection('Cheats').where('tagList','array-contains-any',query_arr).get()
            .then(data=>{
                
                data.docs.forEach(data=>{
                const cheat_obj=data.data();
                search_result.push({
                        id:data.id,
                        image:cheat_obj.image,
                        label:cheat_obj.title,
                        description:cheat_obj.description,
                        author:cheat_obj.author
                })
            })
            this.cheats = search_result;
            this.isLoading =false;
            })
        },
        onHome(){
            this.loadData();
        },
        
        }
    }

</script>
<style scoped>
.cheat-page-container{
    width: 100%;
    height:100%;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
.cheat-page{
    width:100%;
    padding-top: 30px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
   
   
}
.btn-loader{
    background-color: #141518;
    color: #68AEE0;
    font-family: Raleway;
    font-weight: 500;
    padding:10px;
    margin-bottom:10px;
    border:none;
}
h1{
    font-family: Raleway;
}
@media only screen and (max-width: 600px) {
 .cheat-page{
     padding:20px;
 }
}
</style>