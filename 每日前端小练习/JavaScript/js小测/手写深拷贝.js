function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    //obj是null,或者不是对象和数组，直接返回
    return obj;
  }
  //初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result={}
  }
  for (const key in object) {
    // 保证key不是原型的属性
    if (object.hasOwnProperty(key)) {
      // 递归调用
      result[key]=deepClone(object[key])
      
    }
  }
  // 返回结果
  return result
}
