<template>
  <div class="container">
    <h2>tableRender</h2>
    <TableRender :columns="tableTitle" :data="testList" @on-view="viewHandle"></TableRender>
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
        this.$Modal.info({
          content: JSON.stringify(params, null, '\t ')
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
  }
</style>
