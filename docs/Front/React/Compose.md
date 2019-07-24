# Redux - Compose

---

**compose 其实就是函数式编程里常用的组合函数, 我们可以先了解一下函数试编程的概念**

> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

- 上代码

``` js{10}
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
compose的源码其实只有这么不到10行，当我们有这样的需求的时候： **A函数的参数是B函数的返回值，B函数的参数是C函数的返回值，C函数的参数...** 我们可能回想到下面这样的例子：

```js
  const result = fnA(fnB(fnC(fnD(num))))

  // 其实compose只不过是将上面的函数写成了下面的这种方式，但是compose调用的时候是可以接收多个参数的

  const result = compose(fnA, fnB, fnC, fnD)(num)
```

`compose`函数的执行很简单，核心概念利用了 ES5的`reduce`函数，关于`reduce`函数，我们在其它章节会讲。

`funcs.reduce((a, b) => (...args) => a(b(...args)))` 是其主要功能的实现

- **下面我们可以看一下它具体实现的过程**

``` js
  let num = 10;
  function fnA(num) { return num + 1 }
  function fnB(num) { return num + 2 }
  function fnC(num) { return num + 3 }
  function fnD(num) { return num + 4 }

  // 如果我们想得到这样的值
  let result = fnA(fnB(fnC(fnD(num))))    // 10 + 4 + 3 + 2 + 1 = 20

  // 如果换成compose的写法
  let composeFn = compose(fnA, fnB, fnC, fnD)
  let newResult = compose(num)
```

根据`compose`的源码，我们可以得到下面这样的函数：<br/> 
`[fnA, fnB, fnC, fnD].reduce((a, b) => (...args) => a(b(...args)))`

|  第几轮循环  |  a的值    |  b的值  |  返回的值  |
|:-:|:-:|:-:|:-:|
|第一轮循环       |fnA                                 |fnB  | (...args) => fnA(fnB(...args))           |
|第二轮循环       |(...args) => fnA(fnB(...args))      |fnC  | (...args) => fnA(fnB(fnC(...args)))      |
|第三轮循环       |(...args) => fnA(fnB(fnC(...args))) |fnD  | (...args) => fnA(fnB(fnC(fnD(...args)))) |

这样我们最后得到的结果就是 `(...args) => fnA(fnB(fnC(fnD(...args))))` 啦。

总结
===

  `compose`代码看起来实现很简单，但是因为对`reduce`方法不是很熟练，咋一看上去还是有点懵的。 我们在`react`中会比较常用到。在我们写**HOC**的时候可能会经历多层的嵌套，当然有一点，`compose` **调用的时候是可以传入多个参数的**，经常会配合`React.cloneElement`来一起使用。


