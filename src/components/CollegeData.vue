<template>
    <div id="collegedata">
        <h2 id="collegetitle">{{collegeName}}</h2>
        <span id="motto">{{motto}}</span>
        <InfoTypes></InfoTypes>
        <div id="viewdata">
        <ScoreView v-if="dataTypeId=='00001001'" :scores="this.scores"></ScoreView>
        <Graduate v-else-if="dataTypeId=='00001002'" :datas="this.jobs"></Graduate>
        <Org v-else-if="dataTypeId=='00001003'" :datas="this.orgs"></Org>
        <HighScoreMajor v-else-if="dataTypeId=='00001004'" :datas="this.highScoreMajors"></HighScoreMajor>
        <SpecialMajor v-show="dataTypeId=='00001005'" :datas="this.specialMajors"></SpecialMajor>
        <Loading :showLoading="this.showLoading"></Loading>
        </div>

    </div>
</template>
<script>
import InfoTypes from './InfoTypes'
import ScoreView from './ScoreView'
import Graduate from './Graduate'
import Org from './Org'
import HighScoreMajor from './HighScoreMajor'
import SpecialMajor from './SpecialMajor'
import Loading from './Loading'
export default {
    name:'CollegeData',
    components:{
        InfoTypes,
        ScoreView,
        Graduate,
        Org,
        HighScoreMajor,
        SpecialMajor,
        Loading
    },
    data(){
        return{
            collegeName : '',
            collegeID : '',
            motto : '',
            dataTypeId : '',
            scores : [],
            jobs : [],
            orgs : [],
            highScoreMajors : [],
            specialMajors : [],
            showLoading : false
        }
    },
    created:function(){
        this.$busevent.$on('changeCollege',this.changeCollege);
        this.$busevent.$on('changeDataType',this.changeDataType);
    },
    beforeDestroy:function(){
        this.$busevent.$off('changeCollege');
        this.$busevent.$off('changeDataType');
    },
    methods:{
        changeCollege(obj){
            this.showLoading = true
            this.collegeName = obj.value
            this.collegeID = obj.id
            this.motto = obj.motto
            this.dataTypeId = ''
        },
        getScores(){
            this.$axios({
                method:'get',
                url:'/college/getscores/'+this.collegeID
                }).then(resp => {
                    this.scores = resp.data.data.list;
                    this.showLoading = false
                }).catch(resp => {
                    this.showLoading = false
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        getJobs(){
            this.$axios({
                method:'get',
                url:'/college/getjobinfo/'+this.collegeID
                }).then(resp => {
                    this.jobs = resp.data.data.types;
                    this.showLoading = false
                }).catch(resp => {
                    this.showLoading = false
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        getOrgs(){
            this.$axios({
                method:'get',
                url:'/college/getorginfo/'+this.collegeID
                }).then(resp => {
                    this.orgs = resp.data.data.types;
                    this.showLoading = false
                }).catch(resp => {
                    this.showLoading = false
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        getHihgScoreMajors(){
            this.$axios({
                method:'get',
                url:'/college/getHighScoreMajor/'+this.collegeID
                }).then(resp => {
                    this.highScoreMajors = resp.data.data.datas;
                    this.showLoading = false
                }).catch(resp => {
                    this.showLoading = false
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        getSpecialMajors(){
            this.$axios({
                method:'get',
                url:'/college/getSpecialMajor/'+this.collegeID
                }).then(resp => {
                    this.specialMajors = resp.data.data.datas
                    this.showLoading = false
                }).catch(resp => {
                    this.showLoading = false
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
        },
        changeDataType(id){
            if (this.dataTypeId === id){
                return
            }
            this.showLoading = true
            this.dataTypeId = id
            if (id == '00001001')
                this.getScores();
            else if (id == '00001002')
                this.getJobs();
            else if (id == '00001003')
                this.getOrgs();
            else if (id == '00001004')
                this.getHihgScoreMajors(); 
            else if (id == '00001005')
                this.getSpecialMajors();   
        }
    }
}
</script>

<style>
    #collegetitle {
        text-align: center
    }
    #motto {
        text-align: center;
        color: red;
    }
    #viewdata {
        overflow: auto;
        height: 100%;
        margin-top: 20px;
    }
</style>