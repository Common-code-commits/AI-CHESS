<template>
  <div>
    <el-button
        class="round"
        icon="el-icon-setting"
        round
        type="primary"
        @click="handleButtonClick">
    </el-button>
    <el-dialog
        :visible.sync="show"
        title="设置选项"
        width="30%">
      <el-row
          v-for="(item,index) in menu_items"
          :key="index"
          justify="space-between"
          style="align-items: center;"
          type="flex"
          @click.stop="handleMenuItemClick">
        <span>{{ item.text }}</span>
        <el-select v-if="item.type === 0" v-model="item.value" placeholder="请选择">
          <el-option
              v-for="t in item.options"
              :key="t.value"
              :label="t.label"
              :value="t.value">
          </el-option>
        </el-select>
        <el-switch
            v-else-if="item.type === 1"
            v-model="item.value"
            active-color="#13ce66"
            class="menu-item"
            inactive-color="#ff4949"
            @change="handleMenuItemClick(index)">
        </el-switch>
        <el-button v-else circle icon="el-icon-message" type="info" @click="handleMenuItemClick(index)"></el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      show: false,
      menu_items: [
        {
          text: "思考深度",
          type: 0,
          options: [{
            value: 4,
            label: '萌新（4-6）'
          }, {
            value: 7,
            label: '职业（7-9）'
          }, {
            value: 10,
            label: '大师（10-12）'
          }],
          value: 4
        },
        {
          text: "对战模式",
          type: 0,
          options: [{
            value: 0,
            label: '人机对战'
          }, {
            value: 1,
            label: '双人对战'
          }],
          value: 0
        },
        {
          text: "随机开局",
          type: 1,
          value: false
        },
        {
          text: "显示序号",
          type: 1,
          value: false
        },
        {
          text: "提示走法",
          type: 1,
          value: false
        },
        {
          text: "关于",
          type: 2,
          value: false
        }
      ]
    }
  },
  methods: {
    handleButtonClick() {
      this.show = true
    },
    handleMenuItemClick(index) {
      switch (index) {
        case 0:
          this.$store.dispatch('user/setDepth', this.menu_items[index].value)
          break
        case 1:
          this.$store.dispatch('user/setMode', this.menu_items[index].value)
          break
        case 2:
          this.$store.dispatch('user/setRandom', this.menu_items[index].value)
          break
        case 3:
          this.$store.dispatch('user/setShowIndex', this.menu_items[index].value)
          break
        case 4:
          this.$store.dispatch('user/setShowTips', this.menu_items[index].value)
          break
        case 5:
          this.$router.push({path: '/about'})
          break
      }
    }
  }
};
</script>

<style scoped>
.round, .menu {
  position: absolute;
}

.el-button.is-round {
  font-size: 26pt;
  padding: 4px;
  right: 1%;
  top: calc(50% - 13px);
}

.menu {
  background-color: #fff;
  height: 20vw;
  padding: 1vw 2vw;
  right: 0;
  top: calc(50vh - 10vw);
  width: 10vw;
}

.el-select {
  /*height: 12px;*/
  width: 30%;
}

.el-row {
  padding: 10px 0;
}
</style>
