<template>
  <Table style="margin-top: 10px;" :columns="columns" :data="tableData"></Table>
</template>

<script type="text/jsx">
  export default {
    name: 'TableRender',
    props: {
      tableTitle: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      actions: {
        type: Function,
        default: (self) => {
          return {
            title: '操作',
            render: (h, params) => {
              return (
                <div style="display:flex; flexDirection: row;justifyContent: center; alignItems:center;">
                  <i-button type="success" size="small" nativeOnClick={self.viewHandle.bind(self, params)}>查看</i-button>
                  <i-button style="marginLeft: 5px;" nativeOnClick={self.editorHandle.bind(self, params)} type="primary"
                            size="small">编辑
                  </i-button>
                  <i-button style="marginLeft: 5px;" nativeOnClick={self.removeHandle.bind(self, params)} type="error"
                            size="small">删除
                  </i-button>
                </div>
              )
            }
          }
        }
      }
    },
    data () {
      return {
        columns: [],
        acts: {}
      }
    },
    watch: {
      tableTitle: {
        handler (n, o) {
          if (n) {
            this.initTableTitle(n)
          }
        },
        immediate: true
      }
    },
    methods: {
      viewHandle (params) {
        this.$emit('view-item', params)
      },
      initTableTitle (list) {
        let cache = JSON.parse(JSON.stringify(list))
        let act = this.actions(this)
        cache.push(act)
        this.columns = cache
      },
      editorHandle (params) {
      },
      removeHandle (params) {
      }
    }
  }
</script>

<style scoped>

</style>
