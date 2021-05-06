<template>
    
        <notification :type="type" 
    :text="error_msg" 
    v-if="isError"
    @close="close"
    ></notification>
    <authentication-form-container class="form-container">
        <img src="../assets/openlayers.svg" class="nav-logo">
            <form @submit.prevent>
                <p>Welcome</p>
                <h2 class="form-heading">Let's Make Your First Cheatsheet</h2>
                <input placeholder="Name" v-model="name" type="text">
                <input placeholder="Email" v-model="email" type="email">
                <input placeholder="Password" v-model="password" type="password">
                <buttons label="Signup" btnwidth="30%" btnheight="40px" btnradius="25px" :OnClick="onSignup"></buttons>
                <p class="form-signup" @click="goLogin">Already have a account ? Login in</p>
            </form>
    </authentication-form-container>
    
    
</template>
<script>
import Buttons from '../UI/Buttons.vue';
import AuthenticationForm from '../UI/AuthenticationForm.vue';
import {auth, firestore} from '../database/firebase.js';
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
            isError:false,
            error_msg:""
        }
    },
    methods:{
        onSignup(){
            if(this.name!="" && this.email !="" && this.password != ""){
                 auth.createUserWithEmailAndPassword(this.email,this.password).then(cred=>{
                
                firestore.collection('Users').doc(cred.user.uid).set({
                    name:this.name,
                }).then(()=>{
                    this.isError = true;
                    this.error_msg = 'Signup Successful';
                })
                
                
            }).catch(()=>{
                this.type = 'error';
                this.isError = true;
                this.error_msg = 'Signup failed';
            })
            }else{
                this.isError=true;
                this.type='warning';
                this.error_msg = 'All Fields Are Required';
            }
           
        },
        goLogin(){
            this.$emit('changeActiveComponent','Create');
        },
        close(){
            this.isError = false;
            if(this.type=='success')
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
    font-family: Raleway;
    font-weight:600;
    
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
