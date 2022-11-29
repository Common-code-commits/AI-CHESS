<template>
  <article data-v-34f9385a="" class="weui-article"><h1 data-v-34f9385a="">轩轩五子棋</h1><section data-v-34f9385a=""><section data-v-34f9385a=""><h3 data-v-34f9385a="">这是什么</h3><p data-v-34f9385a="">
    这是一个开源的五子棋AI，纯JS代码，浏览中运行（不需要和后台通信）。AI具有一定的棋力，并且可以自由调节难度。
  </p></section><section data-v-34f9385a=""><h3 data-v-34f9385a="">源码和文档</h3><p data-v-34f9385a=""><ul data-v-34f9385a=""><li data-v-34f9385a="">
    源码在这里: <a data-v-34f9385a="" href="https://github.com/lihongxun945/gobang" target="_blank">lihongxun945/gobang</a></li><li data-v-34f9385a="">有一个手把手的详细教程教你怎么写五子棋AI，涵盖了五子棋AI开发的各个知识点  <a data-v-34f9385a="" href="https://github.com/lihongxun945/myblog">五子棋AI算法</a></li></ul></p></section><section data-v-34f9385a=""><h3 data-v-34f9385a="">AI 用到了什么技术</h3><p data-v-34f9385a="">
    这是一个基于Alpha-Beta Search的AI。主要用到了如下技术：
    <ul data-v-34f9385a=""><li data-v-34f9385a="">Alpha Beta Search</li><li data-v-34f9385a="">Zobrist 置换表</li><li data-v-34f9385a="">启发式评估函数</li><li data-v-34f9385a="">迭代加深</li></ul></p></section><section data-v-34f9385a=""><h3 data-v-34f9385a="">这个UI用到了什么技术？</h3><p data-v-34f9385a="">
    UI 是用 Vue 写的，主要用到了 <a data-v-34f9385a="" href="https://weui.io/" target="_blank">WeUI</a> 中的一些样式。
  </p></section><section data-v-34f9385a=""><h3 data-v-34f9385a="">关于作者</h3><p data-v-34f9385a="">
    作者@言川, 我的github主页 <a data-v-34f9385a="" href="https://github.com/lihongxun945">lihongxun945</a></p></section></section></article>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
.test{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F2F3F4;
}
</style>
