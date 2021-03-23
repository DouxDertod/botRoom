<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">活动配置</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="2" :offset="1" style="margin-bottom: 15px">
          <el-button style="width:100%" type="primary" @click="handleClick('add')">添加</el-button>
          <!-- <el-button @click="delIt()" type="danger">删除</el-button> -->
        </el-col>

        <el-col :span="23" :offset="1">
          <el-table :data="tableData" border style="width: 100%">
            <!-- <el-table-column type="selection" width="40"></el-table-column> -->
            <el-table-column
              align="center"
              prop="title"
              label="活动名称"
            ></el-table-column>
            <el-table-column align="center" label="活动时间" width="135">
              <template slot-scope="scope">
                <div>
                  {{ getTimeFormt(scope.row.beginTime) }}~{{
                    getTimeFormt(scope.row.endTime)
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="title" label="活动类型">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.keyword.join("、") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="活动图片">
              <template slot-scope="scope">
                <el-image
                  v-for="(item, index) in scope.row.images"
                  :key="index"
                  style="width: 100px; height: 100px"
                  :src="item"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="title" label="活动场景">
              <template slot-scope="scope">
                <div v-if="scope.row.enableQueue">客户等位时</div>
                <div v-if="scope.row.enableDraw">揽客时</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="sort"
              label="活动排序"
            ></el-table-column>
            <el-table-column align="center" prop="content" label="活动介绍">
            </el-table-column>
            <el-table-column align="center" prop="address" label="启用状态">
              <template slot-scope="scope">
                <el-switch
                  @change="changeItBtn(scope.row)"
                  v-model="scope.row.enable"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              width="150"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleClick('edit', scope.row)"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" @click="delIt(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog
        :before-close="closeIt"
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-row>
          <div>
            <el-col :span="12">
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                活动名称：
                <el-input
                  style="width: 150px"
                  size="small"
                  placeholder="请输入活动名"
                  v-model="dialogData.title"
                >
                </el-input>
              </div>
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                活动类别：
                <el-select
                  size="small"
                  style="width: 150px"
                  v-model="dialogData.keyword"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                活动排序：
                <el-input-number
                  v-model="dialogData.sort"
                  controls-position="right"
                  style="width: 150px"
                  size="small"
                  :min="1"
                ></el-input-number>
              </div>
            </el-col>
            <el-col :span="12" style="text-align: left">
              <span style="margin-bottom: 15px">
                <span style="vertical-align: top">&emsp;活动图片：</span>
                <el-upload
                  ref="upload"
                  :class="urlList.length >= 1 ? 'hide' : ''"
                  :file-list="urlList"
                  style="display: inline-block"
                  action="#"
                  :auto-upload="false"
                  list-type="picture-card"
                  :on-change="changeIt"
                >
                  <i class="el-icon-plus"></i>
                  <div
                    style="display: inline"
                    slot="file"
                    slot-scope="{ file }"
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
            <el-col>
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px; text-align: left; margin-left: 15px"
              >
                活动时间：

                <el-date-picker
                  popper-class="customPopper"
                  size="small"
                  style="width:80%"
                  v-model="valueTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                活动场景：
                <el-select
                  size="small"
                  multiple
                  style="width: 150px"
                  v-model="avtiveVaule"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in activeView"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12" style="text-align: left">
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                启用状态：
                <el-radio-group v-model="dialogData.enable" size="small">
                  <el-radio :label="true">开启</el-radio>
                  <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col>
              <div
                class="demo-input-suffix"
                style="margin-bottom: 15px; text-align: left; margin-left: 15px"
              >
                <span style="vertical-align: top">&emsp;活动介绍：</span>
                <el-input
                  type="textarea"
                  :rows="5"
                  style="width: 350px"
                  size="small"
                  placeholder="输入描述"
                  v-model="dialogData.content"
                >
                </el-input>
              </div>
            </el-col>
          </div>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="isOk()">确 定</el-button>
        </span>
      </el-dialog>
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
  </div>
</template>

<script>
import {
  getAllActive,
  creatActive,
  updataActive,
  upImg,
  delActive,
} from "../../assets/js/api/api";
import utils from "../../assets/js/utils/filter";
export default {
  name: "home",
  data() {
    return {
      merchantId: "",
      optionsType: [
        {
          value: "满减",
          label: "满减",
        },
        {
          value: "免费",
          label: "免费",
        },
        {
          value: "折扣",
          label: "折扣",
        },
        {
          value: "抽奖",
          label: "抽奖",
        },
        {
          value: "赠送",
          label: "赠送",
        },
      ],
      activeView: [
        {
          value: "enableDraw",
          label: "揽客时",
        },
        {
          value: "enableQueue",
          label: "客户等位时",
        },
      ],
      avtiveVaule: [],
      title: "",
      urlList: [],
      dialogData: {},
      valueTime: [new Date(), new Date()],
      isOpen: true,
      options: [],
      dialogVisible: false,
      multipleSelection: [],
      tableData: [],
      currentPage:1,
      pageSize:10,
      totalRecord:0
    };
  },
  methods: {
    //关闭
    closeIt() {
      this.avtiveVaule = [];
      this.urlList = [];
      this.dialogVisible = false;
    },
    //确定上传
    isOk() {
      let data = JSON.parse(JSON.stringify(this.dialogData));
      if (!data.title) {
        this.$message({ type: "warning", message: "活动名称不能为空" });
        return;
      }
      if (data.keyword.length === 0) {
        this.$message({ type: "warning", message: "活动类别不能为空" });
        return;
      }
      if (!data.sort) {
        this.$message({ type: "warning", message: "活动排序不能为空" });
        return;
      }
      if (this.valueTime.length === 0) {
        this.$message({ type: "warning", message: "活动时间不能为空" });
        return;
      }
      if (this.avtiveVaule.length === 0) {
        this.$message({ type: "warning", message: "活动场景不能为空" });
        return;
      }

      //时间上传格式处理
      data.beginTime = utils.formatDate(this.valueTime[0]);
      data.endTime = utils.formatDate(this.valueTime[1]);
      //活动场景上传格式处理
      data.enableDraw = false;
      data.enableQueue = false;
      this.avtiveVaule.forEach((element) => {
        data[element] = true;
      });
      //图片上传格式处理
      if (this.urlList.length != 0) {
        data.images[0] = this.urlList[0].url;
      }

      if (this.title === "添加") {
        creatActive(data).then((res) => {
          if (res.retcode === 0) {
            this.avtiveVaule = [];
            this.urlList = [];
            this.getData();
            this.dialogVisible = false;
            this.$message({ type: "success", message: "修改成功" });
          }
        });
      } else {
        updataActive(data).then((res) => {
          if (res.data.retcode === 0) {
            this.avtiveVaule = [];
            this.urlList = [];
            this.getData();
            this.dialogVisible = false;
            this.$message({ type: "success", message: "修改成功" });
          }
        });
      }
    },
    //图片上传
    changeIt(file, fileList) {
      const formData = new FormData();
      formData.append("multipartFile", file.raw);
      upImg(formData).then((res) => {
        if (res.retcode === 0) {
          let data = JSON.parse(res.payload);
          //只显示一张图片 先替换
          // if (this.urlList.length !== 0) {
          let obj = new Object();
          obj.url = data.imageUrl;
          this.urlList.splice(0, 1, obj);
          // }
          this.$message({ type: "success", message: "上传成功" });
        }
      });
    },
    //图片更新操作
    updataImg() {
      this.$refs.upload.$refs["upload-inner"].handleClick();
    },
    // 处理时间格式
    getTimeFormt(val) {
      let date = utils.formatDate(val, "mm-dd");
      let time = utils.formatDate(val, "hh-mm-ss");
      return date + "日" + time;
    },
    //初始化数据
    getData() {
      let parme = {
        merchant_id: this.merchantId,
        page_index: this.currentPage,
        page_size: this.pageSize
      };
      getAllActive(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.tableData = data.records
          this.totalRecord = data.total
        }
      });
    },
    //编辑取消
    cancel() {
      this.avtiveVaule = [];
      this.urlList = [];
      this.dialogVisible = false;
    },
    //点击编辑或添加弹窗
    handleClick(val, item) {
      if (val === "add") {
        this.title = "添加";
        this.valueTime = [];
        this.urlList = [];
        this.dialogData = {
          beginTime: "",
          content: "",
          enable: false,
          enableDraw: false,
          enableQueue: false,
          endTime: "",
          images: [],
          keyword: [],
          merchantId: this.merchantId,
          sort: "",
          title: "",
        };
      } else {
        this.title = "编辑";
        this.dialogData = JSON.parse(JSON.stringify(item));
        //时间显示格式处理
        this.valueTime = [
          new Date(this.dialogData.beginTime),
          new Date(this.dialogData.endTime),
        ];
        //图片显示格式处理
        let data = this.dialogData.images;
        data.forEach((element, index) => {
          let obj = new Object();
          obj.url = element;
          this.urlList.push(obj);
        });
      }
      //活动场景显示格式处理
      let activeObj = this.dialogData;
      if (activeObj.enableDraw) {
        this.avtiveVaule.push("enableDraw");
      }
      if (activeObj.enableQueue) {
        this.avtiveVaule.push("enableQueue");
      }
      this.dialogVisible = true;
    },
    //执行删除操作
    delIt(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delActive(val.id).then((res) => {
            if (res.data.retcode === 0) {
              this.getData();
              this.$message({ type: "success", message: "删除成功！" });
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
    //启用状态修改
    changeItBtn(item) {
      const statusMSG = !item.enable?"禁用":"启用";
      this.$confirm("此操作将<span style='color: red'>"+statusMSG+"</span>\""+item.title+"\"活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        type: "warning",
      })
        .then(() => {
          updataActive(item).then((res) => {
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
          item.enable=!item.enable;
        });

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
    this.merchantId = Number(localStorage.getItem("merchantId"));
    this.getData();
  },
};
</script>


<style scoped lang="less">
.hide /deep/.el-upload--picture-card {
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
