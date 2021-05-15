<template>
  <div>
    <el-header>
      <el-col :span="23" :offset="1" class="titleMsg">取号管理</el-col>
    </el-header>
    <el-container>
      <el-row>

        <!-- ----------- -->
        <el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">
          用户等位时，是否开启菜单推荐
          <span style="margin-left: 25px">
            <el-radio-group @change="changeIt" v-model="dataList.menu">
              <el-radio :label="true">开启</el-radio>
              <el-radio :label="false">关闭</el-radio>
            </el-radio-group>
          </span>
        </el-col>
        <el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">
          <el-radio-group
            @change="changeIt"
            v-model="dataList.menuAllTime"
            style="width: 100%"
          >
            <el-col>
              <span style="font-size: 16px"> 开启时间</span>
              <el-radio style="margin-left: 25px" :label="false"
                >定时开启</el-radio
              >
            </el-col>
            <el-col
              :span="23"
              :offset="1"
              style="text-align: left; padding: 20px"
            >
              <span v-show="!dataList.menuAllTime" style="margin-left: 25px">
                <el-time-picker
                  @change="chengeTime(0)"
                  is-range
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="valueTime"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                >
                </el-time-picker>
              </span>
            </el-col>
            <el-col :span="24" style="text-align: left">
              <el-radio style="margin-left: 95px" :label="true"
                >所有时间</el-radio
              >
              <el-divider></el-divider>
            </el-col>
          </el-radio-group>
        </el-col>
        <el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">
          绑定客如云店铺ID：
          <span v-if="showContent"
            >{{ kryShopId }}
            <i
              class="el-icon-edit-outline curhand"
              @click="showContent = false"
            ></i
          ></span>
          <span v-else>
            <el-input
              ref="shopname"
              style="width: 300px; vertical-align: text-top"
              type="text"
              :rows="3"
              placeholder="请输入店铺Id"
              v-model="kryShopId"
              autofocus
            >
            </el-input>
            <el-button
              @click.native="cancelBind()"
              style="vertical-align: bottom"
              >取消
            </el-button>
            <el-button
              @click.native="bindKryShop()"
              @mousedown.native="$event.preventDefault()"
              style="vertical-align: bottom;margin-left:0px"
              type="primary"
              >绑定
            </el-button>
          </span>
        </el-col>
        <el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">
          开启客如云自动叫号：
          <span style="margin-left: 25px">
            <el-radio-group @change="enableAuotQueue()" v-model="dataList.enableAutoQueue">
              <el-radio :label="true">开启</el-radio>
              <el-radio :label="false">关闭</el-radio>
            </el-radio-group>
          </span>
        </el-col>
        <!-- -------------- -->
        <!--此版本下列功能暂不可用-->
        <!--<el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">-->
          <!--用户等位时，是否开启互动内容-->
          <!--<span style="margin-left: 25px">-->
            <!--<el-radio-group @change="changeIt" v-model="dataList.interactive">-->
              <!--<el-radio :label="true">开启</el-radio>-->
              <!--<el-radio :label="false">关闭</el-radio>-->
            <!--</el-radio-group>-->
          <!--</span>-->
        <!--</el-col>-->
        <!--<el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">-->
          <!--<el-radio-group-->
            <!--@change="changeIt"-->
            <!--v-model="dataList.interactiveAllTime"-->
            <!--style="width: 100%"-->
          <!--&gt;-->
            <!--<el-col>-->
              <!--<span style="font-size: 16px">开启时间</span>-->
              <!--<el-radio style="margin-left: 25px" :label="false"-->
                <!--&gt;定时开启</el-radio-->
              <!--&gt;-->
            <!--</el-col>-->
            <!--<el-col-->
              <!--:span="23"-->
              <!--:offset="1"-->
              <!--style="text-align: left; padding: 20px"-->
            <!--&gt;-->
              <!--<span-->
                <!--v-show="!dataList.interactiveAllTime"-->
                <!--style="margin-left: 25px"-->
              <!--&gt;-->
                <!--<el-time-picker-->
                  <!--is-range-->
                  <!--format="HH:mm"-->
                  <!--value-format="HH:mm"-->
                  <!--v-model="valueTime1"-->
                  <!--@change="chengeTime(1)"-->
                  <!--range-separator="至"-->
                  <!--start-placeholder="开始时间"-->
                  <!--end-placeholder="结束时间"-->
                  <!--placeholder="选择时间范围"-->
                <!--&gt;-->
                <!--</el-time-picker>-->
              <!--</span>-->
            <!--</el-col>-->
            <!--<el-col :span="24" style="text-align: left">-->
              <!--<el-radio style="margin-left: 95px" :label="true"-->
                <!--&gt;所有时间</el-radio-->
              <!--&gt;-->
              <!--<el-divider></el-divider>-->
            <!--</el-col>-->
          <!--</el-radio-group>-->
        <!--</el-col>-->
        <!-- ---------- -->
        <!--<el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">-->
          <!--用户等位时，是否开启周边推荐-->
          <!--<span style="margin-left: 25px">-->
            <!--<el-radio-group @change="changeIt" v-model="dataList.recommend">-->
              <!--<el-radio :label="true">开启</el-radio>-->
              <!--<el-radio :label="false">关闭</el-radio>-->
            <!--</el-radio-group>-->
          <!--</span>-->
        <!--</el-col>-->
        <!--<el-col :span="23" :offset="1" style="text-align: left; padding: 10px 0">-->
          <!--<el-radio-group v-model="dataList.recommendAllTime">-->
            <!--<el-col>-->
              <!--<span style="font-size: 16px">开启时间</span>-->
              <!--<el-radio style="margin-left: 25px" :label="false">定时开启</el-radio>-->
            <!--</el-col>-->
            <!--<el-col-->
              <!--:span="23"-->
              <!--:offset="1"-->
              <!--style="text-align: left; padding: 20px"-->
            <!--&gt;-->
              <!--<span v-if="!dataList.recommendAllTime" style="margin-left: 25px">-->
                <!--<el-time-picker-->
                  <!--is-range-->
                  <!--v-model="valueTime2"-->
                  <!--@change="chengeTime(2)"-->
                  <!--format="HH:mm"-->
                  <!--value-format="HH:mm"-->
                  <!--range-separator="至"-->
                  <!--start-placeholder="开始时间"-->
                  <!--end-placeholder="结束时间"-->
                  <!--placeholder="选择时间范围"-->
                <!--&gt;-->
                <!--</el-time-picker>-->
              <!--</span>-->
            <!--</el-col>-->
            <!--<el-col :span="24" style="text-align: left">-->
              <!--<el-radio style="margin-left: 95px"  :label="true"-->
                <!--&gt;所有时间</el-radio-->
              <!--&gt;-->
            <!--</el-col>-->
            <!--&lt;!&ndash; <el-col :span="24" style="text-align: left; padding: 10px 0">-->
            <!--周边内容-->
            <!--<el-col :span="20"> </el-col>-->
          <!--</el-col> &ndash;&gt;-->
          <!--</el-radio-group>-->
        <!--</el-col>-->
      </el-row>
    </el-container>
  </div>
</template>

<script>
import { queryQueue, updataQueue, bindKryShopId, enableAutoCall} from "../../assets/js/api/api";
export default {
  name: "accessManage",
  data() {
    return {
      merchantid:"",
      dataList: {},
      checkList: [],
      valueTime: [],
      valueTime1: [],
      valueTime2: [new Date(), new Date()],
      radio: true,
      radio1: 1,
      radio2: 1,
      radio3: 1,
      radio4: 1,
      radio5: 1,
      radio6: 1,
      showContent:true,
      kryShopId:""
    };
  },
  methods: {
    //页面数据初始化
    getData() {
      let parme = {
        merchant_id: Number(this.merchantId),
      };
      queryQueue(parme).then((res) => {
        if (res.data.retcode === 0) {
          let data = JSON.parse(res.data.payload);
          this.$set(this.valueTime, 0, data.menuStartTime);
          this.$set(this.valueTime, 1, data.menuEndTime);

          this.$set(this.valueTime1, 0, data.interactiveStartTime);
          this.$set(this.valueTime1, 1, data.interactiveEndTime);

          this.$set(this.valueTime2, 0, data.recommendStartTime);
          this.$set(this.valueTime2, 1, data.recommendEndTime);

          this.dataList = data;
          this.kryShopId = data.kryShopId
        }
      });
    },
    changeIt() {
      let parme = this.dataList;
      updataQueue(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message: "修改成功!" });
          this.getData();
        }
      });
    },
    chengeTime(key) {
      let parme = JSON.parse(JSON.stringify(this.dataList));
      switch (key) {
        case 0:
          parme.menuStartTime = this.valueTime[0];
          parme.menuEndTime = this.valueTime[1];
          break;
        case 1:
          parme.interactiveStartTime = this.valueTime1[0];
          parme.interactiveEndTime = this.valueTime1[1];
          break;
        case 2:
          parme.recommendStartTime = this.valueTime2[0];
          parme.recommendEndTime = this.valueTime2[1];
          break;
      }

      updataQueue(parme).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({ type: "success", message: "修改成功!" });
          this.getData();
        }
      });
    },
    bindKryShop(){
      let parme = {}
      parme["merchantId"] = this.merchantId
      parme["shopId"] = this.kryShopId
      bindKryShopId(parme).then(res=>{
        if(res.data.retcode === 0){
          this.$message({ type: "success", message: "绑定成功!" });
          this.showContent = true
          this.getData();
        }
      })
    },
    cancelBind(){
      this.kryShopId = this.dataList.kryShopId
      console.log(this.dataList.kryShopId)
      this.showContent = true
    },
    execAutoCall(){
      let parme = {}
      parme["merchantId"] = this.merchantId
      parme["status"] = this.dataList.enableAutoQueue
      enableAutoCall(parme).then(res=>{
        if(res.data.retcode === 0){
          this.$message({ type: "success", message: "修改成功!" });
          this.showContent = true
          this.getData();
        }
      })
    },
    enableAuotQueue(){
      if(this.dataList.enableAutoQueue){
        this.$confirm('启用自动叫号会自动同步桌型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("开启叫号")
          this.execAutoCall()
        }).catch(() => {
          this.dataList.enableAutoQueue = false
          this.$message({
            type: 'info',
            message: '已取消修改！'
          });          
        });
      }else{
        this.execAutoCall()
      }
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
</style>
