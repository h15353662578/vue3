<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #operation1="{ text, record }">
      <a-popconfirm
        :title="text == undefined ? '' + '确定要删除吗' : text"
        @confirm="onDelete(record.orderId)"
      >
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import { getList, deleteList } from '@/api/ord'
const columns = [
  {
    title: '订单id',
    dataIndex: 'orderId',
  },
  {
    title: '订单商品名',
    dataIndex: 'orderStoreName',
  },
  {
    title: '订单价格',
    dataIndex: 'orderStorePrice',
  },
  {
    title: '订单数量',
    dataIndex: 'orderStoreMath',
  },
  {
    title: '订单合计',
    dataIndex: 'orderStoreTot',
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
  },
  {
    title: '订单地址',
    dataIndex: 'orderUserAddress',
  },
  {
    title: '操作',
    dataIndex: 'operation1',
    slots: { customRender: 'operation1' },
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
  props: {
    text: String,
  },
  methods: {
    onDelete(key) {
      // key为id，调用删除方法
      deleteList(key).then(() => {
        this.fetch()
      })
    },
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
