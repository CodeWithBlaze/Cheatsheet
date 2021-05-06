<template>
    <div class="editor-option-container">
        <div class="icon icon1" @click="onDeleteCategory">
            <i :class="image_one" aria-hidden="true"></i>
        </div>
        <div class="icon icon2" v-if="!isLocked" @click="activateCategoryEditor">
           <i :class="image_two" aria-hidden="true"></i>
        </div>
        <div class="icon icon3" @click="addCategory" :style="{backgroundColor:color}">
           <i :class="image_three" aria-hidden="true"></i>
        </div>
        
        <input v-if="!isLocked" v-model="name" @input="changeValueEvent" placeholder="Category Name">
        
    </div>
</template>
<script>
export default {
    props:["image_one","image_two","image_three","idx","data_length"],
    inject:['cheatFormData','revertView'],
    
    data(){
        return {
            name:"",
            isLocked:this.idx<this.data_length?true:false,
            color:this.idx<this.data_length?'green':'grey'
        }
    },
    
    methods:{
        changeValueEvent(){
            this.$emit('changeHeading',this.name);
        },
        addCategory(){
            if(!this.isLocked){
                const data=this.cheatFormData.categoryList[this.idx];
                data.categoryName=this.name;
                this.color='green';
            }
            else
                this.color='grey';
            
            this.isLocked=!this.isLocked;
            this.$emit('changeLock')
        },
        activateCategoryEditor(){
          this.cheatFormData.activatedCategoryId = this.idx;
          this.revertView();
        },
        onDeleteCategory(){
            this.cheatFormData.categoryList=this.cheatFormData.categoryList.filter(item =>item.id != this.idx);
              console.log(this.cheatFormData.categoryList);
              console.log(this.idx)
        },
       
    }
}
</script>
<style scoped>
.editor-option-container{
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
}
.icon{
    
    width:40px;
    height:40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
}
.icon1{
    background-color: #0790F9;
    margin:5px;
}
.icon2{
    background-color: red;
    margin:5px;
}
.icon3{
    
    margin:5px;
}
input{
    min-width: 170px;
    min-height: 40px;
    padding-left: 15px;
    border:2px solid #0790F9;
}
</style>