<template>
    <div class="user">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input> 
            </el-col>
            <el-col :span="12" style="padding-left: 10px">
                <el-button type="primary" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-table
                        :data="userList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop=""
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="地址">
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="block">
                    <el-pagination
                        class="page"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 2, 4, 8]"
                        :page-size="4"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="10">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userList: [],
            currentPage: 1
        }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
}
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0 5px 10px;
    background-color: #D3DCE6;
  }
}
</style>


