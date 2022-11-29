<template>
  <div class="operations">
    <el-row :gutter="80">
      <el-col
          v-for="(item, index) in button"
          :key="index"
          :span="6"
          @click="handleClick(index)">
        <el-button :type="item.class">
          {{ item.text }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Begin",
  data() {
    return {
      // 0: 未开始, 1: 开始, 2: 结束
      status: 0,
      // false: 红方, true: 黑方
      turn: false,
      // 0: 未认输, 1: 红方认输, 2: 黑方认输
      lose: 0,
      // 0: 未结束, 1: 红方胜, 2: 黑方胜
      winner: 0,
      // false: 未暂停, true: 暂停
      pause: false,
      // false: 未提示, true: 提示
      tip: false,
      // false: 未显示序号, true: 显示序号
      showIndex: false,
      // false: 未随机开局, true: 随机开局
      random: false,
      // false: 人机对战, true: 双人对战
      mode: false,
      // 按钮文字数组
      button: [
        {
          "text": "开始",
          "class": "primary"
        },
        {
          "text": "暂停",
          "class": "warning"
        },
        {
          "text": "悔棋",
          "class": "info"
        },
        {
          "text": "认输",
          "class": "danger"
        }
      ]
    }
  },
  methods: {
    // 点击按钮
    handleClick(index) {
      switch (index) {
        case 0:
          this.status = 1;
          break;
        case 1:
          if (this.pause) {
            this.pause = false;
            this.button[1].text = "暂停";
          } else {
            this.pause = true;
            this.button[1].text = "继续";
          }
          break;
        case 2:
          break;
        case 3:
          this.lose = this.turn ? 1 : 2;
          break;
      }
    }
  }
}
</script>

<style scoped>
button {
  height: 100%;
  width: 100%;
}

.el-row {
  margin: 0 auto !important;
  width: 60%;
}
</style>
