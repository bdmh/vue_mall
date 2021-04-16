<template>
    <div id="operationContainer">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'OperationContainer',
    created:function(){
        this.$busevent.$on("changeFunction",this.changeFunction)
    },
    beforeDestroy:function(){
        this.$busevent.$off('changeFunction',this.changeFunction)
    },
    methods:{
        changeFunction(code){
            if ("100001" == code)
                this.$router.push({name:"UserList"})
            else if ("100002" == code)
                this.$router.push("ProductList")
        }
    }
}
</script>