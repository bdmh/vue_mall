<template>
     <div id="majorroot">
        <table class="table table-bordered">
        <thead>
            <tr>
                <th>专业名称</th>
                <th>选科要求</th>
                <th>分数区间</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="obj in datas" :key="obj.id">
                <td>{{obj.major}}</td>
                <td>{{obj.lesson}}</td>
                <th class="score">{{obj.score}}</th>
            </tr>
        </tbody>
    </table>
    </div>   
</template>
<script>
export default {
    name: 'higescoremajor',
    props :['datas']
}
</script>
<style>
.score{
    color: brown;
}
</style>