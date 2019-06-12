<template lang="html">
  <Row type="flex" align="top" justify="start">
    <Col span="24">
      <Card dis-hover>
        <p slot="title">iview Modal render实现</p>
        <Button type="primary" @click="testHandler">测试</Button>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  export default {
    name: 'jsx-modal',
    data () {
      return {
        check: false
      }
    },
    methods: {
      testHandler () {
        /*
        this.$Modal.confirm({
          render: (h) => {
            return h('div', {
              style: {
                // styles
              }
            }, [
              h('div', {
                style: {}
              }, [
                h('Icon', { style: {} }),
                h('p', { style: {} }, '操作成功!')
              ]),
              h('div', {}, [
                h('Checkbox', {}, '不再显示该弹窗')
              ])
            ])
          }
        })
        */
        // do something
        this.$Modal.confirm({
          render: (h) => {
            return <div style="display:flex;flexDirection:column;justifyContent:flex-start;alignItems:center;">
              <div style="width: 100%;display:flex;flexDirection:row;justifyContent:flex-start;alignItems:flex-start;">
                <icon type="checkmark-circled" size="30" color="#19be6b"></icon>
                <p style="fontSize:15px;lineHeight:27px;textIndent:10px;">操作成功!</p>
              </div>
              <div style="width: 100%;paddingLeft:30px;">
                <checkbox style="marginTop:25px;" value={this.check} onOn-change={this.bindModal.bind(this)}>
                  不再显示该弹窗
                </checkbox>
              </div>
            </div>
          },
          onOk: () => {
            this.$Message.success('确定')
            // do
          },
          onCancel: () => {
            this.$Message.warning('取消')
          }
        })
      },
      bindModal (v) {
        console.log(v)
        this.check = v
      }
    }
  }
</script>

<style scoped type="text/css" lang="less">

</style>
