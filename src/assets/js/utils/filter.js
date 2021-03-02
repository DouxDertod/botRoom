//時間过滤格式化 全局使用
/*
@parame {value} 需要处理的时间
@parame {format} 转化成的时间格式 默认不传为yyyy-mm-dd hh:mm:ss格式
*/
const formatDate = function (value, format) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    if (format === "yyyy-mm-dd") {
      return y + "-" + MM + "-" + d;
    }else if(format==="mm-dd"){
      return MM + "-" + d;
    }
     else if (format === "hh-mm-ss") {
      return h + ":" + m + ":" + s;
    } else {
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  };
  export default{ formatDate };
  