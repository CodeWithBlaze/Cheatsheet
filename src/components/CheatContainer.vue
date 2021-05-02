<template>
    <cheat-page v-if="getActiveComponent('cheat')" @categoryId="showCategory"></cheat-page>
    <preview-category v-if="getActiveComponent('category')" 
    :activeCategory="activeCategory"
    @changeView="ChangeActiveView"></preview-category>
</template>
<script>
import CheatPage from './CheatPage.vue';
import PreviewCategory from './PreviewCategory.vue';
export default {
    components:{
        'cheat-page':CheatPage,
        'preview-category':PreviewCategory
    },
    data(){
        return{
            activeComponent:'cheat',
            activeCategory:-1,
        }
    },
    methods:{
        getActiveComponent(name){
            if(name === this.activeComponent)
                return true;
            else
                return false;
        },
        showCategory(id){
            this.activeComponent = 'category';
            this.activeCategory = id;
        },
        ChangeActiveView(){
            this.activeComponent='cheat';
        }
    },
    emits:['changeActiveComponent']
}
</script>