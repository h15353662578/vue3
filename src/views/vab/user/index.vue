<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  ></a-table>
</template>
<script>
import { getList } from '@/api/use'
const columns = [
  {
    title: '订单id',
    dataIndex: 'orderId',
    slots: { customRender: 'orderId' },
  },
  {
    title: '订单商品名',
    dataIndex: 'orderStoreName',
    slots: { customRender: 'orderStoreName' },
  },
  {
    title: '订单价格',
    dataIndex: 'orderStorePrice',
    slots: { customRender: 'orderStorePrice' },
  },
  {
    title: '订单数量',
    dataIndex: 'orderStoreMath',
    slots: { customRender: 'orderStoreMath' },
  },
  {
    title: '订单合计',
    dataIndex: 'orderStoreTot',
    slots: { customRender: 'orderStoreTot' },
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    slots: { customRender: 'orderStatus' },
  },
  {
    title: '订单地址',
    dataIndex: 'orderUserAddress',
    slots: { customRender: 'orderUserAddress' },
  },
  {
    title: '',
    dataIndex: '',
    slots: { customRender: 'operation' },
  },
]

const data = []
data.push({})

export default {
  data() {
    return {
      data: [],
      pagination: {
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
      },
      query: {},
      loading: false,
      columns,
    }
  },
  mounted() {
    this.fetch()
  },
  props: {
    text: String,
  },
  methods: {
    handleTableChange(pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch()
    },
    fetch() {
      this.loading = true
      getList({
        pageSize: this.pagination.pageSize,
        current: this.pagination.current,
      }).then(({ data, total }) => {
        const pagination = { ...this.pagination }
        pagination.total = total
        this.loading = false
        this.data = data
        this.pagination = pagination
      })
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
  },
}
</script>
