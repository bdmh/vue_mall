<template>
    <div class="center">
        <div class="infoitem">
            <label v-bind:class="{'required':this.optype==-1}">用户ID</label>
            <label v-bind:class="{'required':this.optype==-1}" v-if="this.optype==-1">*</label>
            <div><input type="text" class="form-control" v-model="user.userId" v-bind:disabled="this.optype!=-1" ></div>
            <span class="error" v-if="userIdEmpty">请填写用户编号</span>
        </div>
        <div class="infoitem">
            <label v-bind:class="{'required':this.optype!=0}">用户名</label>
            <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
            <div><input type="text" class="form-control" v-model="user.userName" v-bind:disabled="isDisable()"></div>
            <span class="error" v-if="userNameEmpty">请填写用户名</span>
        </div>
        <div v-if="this.optype==-1">
            <div class="infoitem">
                <label v-bind:class="{'required':this.optype!=0}">密码</label>
                <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
                <div><input type="password" class="form-control" v-model="passWord" v-bind:disabled="isDisable()"></div>
                <span class="error" v-if="passWordError">{{passWordErrorMsg}}</span>
            </div>  
            <div class="infoitem">
                <label v-bind:class="{'required':this.optype!=0}">确认密码</label>
                <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
                <div><input type="password" class="form-control" v-model="confirmPassWord" v-bind:disabled="isDisable()"></div>
                <span class="error" v-if="passWordDiffrent">两次密码不一致</span>
            </div>            
        </div>
        <div class="infoitem">
            <label v-bind:class="{'required':this.optype!=0}">手机号码</label>
            <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
            <div><input type="text" class="form-control" v-model="user.phone" v-bind:disabled="isDisable()"></div>
            <span class="error" v-if="phoneEmpty">请填写电话号码</span>
        </div>
        <div class="infoitem">
            <label>公司</label>
            <div><textarea class="form-control" v-model="user.company" v-bind:disabled="isDisable()"></textarea></div>
        </div>
        <div id="btndiv">
            <button class="btn btn-primary" @click="updateUser()">保存</button>
            <button class="btn btn-primary" @click="goback()">返回</button>
        </div>
    </div>
</template>
<script>
import md5 from '../../../static/js/md5';
export default {
    data(){
        return{
            optype:0,
            user:null,
            isUserExsit:false,
            passWord:"",
            confirmPassWord:"",
            passWordDiffrent:false,
            userNameEmpty:false,
            passWordError:false,
            phoneEmpty:false,
            userIdEmpty:false,
            passWordErrorMsg:""
        }
    },
    created:function(){
        this.optype = this.$route.params.optype
        this.user = this.$route.params.user
        this.passWord = user.passWord
    },
    methods:{
        updateUser:function(){
            if (this.optype == -1){
                if (this.user.userId.length === 0){
                    this.userIdEmpty = true
                    return
                }
                else{
                    this.userIdEmpty = false
                }               
            }
            if (this.user.userName.length === 0){
                this.userNameEmpty = true
                return
            }
            else{
                this.userNameEmpty = false
            }
            if (this.passWord.length === 0){
                this.passWordError = true
                this.passWordErrorMsg = "请填写用户密码"
                return
            }
            else if (this.passWord.length<6){
                this.passWordError = true
                this.passWordErrorMsg = "密码不能少于6个字符"
                return
            }
            else{
                this.passWordError = false
            }
            if (this.confirmPassWord != this.passWord){
                this.passWordDiffrent = true
                return
            }
            else{
                this.passWordDiffrent = false
            }
            if (this.user.phone.length === 0){
                this.phoneEmpty = true
                return
            }
            else{
                this.phoneEmpty = false
            }
            var posturl = this.optype === -1?'/user/AddUser':'/user/UpdateUser'
            this.user.passWord = md5(this.passWord)
             this.$axios({
                method:'post',
                baseURL:process.env.MallAPI,
                url:posturl,
                data:this.user
                }).then(resp => {
                    // console.log(resp.data.data)
                    alert(resp.data.message)
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });            
        },
        goback:function(){
            this.$router.back()
        },
        isDisable:function(){
            return this.optype == 0
        }
    }
}
</script>
<style scoped>
.infoitem{
    padding-bottom: 20px;
}
.infoitem input{
    width: 400px;
}
.infoitem textarea{
    width: 400px;
    height: 100px;
}
.center{
    margin: 0 auto;
    margin-top: 50px;
}
#btndiv{
    text-align: center;
}
.required{
    color: red;
}
</style>