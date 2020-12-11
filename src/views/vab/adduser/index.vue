<template>
  <a-form
    :model="data"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
  >
    <a-form-item label="用户姓名">
      <a-input v-model:value="data.name" />
    </a-form-item>
    <a-form-item label="用户账号" ref="userName" name="userName">
      <a-input v-model:value="data.userName" />
    </a-form-item>
    <a-form-item label="账号密码" name="password" ref="password">
      <a-input v-model:value="data.password" />
    </a-form-item>
    <a-form-item label="年龄" name="userAge" ref="userAge">
      <a-input v-model:value="data.userAge" />
    </a-form-item>
    <a-form-item label="手机号" name="userPhone" ref="userPhone">
      <a-input v-model:value="data.userPhone" />
    </a-form-item>
    <a-form-item label="性别">
      <a-select v-model:value="data.userSex" placeholder="请选择性别">
        <a-select-option value="男">男</a-select-option>
        <a-select-option value="女">女</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">新建</a-button>
      <a-button style="margin-left: 10px">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { addUser } from '@/api/adduser'

export default {
  data() {
    return {
      wrapperCol: { span: 4 },
      data: {
        name: '',
        userName: '',
        userPhone: '',
        userAge: '',
        userSex: undefined,
        password: '',
      },
      dataList: [],
      pagination: {
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
      },
      query: {},
      loading: false,
      rules: {
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 12,
            message: '请输入6~12位密码',
            trigger: 'blur',
          },
        ],

        userName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 12,
            message: '请输入9~14位账号',
            trigger: 'blur',
          },
        ],

        userAge: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur',
          },
        ],
        userPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            len: 11,
            message: '请输入11位手机号',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {},
  props: {
    text: String,
  },
  components: {},
  methods: {
    onAdd(key) {
      addUser(key).then(() => {})
    },
    onSubmit() {
      this.dataList.push(this.data)
      addUser(JSON.stringify(this.dataList[0])).then(() => {
        console.log('submit', this.data)
        location.reload()
      })
    },
  },
}
</script>
