<template>
    <div class="rights">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <template>
                    <el-table :data="rightsList" border style="width: 100%" v-loading="loading">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="username" label="权限名称" width="180">
                        </el-table-column>
                        <el-table-column prop="email" label="路径" width="180">
                        </el-table-column>
                        <el-table-column prop="email" label="层级" width="180">
                        </el-table-column>     
                    </el-table>
                </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getRightsList } from "@/api";
export default {
  data() {
    return {
      loading: false,
      rightsList: []
    };
  },
  mounted() {
    // 页面一加载，调用渲染数据列表的方法
    this.renderRightsList();
  },
  methods: {
    renderRightsList() {
      // 加载动画
      this.loading = true;
      getRightsList({ type: "tree" }).then(res => {
        console.log(res);
        this.loading = false;
      });
    }
  }
};
</script>
<style lang="sass" scoped>

</style>
