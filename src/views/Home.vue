<template>
  <div class="home">
    登录成功
  </div>
</template>

<script>
import {getUserList} from '@/api'

export default {
  data() {
    return {

    }
  },
  mounted() {
    let params = {
      params: {
        query: 1,
        pagenum: 1,
        pagesize: 5
      }
    }
    getUserList(params).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
