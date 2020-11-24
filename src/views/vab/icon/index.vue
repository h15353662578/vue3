<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #operation="{ text, record }">
      <a-popconfirm
        :title="text == undefined ? '' + '确定要删除吗' : text"
        @confirm="onDelete(record.id)"
      >
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import { getList, deleteList } from '@/api/icon'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '账号',
    dataIndex: 'userName',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '性别',
    dataIndex: 'userSex',
  },
  {
    title: '年龄',
    dataIndex: 'userAge',
  },
  {
    title: '手机号',
    dataIndex: 'userPhone',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
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
