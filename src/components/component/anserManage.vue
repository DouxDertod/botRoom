<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">问答管理</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="2" :offset="1"  style="margin-bottom: 15px">
          <el-button type="primary" style="width:100%" @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col>

        <el-col :span="23" :offset="1">
          <el-table :data="tableData" border style="width: 100%">
            <!--<el-table-column-->
              <!--align="center"-->
              <!--prop="id"-->
              <!--label="序号"-->
            <!--&gt;</el-table-column>-->
            <el-table-column align="center" prop="type" label="问题类型">
            </el-table-column>
            <el-table-column align="center" prop="address" label="问题">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.question.join("、") }}
                </div>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="reply" label="回答">
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <div>
                  <el-switch
                    @change="changeIt(scope.row)"
                    v-model="scope.row.enable"
                  >
                  </el-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="编辑">
              <template slot-scope="scope">
                 <el-button
                  @click="editAnwser(scope.row)"
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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecord">
      </el-pagination>
    </div>

    <!-- 添加上传弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="35%"  style="text-align: left">
      <div>
        <div  style="margin: 15px">
          <span class="demo-input-suffix addRedStar">问题类型
            <span style="width: 350px">
              <el-select
                v-model="answerData.type"
                size="small"
                style="width: 150px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in QAOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span
                class="demo-input-suffix addRedStar"
                style="margin-left: 15px; width: 120px"
              >
                状态&emsp;
                <el-radio-group v-model="answerData.enable">
                  <el-radio :label="true">开启</el-radio>
                  <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
              </span>
            </span>
          </span>
        </div>

        <div class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
            >问题</span
          >
          <el-input
            type="textarea"
            :rows="3"
            size="small"
            style="width: 380px"
            placeholder="问题"
            v-model="answerData.question"
          >
          </el-input>
        </div>
        <div class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
            >回答</span
          >
          <el-input
            size="small"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="回答"
            v-model="answerData.reply"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUp()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑问答弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="40%">
     <div>
        <div style="margin: 15px">
          <span class="demo-input-suffix addRedStar">
            问题类型
            <span style="width: 350px">
              <el-input
                size="small"
                style="width: 150px"
                placeholder="问题类型"
                v-model="editData.type"
              >
              </el-input>
              <span
                class="demo-input-suffix addRedStar"
                style="margin-left: 15px; width: 120px"
              >
                状态&emsp;
                <el-radio-group v-model="editData.enable">
                  <el-radio :label="true">开启</el-radio>
                  <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
              </span>
            </span>
          </span>
        </div>

        <div class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top; margin-left: 55px"
            class="addRedStar"
            >问题</span
          >
          <el-input
            type="textarea"
            :rows="3"
            size="small"
            style="width: 380px"
            placeholder="问题"
            v-model="editData.question"
          >
          </el-input>
        </div>
        <div class="demo-input-suffix">
          <span
            style="vertical-align: top; margin-left: 55px"
            class="addRedStar"
            >回答</span
          >
          <el-input
            size="small"
            type="textarea"
            :rows="3"
            style="width: 380px"
            placeholder="回答"
            v-model="editData.reply"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editUp()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryAnwser,
  createAnwser,
  updateAnwser,
  delAnwser,
} from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      merchantId:"",
      fileList: [],
      QAOption: [
        {
          value: "设施问题",
          label: "设施问题",
        },
        {
          value: "菜品问题",
          label: "菜品问题",
        },
        {
          value: "活动问题",
          label: "活动问题",
        }
      ],
      answerData: { reply: "", question: "", type: "", enable: false },
      editData: {},
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
      currentPage:1,
      pageSize:10,
      totalRecord:0
    };
  },
  methods: {
    //编辑问答
    editAnwser(val) {
      this.dialogVisible1 = true;
      this.editData = JSON.parse(JSON.stringify(val));
      this.editData.question = val.question.join("、");
    },
    //问答编辑提交
    editUp() {
      let parme = JSON.parse(JSON.stringify(this.editData));
      parme.question = parme.question.split("、");
      updateAnwser(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.getData();
          this.dialogVisible1 = false;
          this.$message({ type: "success", message: "修改成功" });
        }
      });
    },
    //初始化数据
    getData() {
      let parme = {
        merchant_id:this.merchantId,
        page_index: this.currentPage,
        page_size: this.pageSize
      };
      queryAnwser(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.tableData = data.records;
          this.totalRecord = data.total
        }
      });
    },
    //修改按钮状态
    changeIt(val) {
      updateAnwser(val).then((res) => {
        if (res.data.retcode === 0) {
          this.getData();
          this.$message({ type: "success", message: "修改成功！" });
        }
      });
    },
    //执行删除操作
    delIt(val) {
      delAnwser(val.id).then((res) => {
        console.log(res
        )
        if (res.data.retcode === 0) {
          this.getData();
          this.$message({type:"success",message:"删除成功"})
        }
      });
    },
    //添加上传操作
    addUp() {
      let parme = JSON.parse(JSON.stringify(this.answerData));
      parme.question = parme.question.split("、");
      parme.merchantId=this.merchantId;

      createAnwser(parme).then((res) => {
        if (res.retcode === 0) {
          this.getData();
          this.$message({type:"success",message:"添加成功"})
        }
        this.dialogVisible = false;
      });
    },
    //添加上传 删除操作
    delItem(index) {
      this.answerData.splice(index, 1);
    },
    //新增数据操作
    addData() {
      let data = { answer: "", question: "", questionType: "" };
      this.answerData.push(data);
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData();
    }
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
