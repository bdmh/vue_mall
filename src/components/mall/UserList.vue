<template>
    <div>
        <div class="toolbar">
            <button type="button" class="btn btn-success btn-xs" @click="showUserInfo(-1,user)">添加</button>
        </div>
        <table class="table table-bordered">
            <thead class="tablehead">
                <tr>
                    <th>用户编号</th>
                    <th>用户名</th>
                    <th>手机号</th>
                    <th>公司</th>
                    <th>操作</th>
                </tr>
            </thead>   
            <tbody>
                <tr v-for="obj in users" :key="obj.userId">
                    <th class="clickable" @click="showUserInfo(0,obj)">{{obj.userId}}</th>
                    <td class="clickable" @click="showUserInfo(0,obj)">{{obj.userName}}</td>
                    <td>{{obj.phone}}</td>
                    <td>{{obj.company}}</td>
                    <td>
                        <button @click="showUserInfo(1,obj)" type="button" class="btn btn-primary btn-xs">编辑</button>
                        <button type="button" class="btn btn-danger btn-xs">删除</button>
                    </td>
                </tr>
            </tbody>         
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            users:[]
        }
    },
    props :['user'],
    created:function(){
        this.getUsers()
        this.user = {userId:"",userName:"",phone:"",passWord:"",company:""}
    },
    methods:{
        getUsers:function(){
            this.$axios({
                method:'get',
                baseURL:process.env.MallAPI,
                url:'/user/getusers'
                }).then(resp => {
                    // console.log(resp.data.data)
                    this.users = resp.data.users
                    if (resp.data.code != 0){
                        alert(resp.data.message)
                        return
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });            
        },
        //optype:-1:添加,0:查看,1:编辑
        showUserInfo:function(optype,obj){
            this.$router.push({name:"UserInfo",params:{
                optype:optype,
                user:obj
            }})
        }
    }
}
</script>
<style>
.tablehead{
    background-color: #337ab7;
    color: white;
}
.toolbar button{
    height: 100%;
}
</style>