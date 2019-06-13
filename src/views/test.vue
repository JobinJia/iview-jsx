<template>
  <div class="container">
    <h2>tableRender</h2>
    <TableRender :open-action="true" :columns="tableTitle" :data="testList" @on-view="viewHandle"></TableRender>
  </div>
</template>

<script type="text/jsx">
  import TableRender from '@/common/TableRender'

  export default {
    name: 'test',
    components: {
      TableRender
    },
    data () {
      return {
        testList: [
          { name: '张三', status: true },
          { name: '李四', status: true },
          { name: '王五', status: false },
          { name: '钱六', status: true }
        ],
        tableTitle: [
          {
            title: '序号',
            fixed: 'left',
            align: 'center',
            width: 65,
            type: 'index'
          }, {
            title: '名称',
            key: 'name'
          }, {
            title: '状态',
            align: 'center',
            minWidth: 120,
            key: 'status',
            render: (h, params) => {
              const { row: { status } } = params
              return (
                <p>{status ? '是' : '否'}</p>
              )
            }
          }
          // 指定列属性name为action，可启用自定义的操作，可以覆盖默认的操作栏的设置： 注: open-action 设置为false后失效
          // {
          //   title: 'Action',
          //   name: 'action',
          //   render: (h, params) => {
          //     return (
          //       <div>
          //         <i-button type="primary">View</i-button>
          //         <i-button type="primary">Del</i-button>
          //       </div>
          //     )
          //   }
          // }
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
