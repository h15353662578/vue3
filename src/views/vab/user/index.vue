<template>
  <a-form :model="data" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="用户姓名">
      <a-input v-model:value="data.name" />
    </a-form-item>
    <a-form-item label="用户账号">
      <a-input v-model:value="data.userName" />
    </a-form-item>
    <a-form-item label="账号密码">
      <a-input v-model:value="data.password" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-model:value="data.userAge" />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="data.userPhone" />
    </a-form-item>
    <a-form-item label="性别">
      <a-input v-model:value="data.userSex" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">新建</a-button>
      <a-button style="margin-left: 10px">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { addUser } from '@/api/use'

const data = []
data.push({
  key: 0,
  id: '',
  name: '',
  userName: '',
  password: '',
  userSex: '',
  userAge: '',
  userPhome: '',
})

export default {
  data() {
    return {
      data: {
        name: '',
        userName: '',
        userAge: '',
        userSex: '',
        userPhone: '',
        password: '',
        data: [],
        pagination: {
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
        },
        query: {},
        loading: false,
      },
    }
  },
  mounted() {},
  props: {
    text: String,
  },
  methods: {
    onAdd(key) {
      addUser(key).then(() => {
        this.fetch()
      })
    },
    onSubmit(key) {
      addUser(key).then(() => {
        this.fetch()
      })
      console.log('submit', this.form)
    },
  },
}
</script>
