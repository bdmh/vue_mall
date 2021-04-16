<template>
    <div id="test">
        <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
    </div>
</template>
<script>
export default {
    name: 'Test',
    data(){
        return{
            content:"dfdfdsfsdfsdfsdfsdfsdfsdfsfsdfsdf"
        }
    },
    created:function(){
        this.$axios({
                method:'get',
                baseURL:process.env.MallAPI,
                url:'/user/getuser'
                }).then(resp => {
                    console.log('请求成功：'+resp.data);
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
    }
}
</script>