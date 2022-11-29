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
    <el-dialog :visible.sync="dialogFormVisible" title="网络连接" width="30%">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="form.port"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm(false)">取 消</el-button>
        <el-button type="primary" @click="submitForm(true)">连 接</el-button>
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
export default {
  name: "Begin",
  data() {
    return {
      // false: 未开始, true: 开始
      status: false,
      // false: 白方, true: 黑方
      turn: false,
      // 0: 白方认输, 1: 黑方认输 2: 和棋
      lose: 0,
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
      dialogFormVisible: false,
      centerDialogVisible: false,
      form: {
        ip: '',
        port: '',
        username: '',
        password: ''
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
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
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
  methods: {
    // 点击按钮
    handleClick(index) {
      switch (index) {
        case 0:
          if (!this.status) {
            this.status = true;
            this.button[0].text = "结束";
            this.dialogFormVisible = true;
            this.button[0].class = "danger";
          } else {
            this.status = false;
            this.button[0].text = "开始";
            this.button[0].class = "primary";
          }
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
          this.centerDialogVisible = true;
          break;
        case 3:
          this.$alert('很抱歉，您输掉了比赛', '五子棋', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'error',
                message: `很抱歉，您输掉了比赛`
              });
              this.status = false;
              this.button[0].text = "开始";
              this.button[0].class = "primary";
            }
          });
          break;
      }
    },
    submitForm(flag) {
      if (flag) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
          } else {
            return false;
          }
        });
      } else {
        this.dialogFormVisible = false
        this.status = false;
        this.button[0].text = "开始";
        this.button[0].class = "primary";
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
