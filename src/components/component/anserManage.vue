<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">问答管理</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="2" :offset="1"  style="margin-bottom: 15px">
          <el-button type="primary" style="width:100%" @click="openDialog('add')"
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
            <el-table-column align="center" prop="image" label="图片">
              <template slot-scope="scope">
                <el-image
                  style="width: 80px; height: 80px; margin: 0 auto"
                  :src="scope.row.imgSrc"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column align="center" label="启用状态">
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
    <el-dialog title="添加" :visible.sync="dialogVisible" @close='cancel()' width="35%" >
      <el-row  style="text-align: left">
        <el-col  :span="10" style="margin: 15px" >
          <el-row>
            <el-col>
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
                </span>
              </span>
            </el-col>
            <el-col style="margin-top: 25px;">
               <span
                 class="demo-input-suffix addRedStar"
                 style=" width: 120px"
               >启用状态
                <el-radio-group v-model="answerData.enable">
                  <el-radio :label="true">开启</el-radio>
                  <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
              </span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :offset="1" :span="11" style="text-align: left">
              <span style="margin-bottom: 15px">
                <span style="vertical-align: top">图片：</span>
                <el-upload
                  ref="upload"
                  :on-change="changeImg"
                  :class="urlList.length >= 1 ? 'hideUpload' : ''"
                  :file-list="urlList"
                  style="display: inline-block"
                  action="#"
                  :auto-upload="false"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus"></i>
                  <div
                    style="display: inline"
                    slot="file"
                    slot-scope="{ file }"
                    class="upload"
                  >
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-delete"
                        @click="updataImg(file)"
                      >
                        <i class="el-icon-edit-outline"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </span>
        </el-col>
        <el-col  class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
            >问题</span
          >
          <el-input
            :rows="3"
            size="small"
            style="width: 80%"
            placeholder="问题"
            v-model="answerData.question"
          >
          </el-input>
        </el-col>
        <el-col class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
            >回答</span
          >
          <el-input
            size="small"
            type="textarea"
            :rows="3"
            style="width: 80%"
            placeholder="回答"
            v-model="answerData.reply"
          >
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addUp()">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 编辑问答弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1"  @close='cancel()'width="40%">
      <el-row  style="text-align: left">
        <el-col  :span="10" style="margin: 15px" >
          <el-row>
            <el-col>
              <span class="demo-input-suffix addRedStar">问题类型
                <span style="width: 350px">
                  <el-select
                    v-model="editData.type"
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
                </span>
              </span>
            </el-col>
            <el-col style="margin-top: 25px;">
               <span
                 class="demo-input-suffix addRedStar"
                 style=" width: 120px"
               >启用状态
                <el-radio-group v-model="editData.enable">
                  <el-radio :label="true">开启</el-radio>
                  <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
              </span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :offset="1" :span="11" style="text-align: left">
              <span style="margin-bottom: 15px">
                <span style="vertical-align: top">图片：</span>
                <el-upload
                  ref="upload"
                  :on-change="changeImg"
                  :class="urlList.length >= 1 ? 'hideUpload' : ''"
                  :file-list="urlList"
                  style="display: inline-block"
                  action="#"
                  :auto-upload="false"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus"></i>
                  <div
                    style="display: inline"
                    slot="file"
                    slot-scope="{ file }"
                    class="upload"
                  >
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-delete"
                        @click="updataImg(file)"
                      >
                        <i class="el-icon-edit-outline"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </span>
        </el-col>
        <el-col  class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
          >问题</span
          >
          <el-input
            type="textarea"
            :rows="3"
            size="small"
            style="width: 80%"
            placeholder="问题"
            v-model="editData.question"
          >
          </el-input>
        </el-col>
        <el-col class="demo-input-suffix" style="margin: 15px">
          <span
            style="vertical-align: top"
            class="addRedStar"
          >回答</span
          >
          <el-input
            size="small"
            type="textarea"
            :rows="3"
            style="width: 80%"
            placeholder="回答"
            v-model="editData.reply"
          >
          </el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
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
  upImg,
} from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      showUpload: true,
      merchantId:"",
      fileList: [],
      urlList: [],
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
    openDialog(flag,data){

      if(flag==='add'){
        this.urlList=[];
        this.dialogVisible = true;
      }

    },
    //编辑问答
    editAnwser(val) {
      let obj = new Object();
      obj.url = val.imgSrc;
      this.urlList=[]
      this.urlList.push(obj);
      this.editData = JSON.parse(JSON.stringify(val));
      this.editData.question = val.question.join("、");
      this.dialogVisible1 = true;

    },
    //问答编辑提交
    editUp() {
      let parme = JSON.parse(JSON.stringify(this.editData));
      parme.question = parme.question.split("、");
      if(this.urlList.length>0)parme.imgSrc = this.urlList[0].url;
      updateAnwser(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.getData();
          this.dialogVisible1 = false;
          this.$message({ type: "success", message: "修改成功" });
        }
      });
    },
    cancel() {
      this.urlList = [];
      this.dialogVisible = false;
      this.dialogVisible1 = false;
      this.answerData= { reply: "", question: "", type: "", enable: false };
      this.editData= {}
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
      const statusMSG = !val.enable?"禁用":"启用";
      this.$confirm("此操作将<span style='color: red'>"+statusMSG+"</span>"+val.type+", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        type: "warning",
      })
        .then(() => {
          updateAnwser(val).then((res) => {
            if (res.data.retcode === 0) {
              this.getData();
              this.$message({ type: "success", message: "修改成功！" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"+statusMSG,
          });
          val.enable=!val.enable;
        });


    },
    //执行删除操作
    delIt(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAnwser(val.id).then((res) => {
            if (res.data.retcode === 0) {
              this.getData();
              this.$message({type:"success",message:"删除成功"})
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //添加上传操作
    addUp() {
      let parme = JSON.parse(JSON.stringify(this.answerData));
      parme.question = parme.question.split("、");
      parme.merchantId=this.merchantId;
      if(this.urlList.length>0)parme.imgSrc = this.urlList[0].url;
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
    //更新图片
    updataImg(file) {
      this.$refs.upload.$refs["upload-inner"].handleClick(); //调用文件上传窗口

    },
    //图片上传
    changeImg(file, fileList) {
      this.showUpload = false;
      const formData = new FormData();
      formData.append("multipartFile", file.raw);
      upImg(formData).then((res) => {
        if (res.retcode === 0) {
          let data = JSON.parse(res.payload);
          //只显示一张图片 先替换
          // if (this.urlList.length !== 0) {
          let obj = new Object();
          obj.url = data.imageUrl;
          this.urlList=[obj];
          // }
          this.$message({ type: "success", message: "上传成功" });
        }
      });
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
    this.merchantId=String(localStorage.getItem("merchantId"))
    this.getData();
  },
};
</script>
<style scoped lang="less">
  .hideUpload  /deep/ div{
    display: none;
  }
/deep/.el-header {
  margin-top: 30px;
  padding: 0px;
}
.titleMsg {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
}
/deep/.el-upload--picture-card {
  width: 128px;
  height: 128px;
  line-height: 128px;
}
</style>
