<template>
    <div id="graduateroot"> 
        <div class="panel panel-primary" v-for="(t) in datas" :key="t.code">
            <div class="panel-heading">
                <h3 class="panel-title">{{t.name}}</h3>
            </div>
            <div class="panel-body">
                <table class="table table-bordered" id="graduatetable">
                    <thead>
                        <tr>
                            <th>年份</th>
                            <th>行业</th>
                            <th>占比(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="obj in t.jobs" :key="obj.id">
                            <th id="spantd" :rowspan="getRowSpan(obj.jobType+obj.year)" v-if="showRowSpan(obj.jobType+obj.year)">{{obj.year}}年</th>
                            <td>{{obj.content}}</td>
                            <td>{{obj.rate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name : 'Graduate',
    data(){
        return{
            spanMap : new Map(),
            mergedMap : new Map()
        }
    },
    methods:{
        getRowSpan(key){
            if (this.spanMap.has(key)){
                this.mergedMap.set(key,1)
                return this.spanMap.get(key)
            }
            else{
                return 0
            }
        },
        showRowSpan(key){
            return !this.mergedMap.has(key)
        }
    },
    props :['datas'],
    watch : {
        datas:function(value){
            this.spanMap.clear()
            this.mergedMap.clear()
            value.forEach(element => {
                element.jobs.forEach(job => {
                    var id = job.jobType + job.year;
                    if (this.spanMap.has(id)){
                        var num = this.spanMap.get(id);
                        num++;
                        this.spanMap.set(id,num);
                    }
                    else{
                        this.spanMap.set(id,1);
                    }
                    });
                
            });
        }
    }
}
</script>
<style>
    /* #graduateroot {
        overflow: auto;
    } */
    #spantd{
        vertical-align: middle
    }
</style>