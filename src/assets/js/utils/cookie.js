//封装的获取cookie
export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
  //封装保存cookie
  export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    var d_s = d.getTime();
    d.setTime(d_s + exdays * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cname + "=" + cvalue + "; " + "; expires=" + expires + "; path=/;";
  }
  
  // 核对cookie
//   export function  checkCookie() {
//     var platform_token = getCookie("username");
//     var authority = getCookie("dAuthority");
//     if (platform_token == "" || platform_token == undefined) {
//       authority = null;
//       return authority;
//     } else {
//       return authority;
//     }
//   }
  
  // 清空cookie
  export function clearCookie(name) {
    setCookie(name, "", -1);
  }
  
  //清空所有cookie
  export function clearAllCookie() {
    let domain = '.' + location.host;
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  
    if (keys) {
      for (let i = keys.length; i >= 0; i--) {
        setCookie(keys[i], "", -1);
  
      }
  
    }
  
  }