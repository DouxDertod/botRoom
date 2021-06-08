<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">排队管理</el-col>
    </el-header>
    <el-container>

      <el-row style="width: 100%" v-loading="passNumLoading|| callNumLoading" >
        <el-col :span="12" :offset="1" style="text-align: left; padding: 10px 0">
          开启取号服务
            <el-radio-group @change="switchQueueService" v-model="dataList.queue">
              <el-radio :label="'true'">开启</el-radio>
              <el-tooltip class="item" effect="light" content="关闭后会将当前未叫号的号码设置成已过号。" placement="top-start">
                <el-radio :label="'false'">关闭</el-radio>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="暂停不会改变叫号状态。" placement="top-start">
                <el-radio :label="'pause'">暂停</el-radio>
              </el-tooltip>

            </el-radio-group>
        </el-col>
        <el-col :span="3" :offset="8"  style="margin-bottom: 15px">
          <el-button  size="mini" type="primary" @click=" reDirect()">排队记录</el-button>
        </el-col>
        <el-col :span="23" :offset="1" style="margin-bottom: 20px">
          <el-card>
            <div slot="header" class="clearfix" style="text-align: center" >
              <span>排队状态:</span>
            </div>
            <el-row>
              <el-col :span="10" :offset="1"  v-for="item in dataSchedule" style="margin-top: 5px">
                <el-col :span="8">{{item.tableType}}</el-col>
                <el-col :span="6">{{item.minCapacity}}-{{item.maxCapacity}}位</el-col>
                <el-col :span="9">{{!item.currentSerialNumber||item.currentSerialNumber=="null"?"目前没已叫号":"目前到"+item.currentSerialNumber+"号"}}</el-col>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <div  >
          <el-col :span="11" :offset="1"  v-for="item in dataSchedule" style="margin-top: 10px"  >
            <el-card class="box-card" shadow="never" >

                <el-col  :span="11" :offset="1">{{item.tableType}}</el-col>
                <el-col  :span="11" :offset="1">剩余:{{item.queueLength}}桌</el-col>
                <el-col  :span="11" :offset="1">{{!item.nextSerialNumber||item.nextSerialNumber=="null"?"没有下一桌":"下一桌:"+item.nextSerialNumber}}</el-col>
                <el-col  :span="11" :offset="1">
                  <el-button
                    :disabled='!item.nextSerialNumber||item.nextSerialNumber=="null"'
                    type="primary"
                    size="mini"
                    @click="callNumberBtn(item)"
                  >{{!item.nextSerialNumber||item.nextSerialNumber=="null"?"叫号":"叫号:"+item.nextSerialNumber}}</el-button
                  >
                </el-col>
                <el-col  :span="11" :offset="1">{{!item.currentSerialNumber||item.currentSerialNumber=="null"?"当前没有已叫号":"当前:"+item.currentSerialNumber}}</el-col>
                <el-col  :span="11" :offset="1">
                  <el-button
                    :disabled='!item.currentSerialNumber||item.currentSerialNumber=="null"'
                    @click="repeatNumberBtn(item)"
                    size="mini"
                    :loading="repeatNumLoading"

                  >{{!item.currentSerialNumber||item.currentSerialNumber=="null"?"通知":"通知:"+item.currentSerialNumber}}</el-button
                  >
                  <el-button
                    :disabled='!item.currentSerialNumber||item.currentSerialNumber=="null"'
                    @click="passNumberBtn(item)"
                    size="mini"
                    type="danger"
                  >{{!item.currentSerialNumber||item.currentSerialNumber=="null"?"过号":"过号:"+item.currentSerialNumber}}</el-button>
                </el-col>
                <!-- <el-col  :span="11" :offset="1">
                  <el-button
                    :disabled='!item.currentSerialNumber||item.currentSerialNumber=="null"'
                    @click="passNumberBtn(item)"
                    size="mini"
                    type="danger"

                  >{{!item.currentSerialNumber||item.currentSerialNumber=="null"?"过号":"过号:"+item.currentSerialNumber}}</el-button
                  >
                </el-col> -->

            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-container>
  </div>
</template>

<script>
  import {
    callNumber, passNumber,
    queryQueue, repeatNumber,
    querySchedule, updataQueue,
  } from "../../assets/js/api/api";
export default {
  name: "home",
  today:new Date(),
  data() {
    return {
      dataList: {},
      dataSchedule:[],
      merchantId:'',
      callNumLoading:false,
      passNumLoading:false,
      repeatNumLoading:false
    };
  },
  methods: {
    // 切换服务状态
    switchQueueService() {
      let parme = this.dataList;
      updataQueue(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message: "修改成功!" });
          this.getData();
        }
      });
    },

    // 叫号
    callNumberBtn(item){
      this.callNumLoading=true;
      // 自动过当前号
      // if(!item.currentSerialNumber||item.currentSerialNumber=="null"){}
      // else {
      //   this.passNumberBtn(item);
      // }
      const data = {
        merchantId:this.merchantId,
        tableId:item.tableId,
        id:item.nextRecordId,
        status:1,
        lastRecordId:item.currentRecordId
      };
      callNumber(data).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message:item.nextSerialNumber+ " 叫号成功" });
          this.getData();
        }
        setTimeout(() => {
          this.callNumLoading=false;
        }, 2000);

      });
    },
    repeatNumberBtn(item){
      this.repeatNumLoading = true
      const data = {
        number:item.currentSerialNumber,
        merchant_id: this.merchantId
      }
      repeatNumber(data).then(res=>{
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message:res.data.payload });
          this.getData();
        }
        setTimeout(() => {
          this.repeatNumLoading=false;
        }, 1000);
      })
    },
    // 过号
    passNumberBtn(item){
      this.passNumLoading=true;
      const data = {
        merchantId:this.merchantId,
        tableId:item.tableId,
        id:item.currentRecordId,
        status:-1,
      };
      passNumber(data).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message:item.currentSerialNumber+ "过号成功" });
          this.getData();
        }

        setTimeout(() => {
          this.passNumLoading=false;
        }, 2000);
      });
    },
    //跳转
    reDirect(){
      this.$router.push("/queueRecord");
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
        merchant_id: String(this.merchantId),
      };
      queryQueue(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);

          this.dataList = data;
        }
      });
      querySchedule(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.dataSchedule = data;
        }
      });

    },
    conditionChange(){
      this.currentPage=1;
      this.getData();
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
        case 2:
          text = "已完成";
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
    this.merchantId=localStorage.getItem("merchantId")
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
/deep/.box-card  .el-col{
    margin: 5px
  }
/deep/.box-card  .el-button{
  min-width: 80px;
}
</style>
