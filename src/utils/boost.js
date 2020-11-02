// 不允许添加重复元素到数组
// Array.prototype.pushNoRepeat = function(val) {
//   for (let i = 0; i < arguments.length; i++) {
//     console.log(i);
//     if (this.indexOf(val) === -1) {
//       this.push(val);
//     }
//   }
// };
Array.prototype.pushWithoutDuplicate = function() {
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (this.indexOf(arg) === -1) {
      this.push(arg);
    }
  }
};
