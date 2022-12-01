<template>
  <div class="operations">
    <el-row :gutter="80">
      <el-col
          v-for="(item, index) in button"
          :key="index"
          :span="6"
      >
        <el-button :type="item.class" class="begin_button" @click="handleClick(index)">
          {{ item.text }}
        </el-button>
      </el-col>
    </el-row>
    <el-dialog :show-close="false" :visible.sync="dialogFormVisible" title="网络连接" width="30%">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item v-show="mode!==0" label="对方用户名" prop="subusername">
          <el-input v-model="form.subusername"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm(0)">取 消</el-button>
        <el-button type="primary" @click="submitForm(1)">下一步</el-button>
      </span>
    </el-dialog>
    <el-dialog :show-close="false" :visible.sync="battle" title="开始对战" width="30%">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="棋子颜色" prop="color">
          <el-select v-if="mode===0" v-model="form.color">
            <el-option
                v-for="t in color_options"
                :key="t.value"
                :label="t.label"
                :value="t.value">
            </el-option>
          </el-select>
          <el-input v-else v-model="color_chess" :onlyread="true"></el-input>
        </el-form-item>
        <el-form-item label="先后顺序" prop="order">
          <el-select v-if="mode===0" v-model="form.order">
            <el-option
                v-for="t in order_options"
                :key="t.value"
                :label="t.label"
                :value="t.value">
            </el-option>
          </el-select>
          <el-input v-else v-model="order_chess" :onlyread="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm(2)">取 消</el-button>
        <el-button type="primary" @click="submitForm(3)">开始对战</el-button>
      </span>
    </el-dialog>
    <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="提示"
        width="30%">
      <span>确定是否要悔棋</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Socket from "@/api/socket"
import {mapGetters} from "vuex"

export default {
  name: "Begin",
  data() {
    return {
      // false: 未开始, true: 开始
      status: false,
      // 0: 白方认输, 1: 黑方认输 2: 和棋
      lose: 0,
      // false: 未暂停, true: 暂停
      pause: true,
      socket: null,
      dialogFormVisible: false,
      centerDialogVisible: false,
      battle: false,
      color_options: [
        {
          value: 0,
          label: '白棋'
        },
        {
          value: 1,
          label: '黑棋'
        }
      ],
      order_options: [
        {
          value: 0,
          label: '先手'
        },
        {
          value: 1,
          label: '后手'
        }
      ],
      form: {
        ip: '',
        port: '',
        username: '',
        // false: 白方, true: 黑方
        color: 0,
        // 0: 先手, 1: 后手
        order: 0,

        subusername: ''
      },
      rules: {
        ip: [
          {required: true, message: "请输入IP地址", trigger: "blur"}
        ],
        port: [
          {required: true, message: "请输入端口", trigger: "blur"}
        ],
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ]
      },
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
  computed: {
    ...mapGetters([
      'depth',
      'mode',
      'israndom',
      'istip',
      'color',
      'order',
    ]),
    isconnet: {
      get() {
        return this.$store.state.user.isconnet
      },
      set(value) {
        this.$store.dispatch('setIsConnet', value)
      }
    },
    color_chess: {
      get() {
        return this.color === 0 ? '白棋' : '黑棋'
      },
      set(val) {

      }
    },
    order_chess: {
      get() {
        return this.order === 0 ? '先手' : '后手'
      },
      set(val) {
      }
    }
  },
  watch: {
    isconnet: function (val, oldval) {
      if (val) {
        this.$message({
          message: '连接成功',
          type: 'success'
        });
        this.battle = false
      } else {
        this.$message({
          message: '连接失败',
          type: 'error'
        });
        this.button[0].text = "开始"
        this.button[0].class = "primary"
        this.socket.close()
      }
    }
  },
  methods: {

    // 点击按钮
    handleClick(index) {
      switch (index) {
        case 0:
          if (!this.status) {
            this.status = true
            this.button[0].text = "结束"
            this.dialogFormVisible = true
            this.button[0].class = "danger"
            this.$store.dispatch('user/setPause', true)
            this.$store.dispatch('user/setClear', true)
            this.$store.dispatch('user/setEpoch', 0)
          } else {
            this.status = false
            this.button[0].text = "开始"
            this.button[0].class = "primary"
            this.$store.dispatch('user/setClear', false)
            this.socket.close()
          }
          break
        case 1:
          if (this.pause) {
            this.pause = false
            this.button[1].text = "暂停"
            this.$store.dispatch('user/setPause', true)
          } else {
            this.pause = true
            this.button[1].text = "继续"
            this.$store.dispatch('user/setPause', false)
          }
          break
        case 2:
          this.centerDialogVisible = true
          break
        case 3:
          this.$alert('很抱歉，您输掉了比赛', '五子棋', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'error',
                message: `很抱歉，您输掉了比赛`
              })
              this.status = false
              this.button[0].text = "开始"
              this.button[0].class = "primary"
              let msg = {
                depth: this.depth,
                mode: this.mode,
                israndom: this.israndom,
                istip: this.istip
              }
              this.socket.sendmsg(msg)
              this.socket.close()
              this.$store.dispatch('user/setClear', false)
            }
          })
          break
      }
    },
    submitForm(flag) {
      if (flag === 0) {
        this.dialogFormVisible = false
        this.status = false
        this.button[0].text = "开始"
        this.button[0].class = "primary"
      } else if (flag === 1) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            const {ip, port, username} = this.form
            this.socket = Socket
            this.socket.init(this, ip, port, username)
            this.socket.open()
            if (this.mode) {
              let msg = {
                url: 'setting',
                username: this.form.username
              }
              this.socket.sendmsg(msg)
            }
            this.battle = true
          } else {
            return false
          }
        })
      } else if (flag === 2) {
        this.battle = false
        this.status = false
        this.button[0].text = "开始"
        this.button[0].class = "primary"
        this.socket.close()
        this.$store.dispatch('user/setPause', true)
      } else if (flag === 3) {
        this.$store.dispatch('user/setPause', false)
        let msg = {
          url: 'connect',
          depth: this.depth,
          mode: this.mode,
          israndom: this.israndom,
          istip: this.istip,
          username: this.form.username,
          subusername: this.form.subusername
        }
        this.socket.sendmsg(msg)
      }
    }
  }
}
</script>

<style scoped>
.begin_button {
  height: 100%;
  width: 100%;
}

.el-row {
  margin: 0 auto !important;
  width: 60%;
}

</style>
