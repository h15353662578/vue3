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
import { getList } from '@/api/order'
const columns = [
  {
    title: '订单id',
    dataIndex: 'order_id',
  },
  {
    title: '订单商品名',
    dataIndex: 'order_store_name',
  },
  {
    title: '订单价格',
    dataIndex: 'order_store_price',
  },
  {
    title: '订单数量',
    dataIndex: 'order_store_math',
  },
  {
    title: '订单合计',
    dataIndex: 'order_store_tot',
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
  },
  {
    title: '订单地址',
    dataIndex: 'order_user_address',
  },
  {
    title: '用户姓名',
    dataIndex: 'order_user_name',
  },
  {
    title: '用户账号',
    dataIndex: 'order_user_username',
  },
  {
    title: '用户手机号',
    dataIndex: 'order_user_phone',
  },
]

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
  },
}
</script>
