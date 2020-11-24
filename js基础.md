[toc]

# 第一题 闭包
### 预编译过程
1. VO 变量对象 variable object
2. GO 全局对象 global object
3. AO 活动对象 active object (正在执行的函数对应的VO)
- 函数在执行前开辟的一块空间（VO/AO），空间中包含函数执行时所需要的数据（参数，变量，函数）
- 首先将函数的参数放到AO中，并确定arguments
- 然后寻找函数中的变量声明，提升到AO中，赋值为undefined，如果变量名和参数名冲突，则不用提升
- 将函数声明提升到AO对象中，如果函数名和参数名或者提升的变量名冲突，直接用函数覆盖
- 执行函数

### 作用域链
 - VO中包含一个额外的属性，该属性指向创建该VO的函数本身
 - 每个函数在创建时，会有一个隐藏属性```[[scope]]```，它指向创建该函数的VO
 - 当访问一个变量时，后先查找自身的VO，如果不存在，则查找```[[scope]]```属性（作用域链）

### 说说闭包
 - 当一块空间没有被引用的时候，这块空间就会被垃圾回收器回收 
当B函数沿着作用域链引用了A函数的变量，B函数的[[scope]]指向A函数的VO,就持有了对A函数VO的引用，如果A函数执行完毕，A函数的VO本来是会被垃圾回收器回收的,但是由于B函数的引用，A函数的VO不会被回收，延长了A函数VO的生命周期，这就产生了闭包。

场景
 - 循环事件绑定

   ```js
   function getType(type) {
       return (date) => {
           return Object.prototype.toString.call(date) === `[object ${type}]`;
       };
   }
   const util = {};
   let typeArr = ["Number", "String", "Boolean"];
   typeArr.forEach(type => {
       util["is" + type] = getType(type);
   });
   console.log(util.isNumber(""));// false
   console.log(util.isString("hello"));// true
   console.log(util.isBoolean(true));// true
   ```

 - 珂里化
  ```js
  function curry(func, ...args) {
    const arity = func.length;
    if (args.length >= arity) {
        func.apply(this, args);
    } else {
        return (...args1) => {
            const total = [...args, ...args1];
            curry(func, ...total);
        };
    }
}
  ```
- 单例模式
#### 总结：
闭包函数适当使用可以应用于很多奇妙的场景，可以间接达到静态变量的效果，减少全局变量，但是过度使用会造成内存泄漏