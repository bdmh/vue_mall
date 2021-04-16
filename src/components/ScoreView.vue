<template>
    <div id="scoreroot">
        <table class="table table-bordered" id="scoretable">    
        <thead>
            <tr>
            <th>#</th>
            <th v-for="obj in scores" :key="obj.id">{{obj.year}}年</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">理科最低线</th>
            <td v-for="obj in scores" :key="obj.id">{{obj.score}}</td>
            </tr>
            <tr>
            <th scope="row">人数排名</th>
            <td v-for="obj in scores" :key="obj.id">{{obj.position}}</td>
            </tr>
        </tbody>
        </table>       
    </div>
</template>

<script>
export default {
    name : 'ScoreView',
    data(){
        return{
            
        }
    },
    props:['scores']
}
</script>

<style>
    /* #scoreroot {
        overflow: auto;
    } */
</style>