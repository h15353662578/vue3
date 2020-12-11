<template>
  <a-form
    :model="data"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
  >
    <a-form-item label="商品名">
      <a-input v-model:value="data.comName" />
    </a-form-item>
    <a-form-item label="商品价格">
      <a-input v-model:value="data.comPrice" />
    </a-form-item>
    <a-form-item label="商品首字母">
      <a-input v-model:value="data.comFirstChar" />
    </a-form-item>
    <a-form-item label="商品品牌">
      <a-input v-model:value="data.comBrand" />
    </a-form-item>
    <a-form-item label="商品分类">
      <a-select v-model:value="data.comClass" placeholder="选择商品类别">
        <a-select-option value="酒水饮料">酒水饮料</a-select-option>
        <a-select-option value="零食小食">零食小食</a-select-option>
        <a-select-option value="方便速食">方便速食</a-select-option>
        <a-select-option value="生活日用">生活日用</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="商品状态">
      <a-select v-model:value="data.comStatus" placeholder="选择商品状态">
        <a-select-option value="充足">充足</a-select-option>
        <a-select-option value="请补货">请补货</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">新建</a-button>
      <a-button style="margin-left: 10px">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { addStore } from '@/api/addstore'

export default {
  data() {
    return {
      wrapperCol: { span: 4 },
      data: {
        comBrand: '',
        comName: '',
        comPrice: '',
        comFirstChar: '',
        comClass: undefined,
        comStatus: undefined,
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
      addStore(key).then(() => {})
    },

    onSubmit() {
      this.dataList.push(this.data)
      addStore(JSON.stringify(this.dataList[0])).then(() => {
        console.log('submit', this.data)
        window.location.reload()
      })
    },
  },
}
</script>
