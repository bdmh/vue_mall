<template>
    <div id="orgroot">
        <table class="table table-bordered" :style="getTypeTablePercent()" v-for="obj in datas" :key="obj.id">
        <thead>
            <tr>
                <th>#</th>
                <th>{{obj.name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in obj.orgs" :key="'org-'+item.id">
                <th>{{index+1}}</th>
                <td>{{item.name}}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<script>
export default {
    name : 'Org',
    data(){
        return{
            typeCount : 1
        }
    },
    props :['datas'],
    watch : {
        datas:function(value){
            this.typeCount = value.length;
        }
    },
    methods:{
        getTypeTablePercent(){
            var per = 100/this.typeCount;
            var style = "width : "+per+"%"
            return style
        }
    }
}
</script>

<style>
    #orgroot{
        display: flex;
        flex-direction: row;
        flex: 1;
        width: 100%
    }
    #orgroot th{
        text-align: center
    }
</style>