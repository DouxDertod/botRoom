<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">排队记录</el-col>
    </el-header>
    <el-container>
      <el-row>
        <el-col :span="4"  :offset="1" style="margin-bottom: 15px">
          <div class="demo-input-suffix">
            桌型：
            <el-select
              @change="getData"
              v-model="valueTable"
              style="width: 120px"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.table_id"
                :label="item.label"
                :value="item.table_id"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6" style="margin-bottom: 15px">
          <div class="demo-input-suffix">
            排队状态：
            <el-select
              @change="getData"
              v-model="valueQueue"
              style="width: 120px"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" style="margin-bottom: 15px">
          <div class="demo-input-suffix">剩余桌数：{{ numTotal }}桌</div>
        </el-col>

        <el-col :span="23" :offset="1">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              align="center"
              prop="queueNo"
              label="等位排号"
            ></el-table-column>
            <el-table-column align="center" prop="serialNumber" label="桌号">
            </el-table-column>
            <el-table-column align="center" prop="tableType" label="桌型">
            </el-table-column>

            <el-table-column align="center" prop="members" label="用餐人数">
            </el-table-column>
            <el-table-column align="center" prop="userId" label="用户人脸ID">
            </el-table-column>
            <el-table-column
              align="center"
              width="150"
              prop="queueTime"
              label="排队时间"
            >
            </el-table-column>

            <el-table-column align="center" prop="status" label="排队状态">
              <template slot-scope="scope">
                <div>
                  {{ getStatu(scope.row.status) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="操作"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  :disabled="scope.row.status === 1 || scope.row.status === -1"
                  type="primary"
                  size="small"
                  @click="changeIt(scope.row, 1)"
                  >叫号</el-button
                >
                <el-button
                  :disabled="scope.row.status === -1 || scope.row.status === 0"
                  @click="changeIt(scope.row, 2)"
                  size="small"
                  type="danger"
                  >过号</el-button
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
  </div>
</template>

<script>
import {
  callNumber,
  getTableInfo,
  queryData,
  passNumber,
} from "../../assets/js/api/api";
export default {
  name: "home",
  data() {
    return {
      merchantId: "",
      numTotal: 0,
      valueQueue: "0",
      valueTable: "",
      options: [],
      options1: [
        {
          value: "0",
          label: "排队中",
        },
        {
          value: "1",
          label: "已叫号",
        },
        {
          value: "-1",
          label: "已过号",
        },
      ],
      tableData: [],
      currentPage:1,
      pageSize:10,
      totalRecord:0
    };
  },
  methods: {
    //叫号 || 过号
    changeIt(data, type) {

      if (type === 1) {
        data.status = 1;
        callNumber(data).then((res) => {
          if (res.data.retcode === 0) {
            this.$message({ type: "success", message: "操作成功" });
            this.getData();
          }
        });
      } else {
        data.status = -1;
        passNumber(data).then((res) => {
          if (res.data.retcode === 0) {
            this.$message({ type: "success", message: "操作成功" });
            this.getData();
          }
        });
      }
    },
    //桌型查询
    getTableType() {
      let parme = {
        merchant_id: this.merchantId,
      };
      this.lock=true;
      getTableInfo(parme).then((res) => {
        let data = JSON.parse(res.data.payload);
        data.records.forEach((element) => {
          let obj = new Object();
          obj.table_id = element.id;
          obj.label = element.type;
          this.options.push(obj);
        });
        if(this.options.length>0){
          this.valueTable=this.options[0].table_id;
        }

        this.getData();
      });
    },
    //页面初始化数据||条件查询
    getData() {

      let parme = {
        merchant_id: this.merchantId,
        status: this.valueQueue === "全部" ? "" : this.valueQueue,
        table_id: this.valueTable,
        page_index: this.currentPage,
        page_size: this.pageSize
      };
      queryData(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.numTotal = 0
          let data = JSON.parse(res.data.payload)
          this.tableData = data.records
          this.totalRecord = data.total
          this.tableData.forEach((element) => {
            if (element.status === 0) {
              this.numTotal++;
            }
          });
        }
      });
    },
    //返回排队状态
    getStatu(val) {
      let text;
      switch (val) {
        case 0:
          text = "排队中";
          break;
        case 1:
          text = "已叫号";
          break;
        case -1:
          text = "已过号";
          break;
      }
      return text;
    },
    queueData() {},
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
    this.getTableType();
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
