<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">主页功能按钮配置</el-col>
    </el-header>
    <el-container>
      <!-- <el-row> -->
      <!-- <el-col :span="2" style="margin-bottom: 15px">
          <el-button type="primary" @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col> -->

      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="按钮名称"
          ></el-table-column>
          <!-- <el-table-column align="center" prop="id" label="按钮id">
            </el-table-column> -->
          <el-table-column
            align="center"
            prop="simulationString"
            label="模拟话术"
          >
          </el-table-column>

          <el-table-column align="center" prop="description" label="按钮描述">
          </el-table-column>
          <el-table-column align="center" label="按钮状态">
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
          <!-- <el-table-column align="center" prop="reply" label="创建时间">
            </el-table-column> -->
          <!-- <el-table-column align="center" prop="address" label="编辑">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="delIt(scope.row)"
                  >删除</el-button
                >
                <el-button
                  @click="editAnwser(scope.row)"
                  size="small"
                  type="primary"
                  >编辑</el-button
                >
              </template>
            </el-table-column> -->
        </el-table>
      </el-col>
      <!-- </el-row> -->
    </el-container>

    <!-- 添加上传弹窗 -->
    <!-- <el-dialog title="添加上传" :visible.sync="dialogVisible" width="40%">
      <span>
        <div
          v-for="(item, index) in answerData"
          :key="index"
          style="margin: 15px"
        >
          <span class="demo-input-suffix">
            问题类型
            <el-input
              size="small"
              style="width: 100px"
              placeholder="问题类型"
              v-model="item.questionType"
            >
            </el-input>
          </span>
          <span class="demo-input-suffix">
            &emsp;&emsp;问题
            <el-input
              size="small"
              style="width: 150px"
              placeholder="问题"
              v-model="item.question"
            >
            </el-input>
          </span>
          <span class="demo-input-suffix">
            &emsp;&emsp;回答
            <el-input
              size="small"
              style="width: 150px"
              placeholder="回答"
              v-model="item.answer"
            >
            </el-input>
          </span>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUp()">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 编辑问答弹窗 -->
    <!-- <el-dialog title="编辑" :visible.sync="dialogVisible1" width="40%">
      <span>
        <div>
          <span class="demo-input-suffix">
            问题类型
            <el-input
              size="small"
              style="width: 100px"
              placeholder="问题类型"
              v-model="editData.type"
            >
            </el-input>
          </span>
          <span class="demo-input-suffix">
            &emsp;&emsp;问题
            <el-input
              size="small"
              style="width: 150px"
              placeholder="问题"
              v-model="editData.question"
            >
            </el-input>
          </span>
          <span class="demo-input-suffix">
            &emsp;&emsp;回答
            <el-input
              size="small"
              style="width: 150px"
              placeholder="回答"
              v-model="editData.reply"
            >
            </el-input>
          </span>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editUp()">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { queryButton, updataButton } from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      merchantId: "",
      fileList: [],
      answerData: [{ reply: "", question: "", type: "" }],
      editData: {},
      dialogVisible: false,
      dialogVisible1: false,
      tableData: [],
    };
  },
  methods: {
    //编辑问答
    editAnwser(val) {},
    //问答编辑提交
    editUp() {},
    //初始化数据
    getData() {
      let parme = {
        merchant_id: this.merchantId,
      };
      queryButton(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.tableData = data;
         
        }
      });
    },
    //按钮状态修改
    changeIt(val) {
      let functionButton = val;
      updataButton(functionButton).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message: "修改成功！" });
          this.getData();
        }
      });
    },
    //执行删除操作
    delIt(val) {},
    //添加上传操作
    addUp() {},
    //添加上传 删除操作
    delItem(index) {},
    //新增数据操作
    addData() {},
  },
  mounted() {
    this.merchantId = Number(localStorage.getItem("merchantId"));
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
