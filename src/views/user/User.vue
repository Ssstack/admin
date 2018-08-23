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
                <el-input placeholder="请输入内容" v-model="searchVal" @keydown.native.enter="queryUser">
                    <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
                </el-input> 
            </el-col>
            <el-col :span="12" style="padding-left: 10px">
                <el-button type="primary" plain @click="addFormVisible = true">添加用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-table :data="userList" border style="width: 100%">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="username" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="email" label="邮箱" width="180">
                        </el-table-column>
                        <el-table-column prop="mobile" label="电话">
                        </el-table-column>
                        <el-table-column label="用户状态">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button size="mini" icon="el-icon-edit" type="primary" plain @click="showEditDialog(scope.row)"></el-button>
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
                        :current-page="pagenum"
                        :page-sizes="[1, 2, 4, 8]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 添加用户对话框 -->
        <el-dialog title="用户信息" :visible.sync="addFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm" :label-width="formLabelWidth">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserSubmit('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑加用户对话框 -->
        <el-dialog title="编辑用户" :visible.sync="editFormVisible">
            <el-form :model="editForm" :rules="rules" ref="editForm" :label-width="formLabelWidth">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserSubmit('editForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getUserList, changeUserState, addUser, getUserById, editUser } from '@/api';
export default {
    data () {
        return {
            userList: [],
            pagenum: 1,
            pagesize: 4,
            total: 0,
            searchVal: '',
            addFormVisible: false,
            editFormVisible: false,
            addForm: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            editForm: {
                username: '',
                email: '',
                mobile: '',
                id: 0
            },
            formLabelWidth: '100px',
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
                ],
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur,change" }
                ],
                mobile: [
                    { required: true, message: "请输入电话号码", trigger: "blur" },
                    { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
                ]
            }
            
        }
    },
    mounted() {
        // 页面一加载，调用渲染数据列表的方法
        this.renderList()
    },
    methods: {
        renderList() {
            let params = {
                params: {
                    // 页面一加载,this.searchVal为空
                    query: this.searchVal,
                    pagenum: this.pagenum,
                    pagesize: this.pagesize
                }
            }
            getUserList(params).then(res => {
                // console.log(res)
                if(res.meta.status === 200) {
                    this.userList = res.data.users
                    this.total = res.data.total
                }
            })
        },
        queryUser() {
            // 当用户输入关键词后，调用查询数据的方法
            this.renderList()
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pagesize = val
            this.renderList()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.pagenum = val
            this.renderList()
        },
        changeState(row) {
            // console.log(row)
            changeUserState({
                uid: row.id,
                type: row.mg_state
            }).then(res => {
                // console.log(res)
                if(res.meta.status === 200) {
                    this.$message({
                        type: 'success',
                        message: res.meta.msg
                    })
                }else {
                    this.$message({
                        type: 'error',
                        message: res.meta.msg
                    })
                }
            })
        },
        // 添加用户
        addUserSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    addUser(this.addForm).then(res => {
                        if(res.meta.status === 201) {
                            this.$message({
                                message: res.meta.msg,
                                type: 'success'
                            })
                            this.addFormVisible = false
                            this.renderList()
                        }
                    })
                }
            })
        },
        // 展示编辑对话框
        showEditDialog(row) {
            console.log(row)
            // this.editFormVisible = true
            /* this.editForm =  {
                username: row.username,
                email: row.email,
                mobile: row.mobile
            } */
            getUserById(row.id).then(res => {
                console.log(res)
                this.editFormVisible = true
                if(res.meta.status === 200) {
                    this.editForm =  {
                        username: res.data.username,
                        email: res.data.email,
                        mobile: res.data.mobile,
                        id: res.data.id
                    }
                }
            })
        },
        // 编辑用户信息提交
        editUserSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    editUser(this.editForm).then(res => {
                        console.log(res)
                        if(res.meta.status === 200) {
                            this.editFormVisible = false
                            this.$message({
                                type: "success",
                                message: res.meta.msg
                            })
                            this.renderList()
                        }

                    })
                }
            })
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
    background-color: #d3dce6;
  }
}
</style>


