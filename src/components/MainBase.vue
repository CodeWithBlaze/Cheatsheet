<template>
    <main class="main-body">
        <div class="main-text">
            <h1>Revise Easily from<br>Cheatsheets</h1>
            <div class="sub-heading">Learn from summarised cheatsheet quickly and<br>
               effectively. Create Sheets for others to learn and <br>
               help the community. Learn Create and Enjoy 
            </div>
            <Buttons label="Get Started" btnwidth="150px" btnheight="50px" btnradius="30px" btnfontsize="15px" :OnClick="GetStarted"/>
        </div>
        <div class="main-image">
            <div>
                 <img src="../assets/logoh.svg" class="logo">
            </div>
           
        </div>
    </main>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
export default{
    components:{
        Buttons
    },
    methods:{
        GetStarted(){
            this.$emit('changeActiveComponent','Cheatsheet')
        }
    }
}
</script>

<style scoped>
.main-body{
    width:100%;
    display: flex;
    justify-content: space-around;
}
.main-text{
    margin-left:100px;
    margin-top: 100px;
    font-size: 30px;
    font-family: Righteous;
    width:100%;
    
}
.main-image{
    margin-top: 30px;
    width:100%;
    
}
.sub-heading{
    font-family: Raleway;
    font-weight: 500;
    font-size:16px;
    margin-top:25px;
    margin-bottom:25px;
    color: #767272;
    line-height:25px;
}
.logo{
    
    width:550px;
    height:550px;
}
</style>