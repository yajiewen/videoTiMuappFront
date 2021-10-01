<template>
  <div class="home">
    <h2 class="subtitle is-2">上传视频案例文件,和题目文件进行事故案例标题检测</h2>
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
          </label>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-3">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getfile1">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
              <span class="file-label">
            </span>
          </span>
            <span class="file-name">
            {{filename2}}
          </span>
          </label>
        </div>
      </div>

    </div>
    <div class="columns">
      <div class="column">
        <button class="button" v-bind:class="{'is-loading':isloading}" @click="upload">检测</button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <button class="button is-link" v-on:click="gotoadd">前往添加题目页面</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "detect",
  data(){
    return{
      filename1:'题目文件',
      filename2:'视频事故案例文件',
      filestyle:['xlsx','xls'],
      csvformdata: new FormData,
      is_getfile:false,
      is_getfile1:false,
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
        this.filename1='题目文件'
        this.is_getfile = false
        alert('文件格式不正确')
      }
    },
    getfile1(csvobj){
      let files = csvobj.target.files
      this.filename2 = files[0].name //获取文件名字

      if(this.filestyle.includes(this.filename2.split('.').pop()))
      {
        this.csvformdata.append('Video',files[0])
        this.csvformdata.append('filename',this.filename2.split('.')[0])
        this.is_getfile1 = true
      }else{
        this.filename2='视频事故案例文件'
        this.is_getfile1 = false
        alert('文件格式不正确')
      }
    },
    upload(){
      if (this.is_getfile && this.is_getfile1){
        this.isloading = true
        this.$axios.post('/api/timu/detecttitle/',this.csvformdata).then(res => {
          console.log(res.data);
           if(res.data.orderwrong == 'no'){
             if(res.data.haswrong == 'yes'){
               alert("题目文件中,以下行所在事故案例标题打标错误:" + res.data.wrongrow)
             }else{
               alert("案例标题全部正确")
             }
           }else{
             alert('请在对于位置上传对应文件')
           }
          this.isloading = false
        })
      }else{
        alert("请选择文件")
      }
    },
    gotoadd(){
      this.$router.push("/")
    }
  },
}
</script>

<style scoped>

</style>