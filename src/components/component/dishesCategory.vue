<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">菜品分类</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="2" style="margin-bottom: 15px">
          <el-button type="primary" @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col>

        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              align="center"
              prop="id"
              label="序号"
            ></el-table-column>
            <el-table-column align="center" prop="name" label="分类名">
            </el-table-column>
            <el-table-column align="center" prop="description" label="分类描述">
            </el-table-column>
            <el-table-column align="center" prop="sort" label="分类排序">
            </el-table-column>
            <el-table-column align="center" prop="address" label="编辑">
              <template slot-scope="scope">
                 <el-button
                  @click="editCategory(scope.row)"
                  size="small"
                  type="primary"
                  >编辑</el-button
                >
                <el-button type="danger" size="small" @click="delIt(scope.row)"
                  >删除</el-button
                >
               
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-container>

    <!-- 添加上传弹窗 -->
    <el-dialog title="分类添加" :visible.sync="dialogVisible" width="35%">
      <el-form :model="categoryData" :rules="rules" ref="categoryData">
        <div>
          <div style="margin: 15px">
                <el-form-item label="分类名" prop="name" style="width: 250px">
                  <el-input
                    size="small"
                    style="width: 150px"
                    placeholder="分类名"
                    v-model="categoryData.name"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="排序" style="width: 250px">
                  <el-input-number
                          v-model="categoryData.sort"
                          controls-position="right"
                          style="width: 150px"
                          size="small"
                          :min="1"
                        ></el-input-number>
                </el-form-item>
          </div>

          <div class="demo-input-suffix" style="margin: 15px">
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :rows="3"
                size="small"
                style="width: 380px"
                placeholder="描述"
                v-model="categoryData.description"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUp('categoryData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="35%">
      <el-form :model="editData" :rules="rules" ref="editData">
        <div>
          <div style="margin: 15px">
                <el-form-item label="分类名" prop="name" style="width: 250px">
                  <el-input
                    size="small"
                    style="width: 150px"
                    placeholder="分类名"
                    v-model="editData.name"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="排序" style="width: 250px">
                  <el-input-number
                          v-model="editData.sort"
                          controls-position="right"
                          style="width: 150px"
                          size="small"
                          :min="1"
                        ></el-input-number>
                </el-form-item>
          </div>

          <div class="demo-input-suffix" style="margin: 15px">
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :rows="3"
                size="small"
                style="width: 380px"
                placeholder="描述"
                v-model="editData.description"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="editUp('editData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSort,
  deleteCategory,
  updateCategory,
  createCategory
} from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      merchantId:"",
      fileList: [],
      categoryData: { merchantId: "", name: "", description: "", sort: 999 },
      editData: {},
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
      rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
          ],
          sort: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
      }
    };
  },
  methods: {
    //编辑问答
    editCategory(val) {
      this.dialogVisible1 = true;
      this.editData = JSON.parse(JSON.stringify(val));
    },
    //问答编辑提交
    editUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parme = JSON.parse(JSON.stringify(this.editData));
          updateCategory(parme).then(res=>{
            this.getData();
            this.dialogVisible1 = false;
            this.$message({ type: "success", message: "修改成功" });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //初始化数据
    getData() {
      let parme = {
        merchant_id:this.merchantId,
      };
      getSort(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.tableData = data;
        }
      });
    },
    //执行删除操作
    delIt(val) {
      deleteCategory(val.id).then(res=>{
        if (res.data.retcode === 0) {
            this.$message({type:"success",message:"删除成功"})
            this.getData();
        }
      })
    },
    //添加上传操作
    addUp(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parme = JSON.parse(JSON.stringify(this.categoryData));
          parme.merchantId=this.merchantId;
          createCategory(parme).then(res=>{
            if (res.retcode === 0) {
              this.getData();
              this.$message({type:"success",message:"添加成功"})
            }
            this.dialogVisible = false;
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {
    this.merchantId=Number(localStorage.getItem("merchantId"))
    this.getData();
  },
};
</script>


<style scoped lang="less">
/deep/.el-header {
  margin-top: 30px;
  padding: 0px;
}
.titleMsg {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
}
</style>
