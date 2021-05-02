<template>
    <div class="notification-container">
        <div>
            <div>
                <button class="btn" @click="close">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
             <div :class="['notification',type]">
            <i v-if="checkType()" :class="['fa','icon','fa-2x',icon_class]" aria-hidden="true"></i>
            <label>{{text}}</label>
            
        </div>
        </div>
       
        
    </div>
   
</template>
<script>

export default {
    props:['type','text'],
    methods:{
       checkType(){
           if(this.type=='warning'){
               this.icon_class='fa-exclamation-triangle';
                return true;
           }
           else if(this.type==='error'){
                this.icon_class='fa-times';
                return true;
           }
           else if(this.type==='note'){
                this.icon_class='fa-bell';
                return true;
           }
           else if(this.type==='success'){
                this.icon_class='fa-check';
                return true;
           }
           else
                return false;
           
        },
        close(){
            this.$emit('close');
        }
       
    },
    data(){
        return{
            icon_class:null,
            
        }
    }    
}
</script>
<style scoped>
.notification-container{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0px;
    left:0px;
    width:100%;
    height:100vh;
    background-color: rgba(0,0,0,0.5);
    
}
.notification{
    width:400px;
    height:200px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.icon{
    color:white;
    margin-right: 10px;
}
.warning{
    background-color: #FFC107;
}
.error{
    background-color: #FF0000;
}
.note{
    background-color: tomato;
}
.success{
    background-color: #5cb85c;
}
label{
    font-family: Raleway;
    font-weight: 500;
    color:white;
    font-size: 15px;
}
.btn{
    float: right;
    width:30px;
    height:30px;
    border-radius: 50%;
    border:none;
    margin-bottom: -20px;
    display: flex;
    justify-content:center;
    align-items: center;
    cursor: pointer;
}
</style>