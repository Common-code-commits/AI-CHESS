<template>
  <div class="root">
    <div class="board_box">
      <h1 class="title">五子棋</h1>
      <Board></Board>
      <div class="status-inner">
        <div class="chessman"></div>
        请点击 `开始` 按钮
      </div>
      <Begin></Begin>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Board from "./Board.vue"
import Begin from "@/components/Begin"
import Sidebar from "@/components/Sidebar"

export default {
  name: 'Game',
  components: {
    Board, Begin, Sidebar
  }
}
</script>


<style scoped>
.board_box {
  background-image: url(../assets/start_bk.png);
  background-repeat: no-repeat;
  background-size: 100% 94%;
  height: 60vw;
  width: 100%;
}

.root {
  height: 100vh;
  overflow: hidden;
}

.title {
  color: #09bb07;
  font-size: 2.2rem;
  margin-block-end: 0em;
  margin-block-start: 0em;
  padding: 1.5rem 0;
  text-align: center;
}

.chessman {
  background-color: #000;
  border-radius: 50%;
  display: inline-block;
  height: 1.5rem;
  margin-right: 0.5rem;
  vertical-align: -0.2rem;
  width: 1.5rem;
}

.status-inner {
  background-color: #aaa;
  border-radius: 5px;
  margin: 2rem auto;
  max-width: 30rem;
  padding: 0.5rem 0;
}
</style>
