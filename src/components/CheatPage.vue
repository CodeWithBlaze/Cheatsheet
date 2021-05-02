<template>
    <div class="cheat-page">
        <card v-for="cheat in cheats" :key="cheat.id" :item="cheat" @click="sendDataCatgeory(cheat.id)"></card>
    </div>
</template>
<script>
import Card from '../UI/Card.vue';
import {firestore} from '../database/firebase.js';
export default {
    mounted(){
        firestore.collection('Cheats').get().then(data=>{
            data.docs.forEach(data=>{
                const cheat_obj=data.data();
                this.cheats.push({
                        id:data.id,
                        image:cheat_obj.image,
                        label:cheat_obj.title,
                        description:cheat_obj.description,
                })
            })
        })
    },
    components:{
        'card':Card
    },
    data(){
        return{
            cheats:[]
        }
    },
    methods:{
        sendDataCatgeory(id){
            this.$emit('categoryId',id);
        }
    }
}
</script>
<style scoped>
.cheat-page{
    width:100%;
    min-height:100%;
    height:fit-content;
    padding:30px;
    display: flex;
    flex-wrap: wrap;
    background-color: #EEEEEE;
   
}
@media only screen and (max-width: 600px) {
  .container{
    width:100%;
    min-height:100%;
    height: fit-content;
    background-color: #EEEEEE;
    padding:60px;
}
}
</style>