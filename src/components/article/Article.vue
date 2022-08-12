<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Body" prop="body"></el-table-column>
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column align="right">
                <template slot="header">
                    <el-input v-model="search" placeholder="输入关键字搜索" clearable />
                </template>
                <template v-slot="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      search: ''
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const ActivePTJYUser = window.localStorage.getItem('ActivePTJYUser')
      //   console.log(ActivePTJYUser)
      const { body } = JSON.parse(ActivePTJYUser)
      console.log('body:', body)
      const AUTH_TOKEN = 'Token ' + body.data.token
      const instance = axios.create({
        headers: { authorization: AUTH_TOKEN }
      })
      const { data: res } = await instance.get('articles')
      console.log(res)
      if (res.status !== 1) return this.$message.error('文章查询失败')
      const articles = res.data.articles
      for (let i = 0; i < articles.length; i++) {
        const array = {
          date: articles[i].updatedAt,
          name: articles[i].author.username,
          body: articles[i].body,
          title: articles[i].title
        }
        this.tableData.push(array)
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
