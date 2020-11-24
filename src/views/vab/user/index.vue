<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  ></a-table>
  <a-steps>
    <a-step status="finish" title="Login">
      <a-icon slot1="icon" type="user" />
    </a-step>
    <a-step status="finish" title="Verification">
      <a-icon slot2="icon" type="solution" />
    </a-step>
    <a-step status="process" title="Pay">
      <a-icon slot3="icon" type="loading" />
    </a-step>
    <a-step status="wait" title="Done">
      <a-icon slot4="icon" type="smile-o" />
    </a-step>
  </a-steps>
</template>
<script>
import { getList } from '@/api/table'
const columns = [
  {
    title: '商品名',
    dataIndex: 'comName',
  },
  {
    title: '商品价格',
    dataIndex: 'comPrice',
  },
  {
    title: '品牌',
    dataIndex: 'comBrand',
  },
  {
    title: '状态',
    dataIndex: 'comStatus',
  },
  {
    title: '操作',
    dataIndex: 'operation',
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
  props: {},
  methods: {},
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
}
</script>
