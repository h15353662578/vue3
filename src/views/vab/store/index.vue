<template>
  <a-form :model="data" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="用户姓名">
      <a-input v-model:value="data.comName" />
    </a-form-item>
    <a-form-item label="用户账号">
      <a-input v-model:value="data.comPrice" />
    </a-form-item>
    <a-form-item label="账号密码">
      <a-input v-model:value="data.comFirstChar" />
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-model:value="data.comBrand" />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="data.comClass" />
    </a-form-item>
    <a-form-item label="性别">
      <a-input v-model:value="data.comStatus" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">新建</a-button>
      <a-button style="margin-left: 10px">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { addStore } from '@/api/store'

export default {
  data() {
    return {
      wrapperCol: { span: 4 },
      data: {
        comName: '',
        comPrice: '',
        comFirstChar: '',
        comBrand: '',
        comClass: '',
        comStatus: '',
      },
      dataList: [],
      pagination: {
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
      },
      query: {},
      loading: false,
    }
  },
  mounted() {},
  props: {
    text: String,
  },
  components: {},
  methods: {
    onAdd(key) {
      addStore(key).then(() => {
        this.fetch()
      })
    },
  },
}
</script>
