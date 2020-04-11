//转换时间戳，格式：2020-09-08 12:12:12
function myFormatByDatetime(timestamp) {
  let date = new Date(timestamp);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

//转换时间戳，格式：2020-09-08
function myFormatByDate(timestamp) {
  let date = new Date(timestamp);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + MM + '-' + d;
}

//还有几天生日
function leftDate(timestamp) {
  let temp1 = new Date(timestamp);
  let date = new Date(temp1.getFullYear(), temp1.getMonth() + 1, temp1.getDate())

  let temp2 = new Date();
  let today = new Date(temp2.getFullYear(), temp2.getMonth() + 1, temp2.getDate());
  //将生日年份设为今年
  let y = today.getFullYear();
  date.setFullYear(y);
  if (today > date) {
    //已经过了，就算明年的
    y++;
    date.setFullYear(y);
    return parseInt((date - today) / (3600 * 24 * 1000));
  } else {
    //还没过，直接减
    return parseInt((date - today) / (3600 * 24 * 1000));
  }

}


export default {
  myFormatByDatetime,
  myFormatByDate,
  leftDate
}
