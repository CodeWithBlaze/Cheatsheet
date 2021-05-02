<template>
    <div @click="toogleEditor">
        <dynamic-box :description="description" :type="type"></dynamic-box>
    </div>
    
    <div class="btns" v-if="isEditorActive">
        <div class="btn-container icon1" @click="editItem">
             <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
        </div>
        <div class="btn-container icon2" @click="removeItem">
             <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
        </div>
    </div>
</template>
<script>
import DynamicBox from './DynamicBox.vue';
export default {
    props:['id','description','type'],
    emits:['removeItemFromList','editItemFromList'],
    components:{
        'dynamic-box':DynamicBox
    },
    data(){
        return {
            isEditorActive:false,
        }
    },
    methods:{
        toogleEditor(){
            this.isEditorActive = ! this.isEditorActive;
        },
        removeItem(){
            this.$emit('removeItemFromList',this.id);
        },
        editItem(){
            this.$emit('editItemFromList',this.id);
        }
    }

}
</script>
<style scoped>

.btns{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-container{
    width:60px;
    height: 60px;
    border-radius: 50%;
    background-color: aqua;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px;
    cursor: pointer;
}
.icon2{
    background-color: red;
}
.icon1{
    background-color: royalblue;
}
</style>