<template>
    <div id="condition">
        <h4>选择高校</h4>
        <select v-model="selectedItem" value-key="id" @change="onSelected">
            <option v-for="obj in options" :key="obj.id" :value="obj.id" :motto="obj.motto">{{ obj.name }}</option>
        </select>
        <img id="logo" :src="imgUrl">
    </div>
</template>
<script>
export default {
    name:'Condition',
    data(){
        return{
            options:[],
            selectedItem:'',
            imgUrl : require('../assets/image/00001.jpg')
        }
    },
    created:function(){
        this.getdata();
    },
    methods:{
        getdata(){
            this.$axios({
                method:'get',
                url:'/college/getcollege'
                }).then(resp => {
                    this.options = resp.data.data.list;      
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        onSelected(e){
            var id = e.target.value
            this.imgUrl = require('../assets/image/'+id+'.jpg')
            var obj = this.options.find((op) => {return op.id === id})
            var name = obj.name
            var obj = {id:id,value:name,motto:obj.motto}
            this.$busevent.$emit('changeCollege',obj);
        }
    }
}
</script>
<style>
    #logo{
        /* height: 150px; */
        width: 150px;
        margin-top: 50px
    }
</style>