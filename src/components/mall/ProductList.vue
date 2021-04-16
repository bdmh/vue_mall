<template>
    <div id="productilist">
        <div class="toolbar">
            <button type="button" class="btn btn-success btn-xs" @click="showProductInfo(-1,user)">添加</button>
        </div>
        <table class="table table-bordered">
            <thead class="tablehead">
                <tr>
                    <th>商品编号</th>
                    <th>商品名称</th>
                    <th>型号</th>
                    <th>制造商</th>
                    <th>价格（元）</th>
                    <th>库存</th>
                    <th>操作</th>
                </tr>
            </thead>   
            <tbody>
                <tr v-for="obj in products" :key="obj.productId">
                    <th class="clickable" @click="showProductInfo(0,obj)">{{obj.productId}}</th>
                    <td class="clickable" @click="showProductInfo(0,obj)">{{obj.productName}}</td>
                    <td>{{obj.productModel}}</td>
                    <td>{{obj.productor}}</td>
                    <td>{{obj.price}}</td>
                    <td>{{obj.productStock}}</td>
                    <td>
                        <button @click="showProductInfo(1,obj)" type="button" class="btn btn-primary btn-xs">编辑</button>
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
            products:[]
        }
    },
    mounted:function(){
        this.getProducts()
    },
    methods:{
        getProducts:function(){
            this.$axios({
                method:'get',
                baseURL:process.env.MallAPI,
                url:'/product/GetProducts',
                headers:{
                    'userToken':this.$js.getUserToken()
                },
                }).then(resp => {
                    // console.log(resp.data.data)
                    this.products = resp.data.datas
                    if (resp.data.code != 0){
                        alert(resp.data.message)
                        return
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });  
        },
        //optype:-1:添加,0:查看,1:编辑
        showProductInfo:function(optype,obj){
            var data = obj;
            if (obj == null){
                data = {userId:this.$js.getUserToken(),productId:"",productName:"",productModel:"",
                productor:"",price:0,productStock:0,intro:"",cover:""}
            }
            this.$router.push({name:"ProductInfo",params:{
                optype:optype,
                data:data
            }})
        }
    }
}
</script>