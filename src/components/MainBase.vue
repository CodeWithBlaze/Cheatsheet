<template>
    <main class="main-body">
        <div class="main-text">
            <h1>Revise Easily from<br>Cheatsheet</h1>
            <div class="sub-heading">Learn from summarised cheatsheet quickly and
               effectively. Create Sheets for others to learn and
               help the community. Learn Create and Enjoy 
            </div>
            <div class="btn">
                <Buttons label="Get Started" btnwidth="150px" btnheight="50px" btnradius="30px" btnfontsize="15px" :OnClick="GetStarted"/>
            </div>
            
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
    width: 450px;
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
h1{
    font-size: 65px;
}
@media only screen and (max-width: 600px) {
    .main-body{
        flex-direction: column;
        flex-direction: column-reverse;
        margin-bottom: 60px;
        padding-left:20px; 
        padding-right: 20px;
        margin-top: 60px;
       
    }
    .main-text{
        margin-left:0px;
        margin-top:0px;
        font-size:30px;
    }
   .logo{
        width:91vw;
        height:91vw;
    }
    .main-image{
        padding-left: 0px;
        align-self: center;
    }
    .sub-heading{
        text-align: center;
        width:100%;
    }
    h1{
        text-align: center;
        font-size:59px;
    }
    .btn{
        text-align: center;
    }
    
}
</style>