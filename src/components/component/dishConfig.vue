<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">菜品配置</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="2" :offset="1" style="margin-bottom: 15px">
          <el-button style="width: 100%;" type="primary" @click="handleClick('add')">添加</el-button>
        </el-col>

        <el-col :span="23"  :offset="1">
          <el-table :data="tableData"  border style="width: 100%;">
            <el-table-column
              align="center"
              prop="name"
              label="菜品名"
            ></el-table-column>
            <el-table-column align="center" label="别名">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.alias.join("、") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="菜品图片">
              <template slot-scope="scope">
                <el-image
                  v-for="(item, index) in scope.row.pictures"
                  :key="index"
                  style="width: 80px; height: 80px; margin: 0 auto"
                  :src="item"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column align="center" label="菜品口味">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.dishesTaste.join("、") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="price" label="价格">
            </el-table-column>
            <el-table-column align="center" prop="category" label="菜单分类">
            </el-table-column>
            <el-table-column align="center" prop="description" label="菜品描述">
            </el-table-column>
            <el-table-column align="center" label="星级">
              <template slot-scope="scope">
                <el-rate
                  style="display: inline"
                  disabled
                  v-model="scope.row.star"
                >
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="招牌菜"
              width="80"
            >
              <template slot-scope="scope">
                <el-switch
                  @change="changeItBtn(scope.row)"
                  v-model="scope.row.hot"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="新品" width="65">
              <template slot-scope="scope">
                <el-switch
                  @change="changeItBtn(scope.row)"
                  v-model="scope.row.isNew"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="编辑"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleClick('edit', scope.row)"
                  >编辑</el-button
                >
                <el-button @click="delIt(scope.row)" size="small" type="danger"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
        <div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            &emsp;菜品名：
            <el-input
              style="width: 350px"
              size="small"
              placeholder="请输入菜品名"
              v-model="dialogData.inputDishName"
            >
            </el-input>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            &emsp;&emsp;别名：
            <el-input
              style="width: 350px"
              size="small"
              placeholder="请输入别名"
              v-model="dialogData.inputAlias"
            >
            </el-input>
          </div>
          <div style="margin-bottom: 15px">
            <span style="vertical-align: top">&emsp;&emsp;图片：</span>
            <div
              class="demo-image__preview"
              style="width: 350px; display: inline-block; text-align: left"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="dialogData.url"
                :preview-src-list="srcList"
              >
              </el-image>
            </div>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            &emsp;&emsp;口味：
            <el-input
              style="width: 350px"
              size="small"
              placeholder="请输入口味"
              v-model="dialogData.inputFlavor"
            >
            </el-input>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            &emsp;&emsp;描述：
            <el-input
              style="width: 350px"
              size="small"
              placeholder="输入描述"
              v-model="dialogData.inputDescribe"
            >
            </el-input>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            推荐指数：
            <el-select
              v-model="dialogData.seletIndex"
              placeholder="请选择"
              style="width: 350px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            是否招牌菜：
            <span style="width: 350px; display: inline-block; text-align: left">
              <el-radio v-model="dialogData.radioSign" label="1">是</el-radio>
              <el-radio v-model="dialogData.radioSign" label="2">否</el-radio>
            </span>
          </div>
          <div class="demo-input-suffix" style="margin-bottom: 15px">
            是否新品：
            <span style="width: 350px; display: inline-block; text-align: left">
              <el-radio v-model="dialogData.radioNew" label="1">是</el-radio>
              <el-radio v-model="dialogData.radioNew" label="2">否</el-radio>
            </span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog> -->
      <!-- 图片放大 -->
      <!-- <el-dialog :visible.sync="isShow">
        <img width="80%" :src="dialogImageUrl" alt />
      </el-dialog> -->
      <el-dialog
        :before-close="closeIt"
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-row  style="text-align: left">
          <div>

            <el-col :span="12" >
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                菜品名称
                <el-input
                  style="width: 150px"
                  size="small"
                  placeholder="请输入菜品名称"
                  v-model="dialogData.name"
                >
                </el-input>
              </div>
              <div class="demo-input-suffix" style="margin-bottom: 15px">
                <el-col  :span="24" >
                  <div
                    style="margin-bottom: 5px;text-align: left; font-size: 10px;margin-left: 5%;color:red"
                  >*多种菜谱别名以"、"分隔</div>
                </el-col>
                &nbsp;&nbsp;&nbsp;菜品别名
                <el-input
                  style="width: 150px"
                  size="small"
                  placeholder="请输入菜品名"
                  v-model="dialogData.alias"
                >
                </el-input>
              </div>
              <div
                class="demo-input-suffix addRedStar"
                style="margin-bottom: 15px"
              >
                &emsp;&emsp;价格
                <el-input
                  style="width: 150px"
                  size="small"
                  placeholder="请输入价格"
                  v-model="dialogData.price"
                >
                </el-input>
              </div>
            </el-col>
            <el-col :span="12" >
              <el-col :span="24" >
                <div
                  style="margin-bottom: 5px;text-align: left; font-size: 10px;margin-left: 5%;color:red"
                >*图片请上传长宽比为 4:3 的图片</div>
              </el-col>
              <span style="margin-bottom: 15px">
                <span style="vertical-align: top">&nbsp;&nbsp;&nbsp;图片</span>
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
              <el-col :span="12">
                <div
                  class="demo-input-suffix addRedStar"
                  style="margin-bottom: 15px"
                >
                  菜单分类
                  <el-select
                    v-model="dialogData.categoryId"
                    size="small"
                    style="width: 150px"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sortOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <el-col :span="24" >
                  <div
                    style="margin-bottom: 5px;text-align: left; font-size: 10px;margin-left: 5%;color:red"
                  >*多种口味以"、"分隔</div>
                </el-col>
                <div
                  class="demo-input-suffix addRedStar"
                  style="margin-bottom: 15px"
                >
                  口味
                  <el-input
                    style="width: 150px"
                    size="small"
                    placeholder="请输入口味"
                    v-model="dialogData.dishesTaste"
                  >
                  </el-input>
                </div>
              </el-col>
            </el-col>

            <el-col>
              <el-col :span="24">
                <div class="demo-input-suffix" style="margin-bottom: 15px">
                  &nbsp;&nbsp;&nbsp;推荐星级
                  <el-select
                    v-model="dialogData.star"
                    size="small"
                    style="width: 150px"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in starOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-rate
                    style="display: inline"
                    disabled
                    v-model="dialogData.star"
                  ></el-rate>
                </div>
              </el-col>
              <!-- <el-col :span="12">
                <div class="demo-input-suffix" style="margin-bottom: 15px">
                  是否招牌菜
                  <el-radio-group v-model="dialogData.hot" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col> -->
            </el-col>
            <el-col>
              <!-- <el-col :span="12">
                <div class="demo-input-suffix" style="margin-bottom: 15px">
                  是否热门&emsp;&emsp;&emsp;
                  <el-radio-group v-model="dialogData.isNew" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col> -->
              <el-col :span="12">
                <div class="demo-input-suffix" style="margin-bottom: 15px">
                  &nbsp;&nbsp;&nbsp;是否新品&emsp;&emsp;
                  <el-radio-group v-model="dialogData.isNew" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="demo-input-suffix" style="margin-bottom: 15px">
                  是否招牌菜
                  <el-radio-group v-model="dialogData.hot" size="small">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-col>
            <el-col>
              <div
                class="demo-input-suffix"
                style="margin-bottom: 15px; text-align: left;"
              >
                <span style="vertical-align: top">&nbsp;&nbsp;&nbsp;菜品描述</span>
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width: 350px"
                  size="small"
                  placeholder="输入描述"
                  v-model="dialogData.description"
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
  getSort,
  getDishes,
  createDishes,
  upImg,
  updataDishes,
  delDishes,
} from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      merchantId:"",
      sortOption: [],
      starOption: [
        {
          value: 1,
          label: "1",
        },
        {
          value: 2,
          label: "2",
        },
        {
          value: 3,
          label: "3",
        },
        {
          value: 4,
          label: "4",
        },
        {
          value: 5,
          label: "5",
        },
      ],
      urlList: [],
      isShow: false,
      url: "",
      title: "",
      options: [],
      srcList: [],
      dialogVisible: false,
      dialogData: {
        inputDishName: "",
        inputAlias: "",
        inputFlavor: "",
        url: "",
        inputDescribe: "",
        seletIndex: "",
        radioSign: "2",
        radioNew: "2",
      },
      multipleSelection: [],
      tableData: [],
      currentPage:1,
      pageSize:10,
      totalRecord:0
    };
  },
  methods: {
    //获取菜单分类
    getSortMean() {
      let parme = {
        merchant_id: this.merchantId,
      };
      getSort(parme).then((res) => {
        let data = JSON.parse(res.data.payload);
        this.sortOption = data;

      });
    },
    //编辑图片
    updataImg() {
      this.$refs.upload.$refs["upload-inner"].handleClick();
    },
    //取消按钮
    cancel() {
      this.urlList = [];
      this.dialogVisible = false;
    },
    //弹窗关闭回调
    closeIt() {
      this.urlList = [];
      this.dialogVisible = false;
    },
    //确定提交添加按钮
    isOk() {

      let data = JSON.parse(JSON.stringify(this.dialogData));
      if (!data.name) {
        this.$message({ type: "warning", message: "菜品名称不能为空" });
        return;
      }
      if (!data.price) {
        this.$message({ type: "warning", message: "价格不能为空" });
        return;
      }
      if (!data.price) {
        this.$message({ type: "warning", message: "价格不能为空" });
        return;
      }
      if (!data.categoryId) {
        this.$message({ type: "warning", message: "菜单分类不能为空" });
        return;
      }
      if (!data.dishesTaste) {
        this.$message({ type: "warning", message: "口味不能为空" });
        return;
      }

      //提交格式处理
      data.alias = data.alias.split("、");
      data.dishesTaste = data.dishesTaste.split("、");
      //图片上传格式处理
      if (this.urlList.length != 0) {
        data.pictures[0] = this.urlList[0].url;
      }
      //菜单分类查询选择
      this.sortOption.forEach((element) => {
        if (element.id === data.categoryId) {
          data.category = element.name;
        }
      });
      //提交弹窗添加按钮
      if (this.title === "添加") {
        createDishes(data).then((res) => {
          if (res.retcode === 0) {
            this.getData();
            this.$message({ type: "success", message: "修改成功" });
          }
        });
      } else {
        updataDishes(data).then((res) => {
          if (res.data.retcode === 0) {
            this.getData();
            this.$message({ type: "success", message: "修改成功" });
          }
        });
      }
      this.urlList = [];
      this.dialogVisible = false;
    },
    //图片上传
    changeIt(file, fileList) {
      const formData = new FormData();
      formData.append("multipartFile", file.raw);
      upImg(formData).then((res) => {
        if (res.retcode === 0) {
          let data = JSON.parse(res.payload);
          //只显示一张图片 先替换
          let obj = new Object();
          obj.url = data.imageUrl;
          this.urlList.splice(0, 1, obj);
          this.$message({ type: "success", message: "上传成功" });
        }
      });
    },
    //关闭或开启按钮
    changeItBtn(data) {
      updataDishes(data).then((res) => {
        if (res.data.retcode === 0) {
          this.getData();
          this.$message({ type: "success", message: "修改成功" });
        }
      });
    },
    //页面数据初始化
    getData() {
      let parme = {
        merchant_id: this.merchantId,
        page_index: this.currentPage,
        page_size: this.pageSize
      };
      getDishes(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.tableData = data.records
          this.totalRecord = data.total
        }
      });
    },
    //添加或修改操作
    handleClick(val, item) {
      if (val === "add") {
        this.title = "添加";
        this.dialogData = {
          alias: "",
          category: "",
          categoryId: "",
          merchantId: this.merchantId,
          name: "",
          hot: false,
          dishesTaste: "",
          description: "",
          isNew: false,
          pictures: [],
          price: "",
          star: "",
        };
        this.dialogVisible = true;
      } else {
        this.title = "编辑";
        let data = JSON.parse(JSON.stringify(item));
        //菜品别名显示处理
        data.alias = data.alias.join("、");
        //口味显示处理
        data.dishesTaste = data.dishesTaste.join("、");
        //图片显示格式处理
        data.pictures.forEach((element, index) => {
          let obj = new Object();
          obj.url = element;

          this.urlList.push(obj);
        });
        this.dialogData = data;

        this.dialogVisible = true;
      }
    },
    //删除操作
    delIt(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDishes(val.id).then((res) => {
            if (res.data.retcode === 0) {
              this.$message({ type: "success", message: "删除成功！" });
              this.getData();
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
    this.merchantId =Number(localStorage.getItem("merchantId"))
    this.getData();
    this.getSortMean();
  },
};
</script>


<<style scoped lang="less">
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
