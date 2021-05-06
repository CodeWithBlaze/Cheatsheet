<template>
    <authentication-form-container>
        <img src="../assets/openlayers.svg" class="nav-logo">
            <form @submit.prevent>
                <p>Welcome Back!</p>
                <h2 class="form-heading">Let's Continue Your Revision</h2>
                <input placeholder="email" v-model="email">
                <input placeholder="password" v-model="password">
                <buttons label="Login" btnwidth="30%" btnheight="40px" btnradius="25px" :OnClick="onLogin"></buttons>
                <p class="form-signup" @click="goSignup">Dont have a account ? Create one now</p>
            </form>
    </authentication-form-container>
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import AuthenticationForm from '../UI/AuthenticationForm.vue';
export default {
    
    components:{
        'buttons':Buttons,
        'authentication-form-container':AuthenticationForm,
    },
    data(){
        return{
            email:"",
            password:"",
            
        }
    },
    methods:{
        goSignup(){
          this.$emit('changeActiveProfileComponent','SignUp');
        },
        onLogin(){
            //authentication place
            this.$emit('LoginAttempt',this.email,this.password);
        }
    },
    emits:['changeActiveProfileComponent','LoginAttempt']
    
}
</script>
<style scoped>
input{
    width:100%;
    height:50px;
    margin-bottom:25px;
    color: #0790F9;
    border:#0790F9 2px solid;
    padding:15px;
    border-radius: 5px;
    font-weight: 500;
    font-family: Raleway;
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