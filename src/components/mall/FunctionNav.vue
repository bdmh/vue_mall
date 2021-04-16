<template>
    <div id="functionNav">
        <ul class="funcitem nav nav-pills nav-stacked" id="infoul">
            <li role="nav-stacked" v-for="obj in functions" :key="obj.FunctionID" :value="obj.FunctionID"
            :class="[obj.FunctionID == selectedId?selClass:'']">
            <!-- @click写在<a>中，兼容safari -->
                <a @click="itemClick(obj.FunctionID)" href="#">{{obj.FunctionName}}</a></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            selClass : 'active',
            functions:[],
            selectedId : ""
        }
    },
    created:function(){
        this.getFunctions()
    },
    methods:{
        itemClick(id){
            this.selectedId = id;
            this.$busevent.$emit('changeFunction',id);
        },
        getFunctions(){
            this.$axios({
                method:'get',
                baseURL:process.env.MallAPI,
                url:'/function/getfunction'
                }).then(resp => {
                    console.log(resp.data.data)
                    this.functions = resp.data.data
                    if (resp.data.code != 0){
                        alert(resp.data.message)
                        return
                    }
                    if (this.functions.length > 0){
                        this.itemClick(this.functions[0].FunctionID)
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        }
    }
}
</script>
<style>
.funcitem li a{
    border-radius: 0;
}
</style>