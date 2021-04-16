<template>
    <div class="center" v-show="this.showLoading">
        <img src="../assets/image/loading.gif">
    </div>
</template>
<script>
export default {
    name:'Loading',
    data(){
        return{

        }
    },
    props : ['showLoading']
}
</script>
<style>

</style>