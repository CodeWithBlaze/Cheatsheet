<template>
<div id="app-container">
  <nav-bar @changeActiveComponent="changeisActive"></nav-bar>
  <div id="component-container">
    <component :is="isActive" @changeActiveComponent="changeisActive"></component>
  </div>
  
</div>
  
  
</template>

<script>

import Navbar from './components/Navbar.vue';
import MainBase from './components/MainBase.vue';
import Signup from './components/Signup.vue';
import CheatContainer from './components/CheatContainer.vue';
import Profile from './components/Profile.vue';


export default {
  components:{
    'nav-bar':Navbar,
    'main-base':MainBase,
    'sign-up':Signup,
    'cheat-container':CheatContainer,
    'profile':Profile
  },
  
  data(){
    return{
      isActive:'main-base',
      
    }
    
  },
  methods:{
    changeisActive(name){
      
      if(name==='Home')
        this.isActive = 'main-base';
      else if(name==='SignUp')
        this.isActive = 'sign-up';
      else if(name==='Cheatsheet')
        this.isActive='cheat-container';
      else if(name==='Create')
        this.isActive='profile'
      
    },
    
   
  }
  
}
</script>

<style>
*{
  padding:0px;
  margin:0px;
  box-sizing: border-box;
  
}
body{
  height: 100%;
}
html{
  height: 100%;
}
#app{
  height: 100%;
}
#app-container{
  display:flex;
  flex-direction: column;
  height:100%;
}
#component-container{
  flex:1;
}
</style>
