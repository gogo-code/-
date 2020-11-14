/* eslint-disable import/no-anonymous-default-export */
import * as constants from './constants';
import {fromJS} from 'immutable'
// immutable.js
// 生成immutable对象实现对state的不可修改

const defaultState = fromJS({
  focused: false,
  list:[]
});
// 导出纯函数
// 引入immutable以后，state为immutable对象
export default (state = defaultState, action) => {

  if (action.type === constants.SEARCH_FOCUS) {
    //immutable对象的set方法，会结合之前immutable对象的值
    //和设置的值，返回一个全新的对象
    return state.set('focused',true)
  }
  if (action.type === constants.SEARCH_BLUR) {
    return state.set('focused',false)
  }
  if (action.type === constants.CHANGE_LIST) {
    console.log(action);
    return state.set('list',action.data)
  }
  return state;
};
