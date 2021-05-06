<template>
    <notification v-if="isError" :type="type" 
    :text="error_msg" @close="close">
    </notification>
    <login v-if="!isLoggedIn" @LoginAttempt="onLogin" @changeActiveProfileComponent="changeComponent"></login>
    <cheat-form v-else @onLogout="onLogout"></cheat-form>
    
</template>
<script>
import Login from './Login.vue';
import CheatForm from './CheatForm.vue';
import {auth,firestore} from '../database/firebase.js';
import NotificationLayout from '../notifications/NotificationLayout.vue';
export default {
    provide(){
        return {
            'author':this.profile
        }
    },
    data(){
        return{
            isLoggedIn:false,
            type:"",
            error_msg:null,
            isError:false,
            profile:{
                name:"",
                id:null,
            }
        }
        
    },
    components:{
        'login':Login,
        'cheat-form':CheatForm,
        'notification':NotificationLayout
    },
    methods:{
        onLogin(username,password){
            if(username!="" && password !=""){
                 auth.signInWithEmailAndPassword(username,password).then(cred=>{
                firestore.collection('Users').doc(cred.user.uid).get().then(data=>
                {
                    this.profile.name = data.data().name;
                    this.profile.id = data.id;
                    this.isLoggedIn = true;
                })
                
                
            }).catch(()=>{
                this.isError=true;
                this.type='error';
                this.error_msg = 'Wrong Email or Password';
            })
            }
            else{
                this.isError=true;
                this.type='warning';
                this.error_msg='All Fields are required';
            }
           
        },
        onLogout(){
            this.isLoggedIn = false;
        },
        changeComponent(comname){
            this.$emit('changeActiveComponent',comname);
        },
        close(){
            this.isError = false;
        }
    },
    emits:['changeActiveComponent']
        
}
</script>
