<template>
  <div id="board-inner">
    <el-row v-for="(rows,i) in chess" :key="i" type="flex">
      <el-col
          v-for="(item,j) in rows"
          :key="j"
          :class="{'whitechess': item===1, 'blackchess': item===2,'tips-whitechess': item===3, 'tips-blackchess': item===4}"
          class="chess"
          @click.native="handleClick(i,j)">
        <span v-show="isshowindex">{{ indexs[i][j] ? indexs[i][j] : "" }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: 'Board',
  props: {
    rows: {
      type: Number,
      default: 15
    },
    cols: {
      type: Number,
      default: 15
    }
  },
  watch: {
    clear(val, oldVal) {
      if (val) {
        this.clear_fun()
      }
    }
  },
  computed: {
    ...mapGetters([
      'order',
      'color',
      'pause',
      'clear',
      'isshowindex',
    ]),
    chess_order() {
      return this.order === this.epoch % 2
    },
    epoch: {
      get() {
        return this.$store.state.user.epoch
      },
      set(val) {
        this.$store.dispatch('user/setEpoch', val)
      }
    },
  },
  data() {
    return {
      chess: null,
      indexs: null,
      socket: null
    }
  },
  created() {
    let chess = new Array(this.rows)
    let index = new Array(this.rows)
    for (let i = 0; i < this.rows; i++) {
      chess[i] = new Array(this.cols)
      index[i] = new Array(this.cols)
      for (let j = 0; j < this.cols; j++) {
        chess[i][j] = 0
        index[i][j] = 0
      }
    }
    this.indexs = index
    this.chess = chess
  },
  methods: {
    clear_fun() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.$set(this.chess[i], j, 0)
          this.$set(this.indexs[i], j, 0)
        }
      }
    },
    handleClick(i, j) {
      if (!this.pause && !this.chess[i][j] && this.chess_order) {
        this.epoch++
        this.$set(this.chess[i], j, this.color + 1)
        this.$set(this.indexs[i], j, this.epoch)
        this.$store.dispatch('user/setPause', true)
      }
    }
  }
}
</script>

<style>
#board-inner {
  background-image: url(../assets/board.jpg);
  background-size: 100%;
  height: 35vw;
  margin: 0 auto;
  position: relative;
  width: 35vw;
  display: flex;
  padding: 0.4%;
  flex-direction: column;
}

.chess {
  background-size: 100% 100%;
  border-radius: 50%;
  margin: 0.8%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*span不能破坏chess类的圆形外表*/
.chess span {
  display: inline-block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  border-radius: 50%;
}

.blackchess {
  color: #fff;
  background-image: url("../assets/blackchess.png");
}

.whitechess {
  color: #000;
  background-image: url("../assets/whitechess.png");
}

.tips-whitechess {
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
}

.tips-blackchess {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}

.el-row {
  flex: 1 1 auto;
}
</style>
