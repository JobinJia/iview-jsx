<template>
  <div class="container">
    <h2>tableRender</h2>
    <TableRender @view-item="viewHandle" :tableTitle="tableTitle" :tableData="testList"></TableRender>
  </div>
</template>

<script>
  import TableRender from '@/common/TableRender'

  export default {
    name: 'test',
    components: {
      TableRender
    },
    data () {
      return {
        testList: [
          { name: '张三' },
          { name: '李四' },
          { name: '王五' },
          { name: '钱六' }
        ],
        tableTitle: [
          {
            title: '序号',
            fixed: 'left',
            align: 'center',
            width: 65,
            type: 'index'
          }, {
            title: '状态',
            align: 'center',
            minWidth: 120,
            key: 'status'
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      viewHandle (params) {
        console.log(params)
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>
