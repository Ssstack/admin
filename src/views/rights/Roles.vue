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
								<el-button size="mini" icon="el-icon-check" type="success" plain></el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import { getRoleList, deleteRoleRights } from "@/api";
export default {
  data() {
    return {
      loading: true,
      rolesList: []
    };
	},
	mounted() {
		getRoleList().then(res => {
			console.log(res.data);
			if (res.meta.status === 200) {
				this.rolesList = res.data;
			}
		})
	},
	methods: {
		deleteRights(row, rightId) {
			deleteRoleRights({roleId: row.id, rightId: rightId}).then(res => {
				if (res.meta.status === 200) {
					row.children = res.data;
				} else {
					this.$message({
						type: "error",
						message: res.meta.msg
					})
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
</style>
