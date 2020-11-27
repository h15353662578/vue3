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
        <a>下架</a>
      </a-popconfirm>
    </template>

    <template
      v-for="col in [
        'id',
        'comName',
        'comPrice',
        'comBrand',
        'comClass',
        'comStatus',
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
          <a @click="save(record.id)">确定</a>
        </span>
        <span v-else @click="edit(record.key)">
          <a
            v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
            @click="edit(record.id)"
          >
            修改
          </a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
import { getList, deleteList, editList } from '@/api/table'
const columns = [
  {
    title: '商品id',
    dataIndex: 'id',
    slots: { customRender: 'id' },
  },
  {
    title: '商品名',
    dataIndex: 'comName',
    slots: { customRender: 'comName' },
  },
  {
    title: '单品价格',
    dataIndex: 'comPrice',
    slots: { customRender: 'comPrice' },
  },
  {
    title: '商品品牌',
    dataIndex: 'comBrand',
    slots: { customRender: 'comBrand' },
  },
  {
    title: '商品分类',
    dataIndex: 'comClass',
    slots: { customRender: 'comClass' },
  },
  {
    title: '商品状态',
    dataIndex: 'comStatus',
    slots: { customRender: 'comStatus' },
  },
  {
    title: '',
    dataIndex: 'operation1',
    slots: { customRender: 'operation1' },
  },
  {
    title: '',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
]

let key = 0
const data = []
data.push({
  key: 0,
  id: '',
  comName: '',
  comBrand: '',
  comClass: '',
  comPrice: '',
  comStatus: '',
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
      const target = newData.filter((item) => key === item.id)[0]
      const targetCache = newCacheData.filter((item) => {
        key === item.id
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
  },
}
</script>
