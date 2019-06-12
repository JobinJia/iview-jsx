<template lang="html">
  <Row type="flex" align="top" justify="start">
    <Col span="24">
      <Card>
        <p slot="title">table中head中多表头jsx写法</p>
        <div style="text-align: right;">
          <Button type="primary" size="default">添加</Button>
        </div>
        <Table style="margin-top: 10px;" :columns="tableTitle" :data="tableData"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  export default {
    name: 'jsx-table-head',
    data () {
      return {
        tableChild: [
          {
            id: 1,
            title: 'A'
          }, {
            id: 2,
            title: 'B'
          }, {
            id: 3,
            title: 'C'
          }, {
            id: 4,
            title: 'D'
          }, {
            id: 5,
            title: 'E'
          }, {
            id: 6,
            title: 'F'
          }
        ],
        tableTitle: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            fixed: 'left',
            type: 'index'
          }, {
            fixed: 'right',
            title: '操作',
            align: 'center',
            tooltip: true,
            width: 220,
            render: (h, params) => {
              let vm = <div style="display:flex;flexDirection:row;justifyContent:space-around;">
                <i-button type="primary" size="small"replace>查看</i-button>
                <i-button type="error" size="small" style="marginLeft:3px;">删除</i-button>
              </div>
              return vm
            }
          }
        ],
        tableData: []
      }
    },
    created () {
      // 初始化页面数据
      this.initPage()
    },
    methods: {
      initPage () {
        this.initTableTitle() // 初始化代码
        this.getList() // 异步获取数据
      },
      /**
       * 初始化表头
       */
      initTableTitle () {
        let insert = this.getTableChild()
        let titles = this.tableTitle
        let stash = Array.from(titles)
        titles.forEach((item, i) => {
          if (i === 0) {
            let j = i
            for (let x = 0; x < insert.length; x++) {
              stash.splice(j + x + 1, 0, insert[x])
            }
          }
        })
        this.tableTitle = stash
      },
      /**
       * 遍历获得随机的数组对象
       * @returns {Array}
       */
      getTableChild () {
        // 相同类型下所有的表头的数组
        let arr = [
          {
            title: 'A1',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <div>{o.t1}</div>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: 'A2',
            align: 'center',
            minWidth: 80,
            tooltip: true,
            render: (h, params) => {
              // console.log(params.column.spec)
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.t2}
                                onOn-change={this.bindVal.bind(this, params, objName, 't2')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 't2')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: 'A3',
            align: 'center',
            tooltip: true,
            minWidth: 80,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.t3}
                                onOn-change={this.bindVal.bind(this, params, objName, 't3')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 't3')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }, {
            title: 'A4',
            align: 'center',
            tooltip: true,
            minWidth: 100,
            render: (h, params) => {
              let objName = this.getObjName(params.column.spec)
              let o = params.row[objName]
              if (o) {
                return <i-input size="default" value={o.t4}
                                onOn-change={this.bindVal.bind(this, params, objName, 't4')}
                                onOn-blur={this.modifyItem.bind(this, params, o, 't5')}></i-input>
              } else {
                return <div>暂无</div>
              }
            }
          }
        ]
        let list = this.tableChild // 要拼接的原表头
        let stash = [] // 拼接后的结果
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          let title = item.title
          let arr1 = this.copyData(arr) // 这里得每回重新创建一份新的数组，否则会出引用传递，导致每份数据最后变成一样
          for (let j = 0; j < arr1.length; j++) {
            arr1[j].spec = title
          }
          let obj = {
            align: 'center',
            tooltip: true,
            id: item.id,
            title: item.title,
            children: arr1
          }
          stash.push(obj)
        }
        return stash
      },
      /**
       * 复制一个对象（简单一级对象带函数）
       * @param obj
       * @returns {*}
       */
      clone (obj) {
        if (obj === null) return null
        if (typeof obj !== 'object') return obj
        if (obj.constructor === Date) return new Date(obj)
        let newObj = new obj.constructor() // 保持继承链
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
            let val = obj[key]
            /* eslint-disable */
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val // 使用arguments.callee解除与函数名的耦合，这样每个复制出来的render函数都能继续使用
          }
        }
        return newObj
      },
      /**
       * 遍历数组进行复制
       * @param arr
       * @returns {Array}
       */
      copyData (arr) {
        let res = []
        for (let i in arr) {
          let item = arr[i]
          let o = this.clone(item)
          res.push(o)
        }
        return res
      },
      /**
       * 手动双向绑定
       * @param obj
       * @param objName
       * @param key
       * @param event
       */
      bindVal (obj, objName, key, event) {
        let v = event.target.value
        obj.row[objName][key] = v
      },
      /**
       * 挑选数据
       * @param data
       * @param str
       * @returns {*}
       */
      getSpec (data, str) {
        return data.find(item => item.spec === str)
      },
      /**
       * 异步获取数据，因为没有后台，这儿伪造了
       */
      getList () {
        let data = []
        for (let i = 0; i < 10; i++) {
          let leves = ['A', 'B', 'C', 'D', 'E', 'F'] // 对应二级表头ABCDEF中的某一列的值
          let stashArr = []
          for (let j = 0; j < leves.length; j++) {
            let rIndex = Math.floor(Math.random() * leves.length) // 随机一列中有值
            stashArr.push({
              spec: leves[rIndex],
              t1: Math.floor(Math.random() * 100),
              t2: Math.floor(Math.random() * 100),
              t3: Math.floor(Math.random() * 100),
              t4: Math.floor(Math.random() * 100)
            })
          }
          // 去重
          stashArr = Array.from(new Set(stashArr))
          data.push({
            spec: stashArr
          })
        }
        /**
         * 绑定到每一个对象上方便处理，
         * 这里可能有更优的处理方式 :) 目前我没找到，因为 iview 好像没有提供 表头分组的 render 写法~~so ~ :(
         */
        data.forEach(item => {
          let levela = this.getSpec(item.spec, 'A')
          let levelb = this.getSpec(item.spec, 'B')
          let levelc = this.getSpec(item.spec, 'C')
          let leveld = this.getSpec(item.spec, 'D')
          let levele = this.getSpec(item.spec, 'E')
          let levelf = this.getSpec(item.spec, 'F')
          item.levela = levela
          item.levelb = levelb
          item.levelc = levelc
          item.leveld = leveld
          item.levele = levele
          item.levelf = levelf
        })
        this.tableData = data
      },
      /**
       * render 中确认是哪一列的数据
       * @param str
       * @returns {string}
       */
      getObjName (str) {
        switch (str) {
          default:
            break
          case 'A':
            return 'levela'
          case 'B':
            return 'levelb'
          case 'C':
            return 'levelc'
          case 'D':
            return 'leveld'
          case 'E':
            return 'levele'
          case 'F':
            return 'levelf'
        }
      },
      updateList () {
        this.$nextTick(() => {
          this.getList()
        })
      },
      async modifyItem (params, current, t) {
        console.log('修改数据')
      }
    }
  }
</script>

<style scoped>
</style>
