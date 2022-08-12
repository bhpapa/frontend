<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <div class="xgxx">
                    <div class="name">{{ ActivePTJYUser.body.data.username }}</div>
                    <div class="value">{{ ActivePTJYUser.body.data.email }}</div>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="150px">
                <el-menu background-color="#333743" text-color="#FFFFFF" active-text-color="#409EFF" :unique-opened="true" router>
                    <el-menu-item v-for="item in tabs" :key="item.id" :index="item.path">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{ item.name }}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
    //   tabs: [{id: 1, name: '资产', path: '/zcxq'}, {id: 2, name: '常用', path: '/cygn'}, {id: 3, name: '交易', path: '/jygn'}, {id: 4, name: '基金', path: '/jjgn'}, {id: 5, name: '理财', path: '/lcgn'}, {id: 6, name: '其他', path: '/qtgn'}, {id: 7, name: '退出', path: '/tcgn'}],
      tabs: [{ id: 1, name: '主页', path: '/ppage' }, { id: 2, name: '文章', path: '/article' }, { id: 3, name: '设置', path: '/setting' }],
      ActivePTJYUser: {}
    }
  },
  created () {
    var userinfo = window.localStorage.getItem('ActivePTJYUser') || {}
    this.ActivePTJYUser = JSON.parse(userinfo)
  },
  methods: {
    async zjcx () {
      var params = this.ActivePTJYUser.head
      params.hbdm = '0'
      const { data: res } = await this.$http.post('ptjy/ptyw/zjcx', params)
      if (res.cljg[0].code !== 'MP1B000000') return this.$message.error(res.cljg[0].message)
      this.zjlb = res.zjlb[0]
      console.log(this.zjlb)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #FA4355;
    line-height: 60px;
    .xgxx {
        display: flex;
        align-items: center;
        .name, .value {
            color: #FFFFFF;
            font-size: 14px;
            margin-right: 25px;
        }
    }
}
.el-aside {
    background-color: #333743;
    height: auto;
    .title {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
        border-bottom: 1px solid #FFFFFF;
    }
}
.el-main {
    background-color: #FFFFFF;
}
</style>
