import { get, post, put, DELETE } from "../../http/https.js";

//商家基础信息部分接口=》
//查询餐厅信息
export const getBaseInfo = parme => get("/api/v1/info", parme);

//修改餐厅信息
export const fixBaseInfo = parme => put("/api/v1/info", parme);

//查询桌型
export const getTableInfo = parme => get("/api/v1/tables", parme);

//上传图片
export const upImg = parme => post("/api/upload_img", parme);

//创建桌型
export const creatTable = parme => post("/api/v1/table", parme);

//桌型更新
export const updataTable = parme => put("/api/v1/table", parme);

//删除桌型
export const delTable = parme => DELETE("/api/v1/table/" + parme);

//菜品配置
//查找菜品
export const getDishes = parme =>
  get("/api/v1/dishes?merchant_id=" + parme.merchant_id +
    "&page_index=" + parme.page_index +
    "&page_size=" + parme.page_size
  );

//创建菜品
export const createDishes = parme => post("/api/v1/dishes", parme);

//修改菜品
export const updataDishes = parme => put("/api/v1/dishes", parme);

//删除菜品
export const delDishes = parme => DELETE("/api/v1/dishes/" + parme);

//查询菜单分类
export const getSort = parme => get("/api/v1/dishes_category", parme);

//删除菜单分类
export const deleteCategory = parme => DELETE("/api/v1/dishes_category/"+parme);

//修改菜单分类
export const updateCategory = parme => put("/api/v1/dishes_category", parme);

//新增菜品分类
export const createCategory = parme => post("/api/v1/dishes_category", parme);


//活动配置部分接口=》
//活动查询
export const getAllActive = parme =>
  get("/api/v1/activities?merchant_id=" + parme.merchant_id +
    "&page_index=" + parme.page_index +
    "&page_size=" + parme.page_size
  );

//创建活动
export const creatActive = parme => post("/api/v1/activity", parme);

//更新活动
export const updataActive = parme => put("/api/v1/activity", parme);

//活动删除
export const delActive = parme => DELETE("/api/v1/activity/" + parme);

//问答管理接口=》
//查询问答
export const queryAnwser = parme =>
  get("/api/v1/services?merchant_id=" + parme.merchant_id +
    "&page_index=" + parme.page_index +
    "&page_size=" + parme.page_size
  );

//创建问答
export const createAnwser = parme => post("/api/v1/service", parme);

//更新问答
export const updateAnwser = parme => put("/api/v1/service", parme);

//删除问答
export const delAnwser = parme => DELETE("/api/v1/service/" + parme);

//取号管理接口=》
//初始化查询
export const queryQueue = parme => get("/api/v1/queue_config", parme);

//数据修改
export const updataQueue = parme => put("/api/v1/queue_config", parme);

//功能按钮接口=>
//查询首页按钮
export const queryButton = parme => get("/api/v1/buttons", parme);

//修改首页按钮
export const updataButton = parme => put("/api/v1/button", parme);

//排队记录接口=》
//查询排队
export const queryData = parme =>
  get(
    "/api/v1/queue/records?merchant_id=" +
      parme.merchant_id +
      "&status=" +
      parme.status +
      "&table_id=" +
      parme.table_id +
      "&page_index=" +
      parme.page_index +
      "&page_size=" +
      parme.page_size+
    "&start_time=" +
    parme.start_time+
    "&end_time=" +
    parme.end_time
  );

//查询排队情况
export const querySchedule = parme =>get("/api/v1/queue_schedule?merchant_id=" +parme.merchant_id  );

//叫号更换
export const callNumber = parme => put("/api/v1/queue", parme);

//过号更换
export const passNumber = parme => put("/api/v1/queue/status", parme);

// 重复叫号
export const repeatNumber = parme => put("/api/v1/queue/repeat/"+parme.merchant_id+"/"+parme.number,null);

//登录设置=》
//登录接口
export const getLogin = parme => post("/admin/login",parme)

//退出登录
export const exitLogin =parme => get("/admin/logout",parme)

//修改密码
export const changePassword =parme => put("/admin/merchant/password",parme)

//获取验证码
export const getCaptcha =parme => get("/admin/v_code?uid="+parme.id);

//获取商家信息
export const getMerchant = parme => get("/api/v1/merchant",parme)
