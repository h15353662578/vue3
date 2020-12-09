<template>
  <a-button type="primary" shape="circle" @click="SearchOutlined">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <a-form :model="data" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="商品名">
      <a-input v-model:value="data.comName" />
    </a-form-item>
    <a-form-item label="商品价格">
      <a-input v-model:value="data.comPrice" />
    </a-form-item>
    <a-form-item label="视频首字母">
      <a-input v-model:value="data.comFirstChar" />
    </a-form-item>
    <a-form-item label="商品品牌">
      <a-input v-model:value="data.comBrand" />
    </a-form-item>
    <a-form-item label="商品分类">
      <a-input v-model:value="data.comClass" />
    </a-form-item>
    <a-form-item label="商品状态">
      <a-input v-model:value="data.comStatus" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">新建</a-button>
      <a-button style="margin-left: 10px">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { addStore } from '@/api/addstore'
import { SearchOutlined } from '@ant-design/icons-vue'

export default {
  data() {
    return {
      wrapperCol: { span: 4 },
      data: {
        comBrand: '',
        comName: '',
        comPrice: '',
        comFirstChar: '',
        comstatus: '',
        comClass: '',
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
  components: {
    SearchOutlined,
  },
  methods: {
    onAdd(key) {
      addStore(key).then(() => {})
    },

    onSubmit() {
      this.dataList.push(this.data)
      addStore(JSON.stringify(this.dataList[0])).then(() => {})
      console.log('submit', this.data)
    },
  },
}
</script>
