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
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="email"
                            label="邮箱"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="电话">
                        </el-table-column>
                        <el-table-column
                            label="用户状态">
                            <template slot-scope="scope">
                                <el-switch v-model="value"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="240">
                            <template slot-scope="scope">
                                <el-button size="mini" icon="el-icon-edit" type="primary" plain></el-button>
                                <el-button size="mini" icon="el-icon-delete" type="danger" plain></el-button>
                                <el-button size="mini" icon="el-icon-check" type="success" plain></el-button>
                            </template>
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
import {getUserList} from '@/api'

export default {
    data() {
        return {
            userList: [],
            currentPage: 1,
            value: true
        }
    },
    mounted() {
        this.renderList()
    },
    methods: {
        renderList() {
            let params = {
                params: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                }
            }
            getUserList(params).then(res => {
                console.log(res)
                if(res.meta.status === 200) {
                    this.userList = res.data.users
                }
            })
        },
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


