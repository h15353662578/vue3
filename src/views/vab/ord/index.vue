<template>
  <a-table
    :columns="columns"
    :row-key="(data) => data"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template
      v-for="col in [
        'orderId',
        'orderStoreName',
        'orderStorePrice',
        'orderStoreMath',
        'orderStoreTot',
        'orderStatus',
        'orderUserAddress',
      ]"
      #[col]="{ text, record }"
      :key="col"
    >
      <div>
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="save(record.orderId)">确定</a>
        </span>
        <span v-else @click="edit(record.key)">
          <a
            v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
            @click="edit(record.orderId)"
          >
            修改
          </a>
        </span>
      </div>
    </template>
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
import { getList, editList, deleteList } from '@/api/ord'
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
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
  {
    title: '操作',
    dataIndex: 'operation1',
    slots: { customRender: 'operation1' },
  },
]

let key = 0
const data = []
data.push({
  key: 0,
  orderId: '',
  orderStoreName: '',
  orderStorePrice: '',
  orderStoreMath: '',
  orderStoreTot: '',
  orderStatus: '',
  orderUserAddress: '',
})

export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }))
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
      editingKey: '',
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
        // this.data = data
        this.data = data.map((item) => {
          key++
          return {
            key,
            ...item,
          }
        })
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
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
      editList(key).then(() => {})
    },
    save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.orderId)[0]
      const targetCache = newCacheData.filter((item) => {
        key === item.orderId
      })[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      editList(target).then((res) => {
        console.log(res)
        this.editingKey = ''
        this.fetch()
      })
    },
    onDelete(key) {
      // key为id，调用删除方法
      deleteList(key).then(() => {
        this.fetch()
      })
    },
  },
}
</script>
