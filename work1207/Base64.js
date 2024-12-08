// BASE64编码表
var Base64Index = "ABCDEFGHIJKLMNOPQRSTUVWXYZadcdefghijklmnopkrstuvwxyz0123456789+/";

// 加码过程
// 将所有字符转化为ASCII码；
// 将ASCII码转化为8位二进制(不足八位的高位补0)；
// 将8位二进制按六位分割  （不足六位的末尾补0）
// 将分割后的二进制转为Base64索引值
// 从Base64编码表获取索引值对应的Base64编码；
// ps :如果待加码内容的字节数不是 3 的整数倍，则按位数在末尾补=
function base64Code(str) {
  let num = "";
  let result = "";
  for (let i = 0; i < str.length; i++) {
    // 获取ASCII数值
    let index = str.charCodeAt(i);
    // 转二进制
    let targetNum = transe2(index);
    if(targetNum.length < 8){
      // 不足8位则高位补 0
      targetNum = targetNum.padStart(8, "0");
    }
    num += targetNum;
  }

  // 分割为六位
  let arr = num. match(/.{1,6}/g);
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    // 补全尾数
    if (i === length-1 && arr[i].length < 6) {
      arr[i] = arr[i].padEnd(6, "0");
    }
    // 转为十进制
    result += Base64Index.charAt(transe10(arr[i]));
  }
   // 判断是不是3的倍数
  let a = str.length % 3;
  result = a === 1 ? result + "==" : a === 2 ? result + "=" : result;
  return result;
}
console.log(base64Code("c"));

// 解码过程
// 根据Base64编码表找到字符对应的索引
// 将索引转为六位二进制数（不足六位的高位补0）
// 将六位二进制数按八位分割 （末尾不足八位的舍弃）
// 将分割后的转为ASCII码索引,并根据索引找到对应的字符串
function enCode(param) {
  // 去掉等于
  let str = param.replace(/=/g,"")
  let index = [];
  // Base64字符转换为索引数组
  for(let i = 0;i<str.length; i++){
    index.push(Base64Index.indexOf(str[i]));
  }

  let length = index.length;
  let result = "";
  for(let i= 0;i<length;i++){
    let num = ""
      // 索引转二进制
    num = transe2(index[i]);
    if(num.length < 6){
      // 不足六位则高位补 0
      num = num.padStart(6, "0");
    }
    result += num;
  }

  // 分割为8位
  let resultArr = result.match(/.{1,8}/g);
  
  let asciiArr = [];
  for(let i =0;i<resultArr.length;i++){
    if(resultArr[i].length === 8){
      asciiArr.push(transe10(resultArr[i])) ;
    }
    
  }
  return String.fromCodePoint(...asciiArr);
}

 console.log(enCode("Yw=="))
// 二进制转十进制
function transe10(params) {
  let num = 0;
  for (var i = 0; i < params.length; i++) {
    num += parseInt(params[i], 2) * Math.pow(2, params.length - 1 - i);
  }
  return num;
}

// 十进制转2进制
function transe2(params) {
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
  //倒置
  return num.split("").reverse().join("");
}
