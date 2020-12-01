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
        'id',
        'name',
        'userName',
        'password',
        'userSex',
        'userAge',
        'userPhome',
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
          <a @click="save(record.id)">Save</a>
        </span>
        <span v-else @click="edit(record.key)">
          <a
            v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
            @click="edit(record.id)"
          >
            编辑用户信息
          </a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
import { getList, editList } from '@/api/icon'
const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    slots: { customRender: 'id' },
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: '用户账号',
    dataIndex: 'userName',
    slots: { customRender: 'userName' },
  },
  {
    title: '用户年龄',
    dataIndex: 'userAge',
    slots: { customRender: 'userAge' },
  },
  {
    title: '用户电话',
    dataIndex: 'userPhone',
    slots: { customRender: 'userPhone' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
]
let key = 0
const data = []
data.push({
  key: 0,
  id: '',
  name: '',
  userName: '',
  password: '',
  userSex: '',
  userAge: '',
  userPhome: '',
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
