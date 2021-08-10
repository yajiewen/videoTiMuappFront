<template>
  <div class="home">
    <h2 class="subtitle is-2">上传题目打标文件</h2>
    <div class="columns">
      <div class="column is-offset-3">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getfile">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
              <span class="file-label">
            </span>
          </span>
            <span class="file-name">
            {{filename1}}
          </span>
            <button class="button" v-bind:class="{'is-loading':isloading}" @click="upload">上传</button>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      filename1:'请选择文件',
      filestyle:['csv','xlsx'],
      csvformdata: new FormData,
      is_getfile:false,
      isloading:false,
    }
  },
  methods:{
    getfile(csvobj){
      let files = csvobj.target.files
      this.filename1 = files[0].name //获取文件名字

      if(this.filestyle.includes(this.filename1.split('.').pop()))
      {
        this.csvformdata.append('Subject',files[0])
        this.is_getfile = true
      }else{
        this.filename1='请选择文件'
        this.is_getfile = false
        alert('文件格式不正确')
      }
    },
    upload(){
        if (this.is_getfile){
          this.isloading = true
          this.$axios.post('/api/timu/addtimu/',this.csvformdata).then(res => {
            console.log(res.data);
            if (res.data.is_add == 'yes'){
              alert("上传成功!"+"添加数目为: "+ res.data.add_num)
              this.isloading = false
              location.reload()
            }else{
              alert("上传失败,文件中第"+ res.data.wrongRow+"行的录入内容不符合要求")
              this.isloading = false
              location.reload()
            }
          })
        }else{
          alert("请选择文件")
        }
    }
  },
}
</script>
