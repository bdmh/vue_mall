<template id="dialog">
  <div class="dialog_shadow" v-if="visible" @click.stop ref="mask"><!-- 遮罩层 -->
    <div class="dialog-wrapper">                                    <!-- 对话框 -->
      <div class="info-wrapper">                                    <!-- 对话框内容部分 -->
        <div class="text">{{info}}</div>
      </div>
      <div class="btn-wrapper">                                     <!-- 对话框按钮部分 -->
        <div v-if="btnFlag==1 || btnFlag==3" class="btn" @click="onCancel">关闭</div>
        <div v-if="btnFlag==2 || btnFlag==3" class="btn" @click="onOk">确定</div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    mask: { /* 控制遮罩 */
      type: Boolean,
      default: false,
    },
    icon: { /* 图标类型 */
      type: String,
      default: 'info'
    },
    info: { /* 文字内容 */
      type: String,
      default: '内容'
    },
    cancelText: { /* 取消按钮文字 */
      type: String,
      default: ''
    },
    okText: { /* 确认按钮文字 */
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false, /* 控制对话框显示 */
      btnFlag: 3
    }
  },
  mounted:function() {
    setTimeout(() => { /* 确保能获取到mask修改其背景属性 */
      if (this.mask) {
        this.$refs.mask.style.background = 'rgba(0,0,0,.3)'
      }
    }, 20)
  },
  methods: {
    show:function(){ /* 打开对话框 */
      this.visible = true
    },
    hidden:function(){ /* 关闭对话框 */
      this.visible = false
    },
    onCancel:function(){ /* 点击取消 */
      this.$busevent.$emit('dialogCancel')
      this.hidden()
    },
    onOk:function(){ /* 点击确认 */
      this.$busevent.$emit('dialogOk')
      this.hidden()
    },
    //flag=0:都隐藏，flag=1:cancel，flag=2:ok，flag=3:all
    showButton(flag){
        this.btnFlag = flag
    }
  }
}
</script>