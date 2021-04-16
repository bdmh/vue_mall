import axios from 'axios'
import functions from './common.js'

let net = axios.create({
    // headers: {
    //     'content-type': 'application/x-www-form-urlencoded'
    // }
})
net.baseURL = process.env.MallAPI

net.router = null

net.interceptors.request.use(
    config => {
        if (config.url.indexOf("/login") == -1) {
            config.headers.userToken = functions.getUserToken()
            config.headers.userId = functions.getUserToken()
        }
        if (functions.isNull(config.headers.userToken)) {
            net.router.replace("/").catch(err => { console.log(err) })
        }
        return config
    },
    err => {
        return Promise.reject(err)
    });

net.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

net.setRouter = function(router) {
    this.router = router
}

export default net