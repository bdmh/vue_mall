<template>
     <div id="majorroot">
         <div v-for="(obj,index) in datas" :key="obj.id">
            <div>
                <span>{{obj.major}}</span>
                <div class="right_op" @click="setVisible(index)">{{getOpStr(index)}}</div>
            </div>
            
            <div class="memo" v-html="obj.memo" v-show="isShow(index)"></div>
         </div>
    </div>   
</template>
<script>
export default {
    name: 'specialmajor',
    data(){
        return{
            memoshow:[],
            collegeID : ''
        }
    },
    props :['datas','collegeid'],
    methods:{
        isShow(index){
            return this.memoshow[index]
        },
        setVisible(index){
            this.$set(this.memoshow,index,!this.memoshow[index])
        },
        getOpStr(index){
            if (this.memoshow[index]){
                return "收起"
            }
            else{
                return "展开"
            }
        }
    },
    watch : {
        datas:function(value){
            console.log(this.memoshow)
            if (value.length === this.memoshow.length){
                return
            }
            this.memoshow = []
            let i = 0;
            for(i=0;i<value.length;i++){
                this.memoshow.push(false)
            }
        }
    }
}
</script>
<style>
.score{
    color: brown;
}
#majorroot span{
    font-weight: bold;
    font-size: 16px;
    color: tomato;
    padding: 3px;
}
#majorroot li{
    color: seagreen;
    font-weight: bold;
    padding-top: 3px;
}
.memo{
    background-color:#fcf8e3;
    border-radius: 8px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-bottom: 13px;
}
.right_op{
    float: right;
    color:#337ab7;
    padding-right: 15px;
    cursor: pointer;
}
</style>