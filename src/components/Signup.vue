<template>
    <notification :type="type" 
    :text="type=='success'?'Sign up Successful':'Sign up failed'" 
    v-if="isError"
    @close="close"
    >

    </notification>
    <authentication-form-container class="form-container">
        <img src="../assets/openlayers.svg" class="nav-logo">
            <form @submit.prevent>
                <p>Welcome</p>
                <h2 class="form-heading">Let's Make Your First Cheatsheet</h2>
                <input placeholder="Name" v-model="name">
                <input placeholder="email" v-model="email">
                <input placeholder="password" v-model="password">
                <buttons label="Signup" btnwidth="30%" btnheight="40px" btnradius="25px" :OnClick="onSignup"></buttons>
                <p class="form-signup" @click="goLogin">Already have a account ? Login in</p>
            </form>
    </authentication-form-container>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import AuthenticationForm from '../UI/AuthenticationForm.vue';
import {auth} from '../database/firebase.js';
import NotificationLayout from '../notifications/NotificationLayout.vue';
export default{
    components:{
        Buttons,
        'authentication-form-container':AuthenticationForm,
        'notification':NotificationLayout
    },
    data(){
        
        return{
            name:"",
            email:"",
            password:"",
            type:'success',
            isError:false
        }
    },
    methods:{
        onSignup(){
            auth.createUserWithEmailAndPassword(this.email,this.password).then(()=>{
                this.isError = true;
                
            }).catch(()=>{
                this.type = 'error';
                this.isError = true;
            })
        },
        goLogin(){
            this.$emit('changeActiveComponent','Create');
        },
        close(){
            this.isError = false;
            this.goLogin();
        }
    },
    emits:['changeActiveComponent']
}
</script>
<style scoped>
.form-container{
    padding-top: 30px;
}
input{
    width:100%;
    height:50px;
    margin-bottom:25px;
    color: #0790F9;
    border:#0790F9 2px solid;
    padding:15px;
    border-radius: 5px;
    font-weight: 500;
    
}
p{
    margin-bottom: 15px;
    font-weight:500;
}
.form-heading{
    margin-bottom: 60px;
    font-family: Righteous;
}
.form-signup{
    color:#0790F9;
    font-size: 12px;
    margin-top:60px;
    cursor: pointer;
}
.nav-logo{
    width:60px;
    height:60px;
    margin-bottom: 15px;
}

</style>
