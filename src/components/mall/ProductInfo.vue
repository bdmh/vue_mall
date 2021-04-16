<template>
    <div class="center">
        <div class="left">
            <div class="infoitem">
                <label v-bind:class="{'required':this.optype==-1}">商品编号</label>
                <label v-bind:class="{'required':this.optype==-1}" v-if="this.optype==-1">*</label>
                <div><input type="text" class="form-control" v-model.trim="data.productId" v-bind:disabled="this.optype!=-1" ></div>
                <span class="error" v-if="proIdEmpty">请填写商品编号</span>
            </div>
            <div class="infoitem">
                <label v-bind:class="{'required':this.optype!=0}">商品名称</label>
                <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
                <div><input type="text" class="form-control" v-model.trim="data.productName" v-bind:disabled="isDisable()"></div>
                <span class="error" v-if="proNameEmpty">请填写商品名称</span>
            </div>
            <div class="infoitem">
                <label>型号</label>
                <div><input type="text" class="form-control" v-model.trim="data.productModel" v-bind:disabled="isDisable()"></div>
            </div>  
            <div class="infoitem">
                <label>制造商</label>
                <div><input type="text" class="form-control" v-model.trim="data.productor" v-bind:disabled="isDisable()"></div>
            </div>    
            <div class="infoitem">
                <label v-bind:class="{'required':this.optype!=0}">价格</label>
                <label v-bind:class="{'required':this.optype!=0}" v-if="this.optype!=0">*</label>
                <div><input type="number" class="form-control" v-model.number="data.price" v-bind:disabled="isDisable()"></div>
                <span class="error" v-if="priceEmpty">请填写价格</span>
            </div>
            <div class="infoitem">
                <label>库存</label>
                <div><input type="number" class="form-control" v-model.number="data.productStock" v-bind:disabled="isDisable()"></div>
            </div>
            <div class="infoitem">
                <label>商品描述</label>
                <div><textarea class="form-control" v-model.trim="data.intro" v-bind:disabled="isDisable()"></textarea></div>
            </div>
            <div id="btndiv">
                <button class="btn btn-primary" @click="updateProduct()">保存</button>
                <button class="btn btn-primary" @click="goback()">返回</button>
            </div>
        </div>
        <div class="right">
            
            <div>
                <p>设置封面</p>
                <div>
                    <input type="file" name="files" id="coverselect" @change="imageSelect($event,true)" style="display: none" ref="selcover">
                    <p>{{selCoverInfo}}</p>
                    <img id="picimage" :src="this.coverUrl">  
                    <button class="btn btn-primary" @click="selectPicture(true)">选择封面</button>
                    <button class="btn btn-primary" @click="upload(true)">上传</button>                  
                </div>
            </div>
            <p style="margin-top:20px">产品宣传页面</p>
            <div v-if="this.optype != 0">
                <h2>上传图片</h2>
                <input type="file" name="files" id="fileselect" @change="imageSelect($event,false)" style="display: none" ref="selfile">
                <p>{{selPictureInfo}}</p>
                <button class="btn btn-primary" @click="selectPicture(false)">选择文件</button>
                <button class="btn btn-primary" @click="upload(false)">上传</button>
            </div>
            <div>
                <div class="picdiv" v-for="(obj,index) in pictures" :key="obj.picName">
                    <div>
                    <img id="picimage" :src="obj.url">
                    </div>
                    <div class="delpicdiv" v-if="!isView()">
                        <button class="btn btn-danger btn-xs" @click="deletePic(index)">删除</button>
                    </div>
                </div>               
            </div>
        </div>
        <v-dialog ref="dialog"></v-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userId:'',
            optype:0,
            data:null,
            proIdEmpty:false,
            proNameEmpty:false,
            priceEmpty:false,
            pictures:[],
            selPicIndex:-1,
            selPictureInfo:'',
            selCoverInfo:'',
            coverUrl:''
        }
    },
    created:function(){
        this.userId = this.$js.getUserToken()
        this.optype = this.$route.params.optype
        this.data = this.$route.params.data
        this.coverUrl = this.data.cover+'?r='+Math.round(Math.random()*50000)
        this.$busevent.$on('dialogCancel',this.onDialogCancel);
        this.$busevent.$on('dialogOk',this.onDialogOk);
    },
    beforeDestroy:function(){
        this.$busevent.$off('dialogCancel');
        this.$busevent.$off('dialogOk');
    },
    mounted:function(){
        this.getPictures()
    },
    methods:{
        isView(){
            return this.optype == 0
        },
        onDialogOk(){
            this.delPicture(this.selPicIndex)
        },
        onDialogCancel(){
            alert('onDialogCancel')
        },
        updateProduct:function(){
            if (this.optype == -1){
                if (this.data.productId.length === 0){
                    this.proIdEmpty = true
                    return
                }
                else{
                    this.proIdEmpty = false
                }               
            }
            if (this.data.productName.length === 0){
                this.proNameEmpty = true
                return
            }
            else{
                this.proNameEmpty = false
            }
            if (this.data.price.length === 0 || parseInt(this.data.price) == 0){
                this.priceEmpty = true
                return
            }
            else{
                this.priceEmpty = false
            }
            var posturl = this.optype === -1?'/product/AddProduct':'/product/AddProduct'
             this.$axios({
                method:'post',
                baseURL:process.env.MallAPI,
                url:posturl,
                data:this.data
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
        },
        imageSelect:function(e,iscover){
            if (iscover)
                this.selCoverInfo = "已选择："+e.target.files[0].name
            else
                this.selPictureInfo = "已选择："+e.target.files[0].name
        },
        selectPicture(iscover){
            if (iscover){
                this.$refs.selcover.click()
            }
            else{
                this.$refs.selfile.click()
            }
        },
        getPictures:function(){
            this.$axios({
                method:'get',
                baseURL:process.env.MallAPI,
                url:'/product/GetProductPics',
                headers:{
                    'userId':this.userId,
                    'productId':this.data.productId
                }
                }).then(resp => {
                    // console.log(resp.data.data)
                    this.pictures = resp.data.datas
                    if (resp.data.code != 0){
                        alert(resp.data.message)
                        return
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                }); 
        },
        upload:function(iscover){
            if (this.data.productId.length === 0){
                alert("先保存产品信息")
                return
            }
            let empty = iscover?this.$refs.selcover.files.length === 0:this.$refs.selfile.files.length === 0
            if (empty){
                this.$refs.dialog.info = '未选择图片'
                this.$refs.dialog.showButton(2)
                this.$refs.dialog.show()
                return
            }
            let file = iscover?this.$refs.selcover.files[0]:this.$refs.selfile.files[0]
            let param = new FormData(); 
            param.append("files", file);
            this.$axios({
                method:'post',
                baseURL:process.env.MallAPI,
                url:'/product/UploadFile',
                data:param,
                headers:{
                    'userId':this.userId,
                    'productId':this.data.productId,
                    'isCover':iscover
                }
                }).then(resp => {
                    // console.log(resp.data.data)
                    // alert(resp.data.data)
                    
                    if (iscover){
                        this.coverUrl = resp.data.data.cover+'?r='+Math.round(Math.random()*50000)
                        this.selCoverInfo = ''
                        this.$refs.selcover.value=''
                    }
                    else
                    {
                        this.pictures.push(resp.data.data)
                        this.selPictureInfo = ''
                        this.$refs.selfile.value=''
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
            });
        },
        delPicture(index){
            this.$axios({
                method:'post',
                baseURL:process.env.MallAPI,
                url:'/product/DelProductPic',
                headers:{
                    'userId':this.userId,
                    'productId':this.data.productId,
                    'picName':this.pictures[this.selPicIndex].picName
                }
                }).then(resp => {
                    this.pictures.splice(index,1)
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
            });
        },
        deletePic:function(index){
            this.selPicIndex = index
            this.$refs.dialog.info = '是否删除选定的产品图片？'
            this.$refs.dialog.showButton(3)
            this.$refs.dialog.show()
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
.left{
    width:400px;
    height:100%;
    text-align: left;
    /* border-color: #333333;
    border-width: 1px;
    border-style: solid; */
    float: left;
    margin-left:50px;
}
.right{
  display:flex;
  flex-direction: column;
  height:100%;
  overflow: auto;
  margin-left:500px;
  margin-right: 50px;
  /* border-color: #333333;
  border-width: 1px;
  border-style: solid; */
}
#picimage{
    width: 150px;
    height: 150px;
}
.picdiv{
    display: inline-block;
}
.delpicdiv{
    overflow: hidden;
}
</style>