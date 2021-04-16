import Vue from 'vue'
import Router from 'vue-router'
import CollegeData from '@/components/CollegeData'
import Condition from '@/components/Condition'
import Login from '@/components/mall/Login'
import Regist from '@/components/Regist'
import Test from '@/components/Test'
import OperationContainer from '@/components/mall/OperationContainer'
import FunctionNav from '@/components/mall/FunctionNav'
import UserList from '@/components/mall/UserList'
import ProductList from '@/components/mall/ProductList'
import MallHome from '@/components/mall/MallHome'
import UserInfo from '@/components/mall/UserInfo'
import ProductInfo from '@/components/mall/ProductInfo'
import { name } from 'file-loader'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/Condition',
            name: 'Condition',
            component: Condition
        },
        {
            path: '/CollegeData',
            name: 'CollegeData',
            component: CollegeData
        },
        {
            path: '/Regist',
            name: 'Regist',
            component: Regist
        },
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Test',
            name: 'Test',
            component: Test
        },
        {
            path: '/MallHome',
            name: 'MallHome',
            component: MallHome,
            children: [{
                    path: '/OperationContainer',
                    name: 'OperationContainer',
                    component: OperationContainer
                },
                {
                    path: '/FunctionNav',
                    name: 'FunctionNav',
                    component: FunctionNav
                },
                {
                    path: '/UserList',
                    name: 'UserList',
                    component: UserList
                },
                {
                    path: '/ProductList',
                    name: 'ProductList',
                    component: ProductList
                },
                {
                    path: '/UserInfo',
                    name: 'UserInfo',
                    component: UserInfo
                },
                {
                    path: '/ProductInfo',
                    name: 'ProductInfo',
                    component: ProductInfo
                }

            ]
        }
    ]
})