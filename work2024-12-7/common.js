// Base编码加解密公共方法
var Base64Index =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZadcdefghijklmnopkrstuvwxyz0123456789+/";
var Base16Index = "0123456789ABCDEF";
var Base32Index = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

// 二进制转十进制
function transe10(params) {
  let num = 0;
  for (var i = 0; i < params.length; i++) {
    num += parseInt(params[i], 2) * Math.pow(2, params.length - 1 - i);
  }
  return num;
}

// 十进制转 x位2进制
function transe2(params,x) {
  let num = "";
  while (params > 0) {
    let target = Math.floor(params / 2);
    num = num + (params % 2);
    params = target;
    if (params === 1) {
      num = num + "1";
      break;
    }
  }
  //倒置并补全
  num = num.split("").reverse().join("");
  if(x !=""){
    num = num.padStart(x, "0")
  }
  return num
}

// BaseX编码加解密
// str:输入的字符串 x:编码格式 ==> "16" "32" 默认"64"
// BaseX编码切割位数及BaseX索引表
var splitLength ;
var BaseIndex;
function BaseXcode(str, x) {
  checkType(x);
  let num = "";
  let result = "";
  for (let i = 0; i < str.length; i++) {
    // 获取ASCII数值
    let index = str.charCodeAt(i);
    // 转八位二进制
    let targetNum = transe2(index,8);
    num += targetNum;
  }

  // 分割位数
  let arr = num.match(new RegExp(`.{1,${splitLength}}`, 'g'));
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    // 按分割位数补全尾数
    if (i === length - 1 && arr[i].length < splitLength) {
      arr[i] = arr[i].padEnd(splitLength, "0");
    }
    // 转为字符
    result += BaseIndex.charAt(transe10(arr[i]));
  }

  //  特殊处理
  let fillLength = 0;
  let strLength = result.length;
  if (x === "64") {
    // 判断输入字符长度是不是3的倍数
    fillLength = 3-(str.length % 3);
  }
  if (x === "32") {
    // 判断转换之后的字符是不是8的倍数
    fillLength = 8-(strLength % 8);
  }
  return result.padEnd(strLength+fillLength,"=");
}

// BaseX解码
function enBaseXCode(str,x) {
  checkType(x);
  // 去掉 =
  str = str.replace(/=/g, "");
  let index = [];
  // BaseX字符转换为索引数组
  for (let i = 0; i < str.length; i++) {
    index.push(BaseIndex.indexOf(str[i]));
  }

  let length = index.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    let num = "";
    // 索引十进制按编码格式分割为 x位二进制
    num = transe2(index[i],splitLength);
    if (num.length < splitLength) {
      num = num.padStart(splitLength, "0");
    }
    result += num;
  }

  // 统一按八位分割 转为ASCII码索引十进制值
  let resultArr = result.match(/.{1,8}/g);
  let asciiArr = [];
  for (let i = 0; i < resultArr.length; i++) {
    if (resultArr[i].length === 8) {
      asciiArr.push(transe10(resultArr[i]));
    }
  }
  // ASCII索引转字符
  return String.fromCodePoint(...asciiArr);
}

function checkType(params) {
  switch (params) {
    case "16":
      splitLength = 4;
      BaseIndex = Base16Index;
      break;
    case "32":
      splitLength = 5;
      BaseIndex = Base32Index;
      break;
    default:
      splitLength = 6;
      BaseIndex = Base64Index;
      break;
  }
}

// console.log(BaseXcode("L","16"));
// console.log(BaseXcode("L=","32"));
// console.log(BaseXcode("L=","64"));
// console.log(enBaseXCode("4C","16"));
// console.log(enBaseXCode("JQ=","32"));
// console.log(enBaseXCode("TA==","64"));

// console.log(BaseXcode("c","64"));
// console.log(enBaseXCode("Yw==","64"))

