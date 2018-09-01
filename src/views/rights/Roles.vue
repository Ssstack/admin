<template>
	<div class="roles">
		<el-row>
			<el-col :span="24">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>权限管理</el-breadcrumb-item>
					<el-breadcrumb-item>角色列表</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-button>添加角色</el-button>
		<el-row>
			<el-col :span="24">
				<template>
					<el-table
						border
						:data="rolesList"
						style="width: 100%">
						
						<el-table-column type="expand">
							<template slot-scope="scope">
								<el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
									<el-col :span="4">
										<el-tag @close="deleteRights(scope.row, firstChildren.id)" closable>{{ firstChildren.authName }}</el-tag>
										<i v-if="firstChildren.children.length !== 0" class="el-icon-arrow-right"></i>
									</el-col>
									<el-col :span="20">
										<el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
											<el-col :span="4">
												<el-tag @close="deleteRights(scope.row, secondChildren.id)" type="success" closable>{{ secondChildren.authName }}</el-tag>
												<i v-if="secondChildren.children.length !== 0" class="el-icon-arrow-right"></i>
											</el-col>
											<el-col :span="20">
												<el-tag @close="deleteRights(scope.row, thirdChildren.id)" type="warning" closable v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id">{{ thirdChildren.authName }}</el-tag>
											</el-col>
										</el-row>
									</el-col>
								</el-row>
								<el-row v-if="scope.row.children.length === 0">
									<el-col :span="24">该角色没有权限</el-col>
								</el-row>
							</template>
						</el-table-column>
						<el-table-column
							label="角色名称"
							prop="roleName"
							width="160px">
						</el-table-column>
						<el-table-column
							label="描述"
							prop="roleDesc"
							width="135px">
						</el-table-column>
						<el-table-column
							label="操作">
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-edit" type="primary" plain></el-button>
								<el-button size="mini" icon="el-icon-delete" type="danger" plain></el-button>
								<el-button size="mini" icon="el-icon-check" type="success" plain @click="showDialog(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-col>
		</el-row>
		<!-- 展示授权对话框 -->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<div class="tree-con">
				<el-tree
					ref="tree"
					:default-expand-all="true"
					:data="rightsList"
					show-checkbox
					node-key="id"
					:default-checked-keys="selectRights"
					:props="defaultProps">
				</el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="grantSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { getRoleList, deleteRoleRights, getRightsList, grantRight } from "@/api";
export default {
  data() {
    return {
      loading: true,
			rolesList: [],
			dialogFormVisible: false,
			formLabelWidth: "200px",
			rightsList: [],
			defaultProps: {
				children: "children",
				label: "authName"
			},
			selectRights: [],
			currentRole: {}
    };
  },
  created() {
    this.initList();
  },
  methods: {
		initList() {
			getRoleList().then(res => {
				console.log(res.data);
				if (res.meta.status === 200) {
					this.rolesList = res.data;
				}
			});
		},
    deleteRights(row, rightId) {
      deleteRoleRights({ roleId: row.id, rightId: rightId }).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.meta.msg
          });
        }
      });
		},
		showDialog(row) {
			this.dialogFormVisible = true;
			this.currentRole = row;
			getRightsList({type: "tree"}).then(res => {
				console.log(res.data);
				if (res.meta.status === 200) {
					this.rightsList = res.data;
				} else {
					this.$message({
						type: "error",
						message: res.meta.msg
					})
				}
			});
			// 遍历之前，清空数组
			this.selectRights.length = 0;
			// 取出当前点击角色的所有权限，然后遍历到它的第三个children，取出它里面所有项的id，放进selectRights中
			this.currentRole.children.forEach(first => {
				if (first.children && first.children !== 0) {
					first.children.forEach(second => {
						if (second.children && second.children.length !== 0) {
							second.children.forEach(third => {
								this.selectRights.push(third.id);
							})
						}
					})
				}
			})
		},
		grantSubmit () {
			let rids = this.$refs.tree.getCheckedKeys().join(",");
			grantRight(this.currentRole.id, {rids: rids}).then(res => {
				if (res.meta.status === 200) {
					this.$message({
						type: "success",
						message: res.meta.msg
					})
					this.dialogFormVisible = false;
					this.initList();
				}
			})
		}
  }
};
</script>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.roles {
  .el-tag {
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
.tree-con {
	height: 300px;
	overflow: auto;
}
</style>
