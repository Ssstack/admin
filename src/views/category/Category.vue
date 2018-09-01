<template>
  <div class="category">
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
        <el-button type="primary" plain @click="addCategory">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
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
    <!-- 添加分类对话框 -->
    <el-dialog title="用户信息" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :label-width="formLabelWidth">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" prop="">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            :props="props"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入treeGrid功能组件
import TreeGrid from "@/components/TreeGrid/TreeGrid";
import { getGoodList } from "@/api";
export default {
  data() {
    return {
      addFormVisible: false,
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      pagenum: 1,
      pagesize: 8,
      total: 0,
      addForm: {
        cat_nam: ""
      },
      formLabelWidth: "80px",
      options: [],          // 级联选择器数据源
      selectedOptions: [],   // 级联选择器选中后的数据
      // props表示级联选择器展示的数据字段
      props: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  created() {
    this.renderGood();
  },
  components: {
    TreeGrid
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val;
      this.renderGood();
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val;
      this.renderGood();
    },
    renderGood () {
      getGoodList({
        type: "3",
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        if (res.meta.status === 200) {
          console.log(res);
          this.total = res.data.total;
          this.dataSource = res.data.result;
        }
      })
    },
    handleChange (value) {
      console.log(value);
    },
    addCategory () {
      this.addFormVisible = true;
      getGoodList({
        type: "2"
      }).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.options = res.data;
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.category {
   .page {
    padding: 5px 0 5px 10px;
    background-color: #d3dce6;
  }
}
</style>

