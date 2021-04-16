<template>
  <div id="regist">
    <img id="head" :src="localHeadUrl">
    <input @change="fileChange($event)" type="file" id="upload_file" multiple/> 
    <button type="button" @click="pickImage()">上传照片</button>
      <div class="el_top_space">用户名</div>  
      <form class="form-inline">
        <div class="form-group">
            <input type="text" id="userid" class="form-control" v-model.trim="$v.userName.$model" 
                @input="$v.userName.$touch()" placeholder="请输入用户名">       
        </div>
        <div class="form-group errortip" :class="{error:$v.userName.$error}">
            <span v-if="!$v.userName.$error"></span>
            <span v-else-if="!$v.userName.required">用户名不能为空</span>
            <span v-else-if="!$v.userName.minLength">用户名长度不能少于 {{$v.userName.$params.minLength.min}} 字符。</span>
            <span v-else-if="!$v.userName.maxLength">用户名长度不能多于 {{$v.userName.$params.maxLength.max}} 字符。</span>
            <span v-else-if="!$v.userName.isUnique">该用户已经注册</span>
        </div>      
      <div class="el_top_space">手机号</div>
      <form class="form-inline">
        <div class="form-group">
            <input type="text" class="form-control" v-model.trim="phone" 
                @input="$v.phone.$touch()" placeholder="请输入手机号码">     
        </div>
        <div class="form-group errortip" :class="{error:$v.phone.$error}">
            <span v-if="!$v.phone.$error"></span>
            <span v-else-if="!$v.phone.required">手机号不能为空</span>
            <span v-else-if="!$v.phone.minLength">手机号格式错误</span>
            <span v-else-if="!$v.phone.maxLength">手机号格式错误</span>
        </div>         
      </form>   
      </form>
      <div class="el_top_space">密码</div>
      <form class="form-inline">
        <div class="form-group">
            <input type="password" class="form-control" v-model.trim="password" 
                @input="$v.password.$touch()" placeholder="请输入密码">     
        </div>
        <div class="form-group errortip" :class="{error:$v.password.$error}">
            <span v-if="!$v.password.$error"></span>
            <span v-else-if="!$v.password.required">密码不能为空</span>
            <span v-else-if="!$v.password.minLength">密码长度不能少于 {{$v.password.$params.minLength.min}} 字符。</span>
            <span v-else-if="!$v.password.maxLength">密码长度不能多于 {{$v.password.$params.maxLength.max}} 字符。</span>
        </div>         
      </form>
      <div class="el_top_space">确认密码</div>
      <form class="form-inline">
        <div class="form-group">
            <input type="password" class="form-control" v-model.trim="checkpassword" 
                @blur="$v.checkpassword.$touch()" placeholder="确认密码">     
        </div>
        <div class="form-group errortip" :class="{'error':$v.checkpassword.$error,'hide':!$v.checkpassword.$error}" v-if="!$v.checkpassword.sameAsPassword">
            两次输入的密码不一致
        </div>         
      </form>
      <div>
        <button type="submit" id="registbtn" class="btn btn-primary h-center" @click="retist">提交</button>
      </div>
  </div>    
</template>
<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import md5 from '../../static/js/md5';
export default {
    name : 'Regist',
  data(){
    return{
      userName : '',
      password : '',
      checkpassword : '',
      phone : '',
      localHeadUrl : ''
    }
  },
  validations:{
    userName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20),
      async isUnique (value) {
          // let result = await this.isUserExsist(value);
          // console.log(this.isUserExsist(value))
          // return !this.isUserExsist(value)
        if (value === '') return true
        const response = await fetch(`/user/isUserExsist/${value}`)
        let obj = await response.json()
        console.log(obj.retCode)
        return obj.retCode == 0
      }
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    },
    checkpassword: {
        sameAsPassword: sameAs('password')
    },
    phone:{
      required,
      minLength: minLength(11),
      maxLength: maxLength(11)
    }
  },
  methods:{
      retist(){
        this.$axios({
          method:'post',
          url:'/user/regist',
          params:{
            userid:this.userName,
            password:md5(this.password),
            phone:this.phone
          }
          }).then(resp => {
              // console.log(resp.data)
              return resp.data.retCode != 0
          }).catch(resp => {
              console.log('请求失败：'+resp.status+','+resp.statusText);
        });
      },
      pickImage(){

      },
      fileChange(obj){
        // console.log(this.$js.getFileUrl(obj.target))
        // this.localHeadUrl = getFileUrl(obj.target)
      }
  }
}
</script>
<style>
    #regist{
        border-style: solid;
        border-color: #dddddd;
        border-width: 1px;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        padding: 30px;       
    }
</style>