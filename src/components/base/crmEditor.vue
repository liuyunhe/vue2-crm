<template>
  <div>
    <!-- 图片上传组件辅助-->
    <el-upload
      class="quill-upload"
      :action="serverUrl"
      name="img"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload">
    </el-upload>
    <!--富文本编辑器组件-->
    <div class="quill-container">
      <el-row
        v-loading="quillUpdateImg"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <quill-editor
          class="myQuillEditor"
          v-model="tem_detailContent"
          ref="myQuillEditor"
          :options="editorOption"
          @change="onEditorChange($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
        <div class="quill-code">
          <textarea v-model="tem_detailContent" ></textarea>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
  // 工具栏配置
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]

  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
  import { IMG_UPLOAD } from '../../common/js/types'

  export default {
    props:{
      detailContent: {
        type:String,
        default:''
      }
    },
    components:{
      quillEditor
    },
    data() {
      return {
        tem_detailContent:this.detailContent,
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: IMG_UPLOAD,  // 这里写你要上传的图片服务器地址

        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('.quill-upload input').click()
//                    alert(1)
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
      }
    },
    computed:{
      contentCode() {
        return this.detailContent
      },
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    },
    methods: {
      beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true
      },

      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        console.log(res)
        if (res.code === 1 && res.data.fileUrl !== null) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data.fileUrl)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false
      },

      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },

      onEditorChange(e){
        console.log('editor change!', e)
        this.$emit("on-change",e.html)
      },
      onEditorReady(e){
        console.log('editor ready!', e)
      },

    }
  }
</script>
<style lang="scss" scoped>
  .quill-container{
    width: 700px;
    .quill-code{
      textarea{
        width: 100%;
        min-height: 100px;
        margin: 0;
        padding: 1rem;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0;
        height: 10rem;
        overflow-y: auto;
        resize: vertical;
        box-sizing: border-box;
        outline: none;
      }
    }
  }

</style>
