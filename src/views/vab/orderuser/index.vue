<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #operation2="{ text, record }">
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
import { getList, deleteList } from '@/api/orderuser'
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderId',
  },
  {
    title: '用户姓名',
    dataIndex: 'orderUserName',
  },
  {
    title: '用户账号',
    dataIndex: 'orderUserUsername',
  },
  {
    title: '用户手机号',
    dataIndex: 'orderUserPhone',
  },
  {
    title: '操作',
    dataIndex: 'operation2',
    slots: { customRender: 'operation2' },
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
