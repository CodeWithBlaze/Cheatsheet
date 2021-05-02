<template>
    <notification v-if="isError" type="error" text="Wrong Email or Password" @close="close">
    </notification>
    <login v-if="!isLoggedIn" @LoginAttempt="onLogin" @changeActiveProfileComponent="changeComponent"></login>
    <cheat-form v-else></cheat-form>
    
</template>
<script>
import Login from './Login.vue';
import CheatForm from './CheatForm.vue';
import {auth} from '../database/firebase.js';
import NotificationLayout from '../notifications/NotificationLayout.vue';
export default {
    
    data(){
        return{
            isLoggedIn:true,
            isError:false,
        }
        
    },
    components:{
        'login':Login,
        'cheat-form':CheatForm,
        'notification':NotificationLayout
    },
    methods:{
        onLogin(username,password){
            auth.signInWithEmailAndPassword(username,password).then(()=>{
                this.isLoggedIn = true;
            }).catch(()=>{
                this.isError=true;
            })
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
<style scoped>

</style>