<template>
  <Table v-bind="$attrs" v-on="$listeners"></Table>
</template>

<script type="text/jsx">
  import styles from './table-runder.module.less'
  export default {
    name: 'TableRender',
    props: {
      openAction: { // 是否开启操作列
        type: Boolean,
        default: true
      },
      action: { // 操作列附带的基础配置
        type: Object,
        default: () => {
          return {
            title: '操作',
            fixed: 'right',
            align: 'center',
            name: 'action'
          }
        }
      }
    },
    created () {
      this.openAction && this.mergeColumns()
    },
    methods: {
      mergeColumns () {
        const { columns } = this.$attrs
        if (columns && columns[columns.length - 1].name === 'action') {
          return
        }
        const merge = this.getActions()
        columns.push(merge)
        this.$attrs.columns = columns
      },
      getActions () {
        const action = { ...this.action }
        let self = this
        return {
          ...action,
          render (h, params) {
            return (
              <div class={styles['table-btn']}>
                <i-button type="success" size="small" nativeOnClick={self.viewHandle.bind(self, params)}>查看</i-button>
                <i-button nativeOnClick={self.editorHandle.bind(self, params)} type="primary"
                          size="small">编辑
                </i-button>
                <i-button nativeOnClick={self.removeHandle.bind(self, params)} type="error"
                          size="small">删除
                </i-button>
              </div>
            )
          }
        }
      },
      viewHandle (params) {
        this.$emit('on-view', params)
      },
      editorHandle (params) {
        this.$emit('on-editor', params)
      },
      removeHandle (params) {
        this.$emit('on-remove', params)
      }
    }
  }
</script>

<style scoped>

</style>
