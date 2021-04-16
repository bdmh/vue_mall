<template>
    <div role="navigation" id="inforoot">
        <ul class="nav nav-tabs" id="infoul">
            <li role="presentation" v-for="obj in options" :key="obj.id" :value="obj.id"
            :class="[obj.id == selectedId?selClass:'']">
            <!-- @click写在<a>中，兼容safari -->
                <a @click="itemClick(obj.id)" href="#">{{obj.name}}</a></li>
        </ul>
    </div>
</template>
<script>
export default {
    name : 'InfoTypes',
    data(){
        return{
            selClass : 'active',
            selectedId : "",
            options:[]
        }
    },
    created:function(){
        this.$busevent.$on('changeCollege',this.changeCollege);
    },
    beforeDestroy:function(){
        this.$busevent.$off('changeCollege');
    },
    methods:{
        getdata(pid){
            this.$axios({
                method:'get',
                url:'/college/getinfotypes/'+pid
                }).then(resp => {
                    this.options = resp.data.data.list;
                    if (this.options.length > 0){
                        if (this.selectedId == '')
                            this.selectedId = this.options[0].id; 
                        this.itemClick(this.selectedId);
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        changeCollege(obj){
            this.getdata(obj.id);
        },
        itemClick(id){
            this.selectedId = id;
            this.$busevent.$emit('changeDataType',id);
        }
    }
}
</script>

<style>

    #infoul {
        height: 40px;
    }
</style>
