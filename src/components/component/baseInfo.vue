<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">店铺基础信息</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col class="info" :span="23" :offset="1">
          <span>店名：</span>
          <span v-if="showContent"
            >{{ baseInfo.name }}
            <i
              class="el-icon-edit-outline curhand"
              @click="showContent = false"
            ></i
          ></span>
          <span v-else>
            <el-input
              ref="shopname"
              style="width: 450px; vertical-align: text-top"
              type="text"
              :rows="3"
              placeholder="请输入店名"
              v-model="baseInfo.name"
              autofocus
              @blur="showContent = true"
            >
            </el-input>
            <el-button
              @click.native="submitContent(1)"
              @mousedown.native="$event.preventDefault()"
              style="vertical-align: bottom"
              type="primary"
              >保存
            </el-button>
          </span>
        </el-col>
        <el-col class="info" :span="23" :offset="1">
          <p class="tip">询问机器人，店铺怎么样的时候，会触发这个介绍哦~</p>
          <span>介绍：</span>
          <span v-if="showContent1"
            >{{ baseInfo.introduction }}
            <i
              @click="showContent1 = false"
              class="el-icon-edit-outline curhand"
            ></i>
          </span>
          <span v-else>
            <el-input
              style="width: 450px; vertical-align: text-top"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="baseInfo.introduction"
              :autofocus="true"
              @blur="showContent1 = true"
            >
            </el-input>
            <el-button
              @mousedown.native="$event.preventDefault()"
              @click.native="submitContent(2)"
              style="vertical-align: bottom"
              type="primary"
              >保存
            </el-button>
          </span>
        </el-col>
        <el-col class="info" :span="23" :offset="1">
          <span>图片：</span>
          <span>
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action="#"
              :auto-upload="false"
              list-type="picture-card"
              :file-list="fileList"
              :show-file-list="true"
              :class="fileList.length >= 5 ? 'hide' : ''"
              :on-change="changeIt"
            >
              <div class="el-upload__text">
                <i class="el-icon-upload">
                  <p style="font-size: 16px">点击上传</p></i
                >
              </div>
              <!-- <i slot="default" class="el-icon-plus"></i> -->

              <div slot="file" slot-scope="{ file }">
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

                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </span>
          <el-dialog :visible.sync="dialogVisible">
            <img width="80%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
        <el-col class="info" :span="23" :offset="1">
          <span class="toleft">座位情况：</span>
          &nbsp;
          <el-button @click="newTable()" size="mini" type="primary"
            >添加</el-button
          >
          <div>
            <el-table :data="newData" style="width: 100%">
              <el-table-column prop="type" align="center" label="桌型名称">
              </el-table-column>
              <el-table-column prop="quantity" align="center" label="餐桌数量">
              </el-table-column>
              <el-table-column prop="mark" align="center" label="桌型标识">
              </el-table-column>
              <el-table-column prop="name" align="center" label="人数">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.minCapacity }}~ {{ scope.row.maxCapacity }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="description"
                align="center"
                label="桌型描述"
              >
              </el-table-column>
              <el-table-column prop="name" align="center" label="桌型状态">
                <template slot-scope="scope">
                  <div>
                    <el-switch
                      @change="changeStatu(scope.row)"
                      v-model="scope.row.status"
                    >
                    </el-switch>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="small"
                    @click="delTableType(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    @click="editTable(scope.row)"
                    size="small"
                    type="primary"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col class="info" :span="23" :offset="1">
          <span class="toleft">营业时间：</span>
          <el-col :span="5">
            <p v-for="(item, index) in baseInfo.businessHours" :key="index">
              {{ item }}
            </p>
          </el-col>
          <i class="el-icon-edit-outline curhand" @click="openTime"></i>
        </el-col>
      </el-row>
      <!-- 座位情况弹窗 -->
      <el-dialog title="桌型编辑" :visible.sync="dialogVisible1" width="35%">
        <span>
          <div>
            <el-form ref="form" inline size="small" label-width="80px">
              <div style="text-align: left">
                <el-form-item required label="桌型名称">
                  <el-select v-model="tableInfo.type" placeholder="请选择">
                    <el-option label="小桌" value="小桌"></el-option>
                    <el-option label="中桌" value="中桌"></el-option>
                    <el-option label="大桌" value="大桌"></el-option>
                    <el-option label="包间" value="包间"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required label="桌型标识">
                  <el-select v-model="tableInfo.mark" placeholder="请选择">
                    <el-option label="A" value="A"></el-option>
                    <el-option label="B" value="B"></el-option>
                    <el-option label="C" value="C"></el-option>
                    <el-option label="D" value="D"></el-option>
                    <el-option label="E" value="E"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="text-align: left">
                <el-form-item required label="餐桌数量">
                  <el-input
                    v-model="tableInfo.quantity"
                    style="width: 215px"
                  ></el-input>
                </el-form-item>
                <el-form-item required label="桌型状态">
                  <el-radio-group v-model="tableInfo.status">
                    <el-radio :label="true">启用</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div style="text-align: left">
                <el-form-item required label="容纳人数">
                  <el-input
                    v-model="tableInfo.minCapacity"
                    style="width: 215px"
                  ></el-input
                  >&emsp;至&emsp;<el-input
                    v-model="tableInfo.maxCapacity"
                    style="width: 215px"
                  ></el-input>
                </el-form-item>
              </div>
              <div style="text-align: left">
                <el-form-item required label="桌型描述">
                  <el-input
                    v-model="tableInfo.description"
                    type="textarea"
                    style="width: 500px"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitContent(4)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 运营时间弹窗 -->
      <el-dialog title="修改" :visible.sync="dialogVisible2" width="40%">
        <span>
          <div style="text-align: left">
            <el-button size="small" type="primary" @click="addData(2)"
              >新增数据</el-button
            >
          </div>
          <div
            style="margin: 15px"
            v-for="(item, index) in timeData"
            :key="index"
          >
            <span class="demo-input-suffix">
              星期：
              <el-select
                size="small"
                style="width: 100px"
                v-model="item.weekStar"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </span>
            <span class="demo-input-suffix" style="margin-right: 20px">
              至
              <el-select
                size="small"
                style="width: 100px"
                v-model="item.weekEnd"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </span>
            <span class="demo-input-suffix">
              时间：
              <el-time-select
                style="width: 120px"
                size="small"
                placeholder="起始时间"
                v-model="item.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:59'}"
              >
              </el-time-select>
              <el-time-select
                style="width: 120px"
                size="small"
                placeholder="结束时间"
                v-model="item.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:59'}"
              >
              </el-time-select>
            </span>
            <el-button
              @click="delTable(2, index)"
              style="margin-left: 10px"
              size="small"
              type="danger"
            >
              删除
            </el-button>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitContent(3)">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import {
  getBaseInfo,
  fixBaseInfo,
  getTableInfo,
  upImg,
  updataTable,
  delTable,
  creatTable,
} from "../../assets/js/api/api";
export default {
  name: "baseInfo",
  data() {
    return {
      merchantId:"",
      submitNum:"",
      fixIndex: "",
      num: "",
      addRed: [{ required: true }],
      tableInfo: {
        description: "",
        id: "",
        mark: "",
        maxCapacity: "",
        merchantId: "",
        minCapacity: "",
        quantity: "",
        status: false,
        type: "",
      },
      baseInfo: "",
      dialogVisible1: false,
      dialogVisible2: false,
      timeData: [
        {
          startTime: "",
          endTime: "",
          weekStar: "",
          weekEnd: "",

          options: [
            {
              value: "周一",
              label: "一",
            },
            {
              value: "周二",
              label: "二",
            },
            {
              value: "周三",
              label: "三",
            },
            {
              value: "周四",
              label: "四",
            },
            {
              value: "周五",
              label: "五",
            },
            {
              value: "周六",
              label: "六",
            },
            {
              value: "周日",
              label: "日",
            },
          ],
        },
      ],
      newData: [],
      preImg: "",
      dialogVisible: false,
      imageUrl: "",
      showContent: true,
      showContent1: true,
      textarea: "",
      textVal: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    //点击新增桌型
    newTable() {
      this.num = 4;
      this.tableInfo = {
        description: "",
        id: "",
        mark: "",
        maxCapacity: "",
        merchantId: this.merchantId,
        minCapacity: "",
        quantity: "",
        status: false,
        type: "",
      };
      this.dialogVisible1 = true;
    },
    //编辑桌型
    editTable(val) {
      this.num = 5;
      let data = JSON.parse(JSON.stringify(val));
      this.tableInfo = data;
      this.dialogVisible1 = true;
    },
    //删除桌型
    delTableType(val) {
      delTable(val.id).then((res) => {
        if (res.data.retcode === 0) {
          this.getData();
          this.$message({ type: "success", message: res.data.payload });
        }
      });
    },
    //桌型状态按钮
    changeStatu(val) {
      updataTable(val).then((res) => {
        if (res.data.retcode === 0) {
          // this.getData()
          this.$message({ type: "success", message: "修改成功" });
        }
      });
    },
    //页面初始化数据
    getData() {
      let parme = {
        merchant_id: this.merchantId,
      };
      getBaseInfo(parme).then((res) => {
        if (res.data.retcode === 0) {
          // let obj = new Object();
          let data = JSON.parse(res.data.payload);
          if (this.fileList.length === 0) {
          
            data.images.forEach((item, index) => {
              let obj = new Object();
              obj.url = item;
              this.fileList.push(obj);
            });
          } //图片新增操作
          else if (this.preImg.length === 0 && this.fileList.length !== 0&&this.submitNum===5) {
          
            let index = data.images.length;
             let obj = new Object();
            obj.url = data.images[index];
            this.fileList.push(obj);
          } else if(this.preImg.length !== 0){
          
            let obj = {};
            let index = this.fixIndex; //获取修改的图片位置
            obj.url = data.images[index];
            this.fileList.splice(index, 1, obj); //只替换修改位置的图片
          }
          this.baseInfo = data;
          this.preImg = "";
        }
      });

      //桌型接口单独查询
      getTableInfo(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.newData = data.records;
        }
      });
    },
    //打开运营时间窗口
    openTime() {
      //数据处理
      let data = this.baseInfo.businessHours;
      //复制上可以修改的数据项
      for (let i = 0; i < data.length; i++) {
        let copeData = {
          startTime: "",
          endTime: "",
          weekStar: "",
          weekEnd: "",
          options: [
            {
              value: "周一",
              label: "一",
            },
            {
              value: "周二",
              label: "二",
            },
            {
              value: "周三",
              label: "三",
            },
            {
              value: "周四",
              label: "四",
            },
            {
              value: "周五",
              label: "五",
            },
            {
              value: "周六",
              label: "六",
            },
            {
              value: "周日",
              label: "日",
            },
          ],
        };
        if (this.timeData.length < data.length) {
          this.timeData.push(copeData);
        }
      }
      //周 时间格式转换显示
      for (let j = 0; j < data.length; j++) {
        //周转换
        let str = data[j].split(" ");
        this.timeData[j].weekStar = str[0].slice(0, 2);
        this.timeData[j].weekEnd = str[0].slice(3, 5);
        //小时转换
        let index = str[1].indexOf("-");
        this.timeData[j].startTime = str[1].slice(0, index);
        this.timeData[j].endTime = str[1].slice(index + 1);
      }
      this.dialogVisible2 = true;
    },
    //修改弹窗新增数据：座位1 或 运营2
    addData(val) {
      let data;
      let [...option] = this.timeData[0].options;
      data = {
        startTime: "",
        endTime: "",
        weekStar: "",
        options: option,
      };
      this.timeData.push(data);
    },
    //删除 座位1 或 运营2
    delTable(val, index) {
      if (val === 1) {
        this.newData.splice(index, 1);
      } else {
        this.timeData.splice(index, 1);
      }
    },
    //修改内容保存
    submitContent(num, data) {
      this.submitNum=num
      switch (num) {
        case 1:
          this.showContent = true;
          break;
        case 2:
          this.showContent1 = true;
          break;
        case 3:
          let time = this.timeData;
          this.baseInfo.businessHours = [];
          //数据格式处理
          for (let i = 0; i < time.length; i++) {
            let data =
              time[i].weekStar +
              "到" +
              time[i].weekEnd +
              " " +
              time[i].startTime +
              "-" +
              time[i].endTime;
            this.baseInfo.businessHours.push(data);
          }
          break;
        case 4:
          //点击新增接口
          if (this.num === 4) {
            let parme = this.tableInfo;
            parme.merchantId = this.merchantId;
            creatTable(parme).then((res) => {
            
              this.getData();
              this.$message({ type: "success", message: "添加成功" });
              this.dialogVisible1 = false;
            });
          } //点击编辑接口
          else {
          
            let parme = this.tableInfo;
            updataTable(parme).then((res) => {
            
              this.getData();
              this.$message({ type: "success", message: "添加成功" });
              this.dialogVisible1 = false;
            });
          }

          break;
      }
      if (num !== 4) {
        //保存修改的图片索引
        let index = (this.fixIndex = this.baseInfo.images.indexOf(
          this.preImg.url
        ));
      
        //判断是否图片更新操作 否则为新增
        if (data) {
          this.preImg.length === 0
            ? this.baseInfo.images.push(data.imageUrl)
            : (this.baseInfo.images[index] = data.imageUrl);
        }
        let parme = JSON.parse(JSON.stringify(this.baseInfo));
        fixBaseInfo(parme).then((res) => {
          if (res.data.retcode === 0) {
            // this.$refs.upload.clearFiles();
            this.$message({ type: "success", message: "修改成功！" });
            this.getData();
            this.dialogVisible2 = false;
          }
        });
      }
    },
    //预览大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //更新图片
    updataImg(file) {
      this.preImg = file; //要替换的文件路径
      this.$refs.upload.$refs["upload-inner"].handleClick(); //调用文件上传窗口
    },
    changeIt(file, fileList) {
      this.submitNum=5
      const formData = new FormData();
      formData.append("multipartFile", file.raw);
      upImg(formData).then((res) => {
        if (res.retcode === 0) {
          let data = JSON.parse(res.payload);
          this.submitContent(1, data);
          this.$message({ type: "success", message: "上传成功" });
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


<style lang="less" scoped>
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
.info {
  text-align: left;
  margin-bottom: 30px;
  span:nth-of-type(1) {
    font-weight: 700;
  }
  span:nth-of-type(2) {
    .fixIt {
      height: 178px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p {
        color: #fff;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .tip {
    color: #ff0000;
    margin: 2px;
  }
  .tip::before {
    content: "*";
    display: inline-block;
    color: #666666;
  }
  i {
    color: #7fc6eb;
    font-size: 22px;
  }
  /deep/.avatar-uploader {
    margin-top: 15px;
    display: inline-block;
  }
  /deep/.avatar-uploader .el-upload {
    background: #666666;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    margin: 5px;
    vertical-align: text-top;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    // width: 178px;
    // height: 178px;
    // line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
