<template>
  <Row type="flex" justify="center" align="top">
    <Col span="24">
      <Card>
        <p slot="title">table中自定义列render中jsx写法</p>
        <div style="text-align: right;">
          <Button type="primary" size="default">添加</Button>
          <Button type="primary" size="default" to="head" style="margin-left: 10px;">header</Button>
          <Button type="primary" size="default" to="modal" style="margin-left: 10px;">modal</Button>
        </div>
        <Table style="margin-top: 10px;" :columns="tableTitle" :data="data"></Table>
        <Button style="margin-top: 15px;" type="warning" size="default" @click="getAllDataHandler">获取所有数据</Button>
      </Card>
    </Col>
  </Row>
</template>

<script type="text/jsx">
  // @ is an alias to /src

  export default {
    name: 'home',
    data () {
      return {
        tableTitle: [
          {
            title: '姓名',
            align: 'center',
            render: (h, params) => {
              return <i-input value={params.row.name}
                              onOn-change={this.modelHandler.bind(this, params, 'name')}></i-input>
            }
          }, {
            title: '性别',
            align: 'center',
            render: (h, params) => {
              return <i-select value={params.row.gender} onOn-change={this.selectHandler.bind(this, params)}>
                <i-option value="0" label="男"></i-option>
                <i-option value="1" label="女"></i-option>
              </i-select>
            }
          }, {
            title: '年龄',
            align: 'center',
            render: (h, params) => {
              return <i-input value={params.row.age}
                              onOn-change={this.modelHandler.bind(this, params, 'age')}></i-input>
            }
          }, {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              // 如果使用map去代替v-for, 则需要在回调中传入this来保证回调函数的this指向
              // 绑定的事件如果传递在methods中的话，则需要使用bind来保证运行时的this指向
              // 所以 this.btnClickHandler是在渲染页面时给当列绑定事件, 之所以用this.btnClickHandler而不是btnClickHandler,是因为btnClickHandler是写在methods中。
              // 如果是定义在render中。则可以 nativeOnClick={btnClickHandler}
              // bind的使用是何证这我们绑定的函数在运行时this的指向是当前的实例，这样我们可以在这个方法中使用 data 中的数据
              // 类似 react 中的 this.methodXXX.bind(this)
              return <div style="display:flex;flexDirection:row;justifyContent:space-around;alignItems:center;">
                {
                  [1, 2, 3, 4].map((item) => {
                    return <i-button type="primary" size="small"
                                     nativeOnClick={this.btnClickHandler.bind(this, params.row, item)}>Btn-{item}</i-button>
                  })
                }
              </div>
            }
          }
        ],
        data: [
          {
            name: '张一',
            age: 12,
            gender: null
          }, {
            name: '张二',
            age: 22,
            gender: null
          }, {
            name: '张三',
            age: 32,
            gender: null
          }, {
            name: '张四',
            age: 42,
            gender: null
          }
        ]
      }
    },
    methods: {
      /**
       * 实现双向绑定
       * @param params 当然列的数据 params.row 就是当前列
       * @param key 当然列要绑定的属性名称
       * @param e eventInput对象
       */
      modelHandler (params, key, e) {
        let v = e.target.value
        let { index, row } = params
        // params.row[key] = v // 可以改变当前行数据，但是获取this.data访问所有数据时，数据没有发生改变 所以用下面的方法
        row[key] = v
        this.data[index] = row // 直接改变当前行 这样可以this.data中的数据就会发生改变
        // 另外，data本身是一个数组，如果更复杂的情况要对象中要新增属性的时候，需要使用$set来添加数据，从而触发渲染。
      },
      /**
       * iview 对select组件提供的on-change
       * @param params
       * @param v
       */
      selectHandler (params, v) {
        console.log(v)
        params.row.gender = v
      },
      /**
       * click 事件
       * @param row
       * @param v
       */
      btnClickHandler (row, v) {
        console.log(row, v)
      },
      getAllDataHandler () {
        console.log(this.data)
      }
    }
  }
</script>
