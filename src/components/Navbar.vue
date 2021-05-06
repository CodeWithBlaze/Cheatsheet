<template>
  <div class="nav-bar">
    <div class="logo">
      <img src="../assets/openlayers.svg" class="nav-logo">
      <h3 class="logo-header">Cheatsheet</h3>
    </div>
    
    <ul class="nav-items">
      <li v-for="menu in nav_options" :key="menu" @click="navclick(menu.text)">
        <div>
          <i :class=" 'fa '+menu.icon+' icons'" aria-hidden="true"></i>
          <label>{{menu.text}}</label>
        </div>
      </li>  
    </ul>
    <div class="btn">
    <Buttons label="Sign up" btnwidth="130px" btnheight="40px" btnradius="25px" :OnClick="SignUp"/>
    </div>
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
      nav_options:[
      {text:'Home',icon:'fa-home'},
      {text:'Cheatsheet',icon:'fa-file-text'},
      {text:'Create',icon:'fa-plus-square'}
      ]
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
.logo {
  display:flex;
  align-items: center;
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
.icons{
  margin-right:5px;
}
li:hover{
  color:#0790F9;
  
}
label{
  cursor: pointer;
}
.nav-logo{
  margin-left: 30px;
  width:40px;
  height:40px;
}
@media only screen and (max-width: 600px) {
  .nav-bar{
    padding-top:25px;
    padding-bottom: 25px;
    display: block;
    height: fit-content;
    
  }
  .nav-items{
    display: block;
    margin-top: 30px;
    height: fit-content;
  }
  li{
    margin-left:40px ;
    margin-top: 15px;
    font-size: 20px;
    margin-bottom:30px;
  }
  .btn{
    margin-left: 15px;
    margin-top: 10px;
  }
  
}
</style>
