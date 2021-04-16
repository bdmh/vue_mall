<template>
  <div id="login" class="login">
    <table>
      <tbody>
        <tr>
          <th>用户名：</th>
          <td>
            <div class="errortip" :class="{error:$v.userName.$error}">
                <span v-if="!$v.userName.$error"></span>
                <span v-else-if="!$v.userName.required">用户名不能为空</span>
                <span v-else-if="!$v.userName.minLength">用户名长度不能少于 {{$v.userName.$params.minLength.min}} 字符。</span>
                <span v-else-if="!$v.userName.maxLength">用户名长度不能多于 {{$v.userName.$params.maxLength.max}} 字符。</span>
            </div>
            
            <input type="text" class="form-control" id="inputEmail3" v-model.trim="$v.userName.$model" 
            @input="$v.userName.$touch()" placeholder="请输入用户名">
          </td>
        </tr>
        <br>
        <tr>
          <th>密  码：</th>
          <td>
            <div class="errortip" :class="{error:$v.password.$error}">
                <span v-if="!$v.password.$error"></span>
                <span v-else-if="!$v.password.required">密码不能为空</span>
                <span v-else-if="!$v.password.minLength">密码长度不能少于 {{$v.password.$params.minLength.min}} 字符。</span>
                <span v-else-if="!$v.password.maxLength">密码长度不能多于 {{$v.password.$params.maxLength.max}} 字符。</span>
            </div>
            <input type="password" class="form-control" id="inputPassword3" v-model.trim="password" 
            @input="$v.password.$touch()" placeholder="请输入密码">
          </td>
        </tr>
        <!-- <tr>
          <th></th>
          <td>
            <input type="checkbox"> Remember me
          </td>
        </tr> -->
      </tbody>
    </table>
      <div>
        <button type="submit" id="loginbtn" class="btn btn-primary h-center" @click="login">登录</button>
        <p id="lb_regist" @click="gotoRegist">立即注册>></p>
      </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import md5 from '../../../static/js/md5'
export default {
  name: 'Login',
  data(){
    return{
      userName : '',
      password : ''
    }
  },
  validations:{
    userName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    }
  },
  methods:{
    login(){
      let error = this.$v.userName.$error || this.$v.password.$error;
      if (error){
        return;
      }
      this.$axios({
        method:'post',
        baseURL:process.env.MallAPI,
        url:'/user/login',
        headers:{
          userid:this.userName,
          psw:md5(this.password)
        }
        }).then(resp => {
            console.log(resp.data.data)
            if (resp.data.code != 0){
              alert(resp.data.message)
              return
            }
            else{
              this.$js.setUserToken(resp.data.data.userToken)
            }
            this.$router.push("./MallHome").catch(err => {console.log(err)})
        }).catch(resp => {
            console.log('请求失败：'+resp.status+','+resp.statusText);
      });
    },
    gotoRegist(){
      this.$router.push("./Regist").catch(err => {console.log(err)})
    }
  }
}
</script>

<style>
  #login{
    border-style: solid;
    border-color: #dddddd;
    border-width: 1px;
    border-radius: 4px;
    width: 400px;
    height: 250px;
    padding: 30px;
  }
  span{
    font-size: 12px;
  }
  #login table{
    width: 100%
  }
  #loginbtn{
    position: absolute;
    bottom: 10px;
    width: 40%
  }
  th{
    padding-top: 20px;
  }
  #lb_regist{
    position: absolute;
    bottom: 0;
    right: 10px;
    cursor: pointer;
    color: #0c74d0;
  }

</style>
