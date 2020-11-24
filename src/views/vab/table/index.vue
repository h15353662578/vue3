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
        @confirm="onDelete(record.id)"
      >
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</template>
<script>
import { getList, deleteList } from '@/api/table'
const columns = [
  {
    title: '商品id',
    dataIndex: 'id',
  },
  {
    title: '商品名',
    dataIndex: 'comName',
  },
  {
    title: '单品价格',
    dataIndex: 'comPrice',
  },
  {
    title: '商品品牌',
    dataIndex: 'comBrand',
  },
  {
    title: '商品分类',
    dataIndex: 'comClass',
  },
  {
    title: '商品状态',
    dataIndex: 'comStatus',
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
