<template>
  <div class="nav-bar">
    <img src="../assets/openlayers.svg" class="nav-logo">
    <h3 class="logo-header">Cheatsheet</h3>
    <ul class="nav-items">
      <li v-for="menu in nav_options" :key="menu" @click="navclick(menu)">{{menu}}</li>  
    </ul>
    <Buttons label="Sign up" btnwidth="130px" btnheight="40px" btnradius="25px" :OnClick="SignUp"/>
  </div>
</template>

<script>
import Buttons from '../UI/Buttons.vue';

export default {
  components:{
    Buttons
  },
  data(){
    return {
      nav_options:['Home','Cheatsheet','Create']
    }
  },
  methods:{
    navclick(name){
      this.$emit('changeActiveComponent',name);
    },
    SignUp(){
      this.$emit('changeActiveComponent','SignUp');
    }
  },
  emits:['changeActiveComponent']
}
</script>

<style scoped>
.nav-bar{
  width:100%;
  height:80px;
  display: flex;
  color:black;
  align-items: center;
  padding-right:80px;
}
.nav-items{
  font-family: Raleway;
  font-weight:600;
  display: flex;
  justify-content:flex-end;
  align-items: center;
  width: 100%;
  height:80px;
  list-style: none;
  
}
li{
  margin-left:25px;
  margin-right: 25px;
  cursor: pointer;
}
ul{
  margin-right:10px;
}
.logo-header{
  font-family: Righteous;
  margin-left:15px;
}
.nav-logo{
  margin-left: 30px;
  width:40px;
  height:40px;
}
</style>
