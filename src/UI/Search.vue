<template>
    <div class="search-container">
        <button class="home" @click="onHome">
            <i class="fa fa-home" aria-hidden="true"></i>
        </button>
        <input class="search-input" placeholder="Search" v-model="query" >
        <button class="search" @click="onSearch">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button>
    </div>
</template>
<script>
export default {
    emits:['SearchEvent','HomeEvent'],
    data(){
        return {
            query:"",

        }
    },
    methods:{
        onSearch(){
            if(this.query=='')
                return;
            this.query = this.query.toLowerCase();
            this.$emit('SearchEvent',this.query);
        },
        onHome(){
           this.$emit('HomeEvent');
        }
    }
}
</script>
<style scoped>
.search-container{
    padding-top: 30px;
}
.home,.search{
    width:40px;
    height:40px;
    background-color:#0790F9;
    color:white;
    border:none;
}
.search-input{
    width:29.296875vw;
    height:40px;
    margin:0px;
    padding-left: 15px;
    font-family: Raleway;
    font-weight: 500;
    border:none;
    margin-left: 5px;
    margin-right: 5px;
    color:#0790F9;
}
@media only screen and (max-width: 600px) {
    .search-input{
        width:65%;
    }
}
</style>