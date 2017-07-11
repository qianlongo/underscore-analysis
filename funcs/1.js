// 根据老姚的文章顺序 1 -> 第一篇源码分析

var _ = function (obj) {
  if (obj instanceof _) {
    return obj
  }

  if (!(this instanceof _)) {
    return new _(obj)
  }

  obj.wrapped = obj
}