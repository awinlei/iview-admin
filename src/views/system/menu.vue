<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-game-controller-b"></Icon>
                        菜单列表[本地分页]
                    </p>
                    <Row>
                        <Select v-model="pageNum" icon="search" placeholder="请选择数量"  @on-change="changePageNum" style="width:120px;float:left;">
                            <Option v-for="item in pageNumList" :value="item.value" :key="item.value" v-if="item.value == 'all'">{{ $t('allText') }}</Option>
                            <Option :value="item.value" :key="item.value" v-else>{{item.value}} {{ $t('pageNumText') }}</Option>
                        </Select>
                        <Input v-model="searchCon" @on-change="handleSearch" icon="search" placeholder="请输入关键字搜搜..." style="width: 200px;float: right;" />
                    </Row>
                    <Row class="margin-top-10 searchable-table-con">
                        <Table border ref="gameTable" :loading="loading" :columns="tableColumns" :data="tableData"></Table>
                        <div style="margin: 10px;overflow: hidden">
                        <span style="margin-right: 16px;">
                          <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 下载</Button>
                          <Button type="success" size="large" @click="popModal = true">添加</Button>
                          <!-- 模态框添加窗口 -->
                          <Modal
                              v-model="popModal"
                              title="添加游戏"
                              :closable="false"
                              :styles="{top: '20px'}"
                              @on-ok="addNew"
                              @on-cancel="cancelAdd">
                              <Row type="flex" justify="center">
                               <Form :model="formItem" :label-width="80" ref="gameForm">
                                  <FormItem label="Input" prop="input">
                                      <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                                  </FormItem>
                                  <FormItem label="Select">
                                      <Select v-model="formItem.select">
                                          <Option value="beijing">New York</Option>
                                          <Option value="shanghai">London</Option>
                                          <Option value="shenzhen">Sydney</Option>
                                      </Select>
                                  </FormItem>
                                  <FormItem label="DatePicker">
                                      <Row>
                                          <Col span="11">
                                              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                                          </Col>
                                          <Col span="2" style="text-align: center">-</Col>
                                          <Col span="11">
                                              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                                          </Col>
                                      </Row>
                                  </FormItem>
                                  <FormItem label="Radio">
                                      <RadioGroup v-model="formItem.radio">
                                          <Radio label="male">Male</Radio>
                                          <Radio label="female">Female</Radio>
                                      </RadioGroup>
                                  </FormItem>
                                  <FormItem label="Checkbox">
                                      <CheckboxGroup v-model="formItem.checkbox">
                                          <Checkbox label="Eat"></Checkbox>
                                          <Checkbox label="Sleep"></Checkbox>
                                          <Checkbox label="Run"></Checkbox>
                                          <Checkbox label="Movie"></Checkbox>
                                      </CheckboxGroup>
                                  </FormItem>
                                  <FormItem label="Switch">
                                      <i-switch v-model="formItem.switch" size="large">
                                          <span slot="open">On</span>
                                          <span slot="close">Off</span>
                                      </i-switch>
                                  </FormItem>
                                  <FormItem label="Slider">
                                      <Slider v-model="formItem.slider" range></Slider>
                                  </FormItem>
                                  <FormItem label="Text">
                                      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                                  </FormItem>
                              </Form>
                              </Row>
                              <div slot="footer">
                                  <Button type="text" @click="cancelAdd">Cancel</Button>
                                  <Button type="ghost"  @click="handleReset('gameForm')" style="margin-left: 8px">Reset</Button>
                                  <Button type="primary" :loading="loadResult" @click="addNew">Submit</Button>
                              </div>
                          </Modal>
                          <!-- 模态框添加窗口 -->
                          </span>
                        <div style="float: right;">
                            <Page :total="dataCount" :page-size="pageSize" :current="currentPage" show-total @on-change="changePage"></Page>
                        </div>
                    </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import util from '@/libs/util';

export default {
  name: "game",
  data() {
    return {
      popModal: false,
      loadResult: false,
      formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [0, 50],
                    textarea: ''
                },
      searchCon: "",
      initTable: [],
      tableData: [],
      dataCount: 0,
      pageSize:  10,
      currentPage: 1,
      loading:  true,
      pageNum:  '',
      pageNumList: [
          {value: '10'},
          {value: '20'},
          {value: '50'},
          {value: '100'},
          {value: 'all'},
      ],
      tableColumns: [
        {
          title: "游戏名称",
          key: "name"
        },
        {
          title: "游戏主页",
          key: "site"
        },
        {
          title: "游戏接口",
          key: "api_url"
        },
        {
          title: "状态",
          key: "status",
          sortable: true,
          render: (h, params) => {
            const row = params.row;
            const color = row.status === 1 ? "blue" : row.status === 2 ? "green" : "red";
            const text =  row.status === 1 ? "测试" : row.status === 2 ? "上线" : "下线";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "描述",
          key: "portrayal",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.portrayal.length + "portrayals",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.portrayal.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData[params.index].portrayal.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "在线玩家",
          key: "people",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.people.length + "customers",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.people.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData[params.index].people.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item.n + "：" + item.c + "People"
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "运行时间",
          key: "time",
          render: (h, params) => {
            return h("div", "大约 " + params.row.time + " 天");
          }
        },
        {
          title: "开服时间",
          key: "update",
          render: (h, params) => {
            return h("div",util.formatDate(this.tableData[params.index].update)
            );
          }
        },
        {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, '查看'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                }, '删除')
            ]);
        }
        }
      ]
    };
  },
  methods: {
    // 初始化数据
    init(params) {
      this.mockTableData(params);
    },
    // 搜索结果
    search(item, queryCon) {
      // 搜索条件小写
      queryCon = queryCon.trim().toLowerCase();
      for (let argu in item) {
        // 定义一个内部变量，将数据强制转换为字符串
        let val = String(item[argu]);
        val = val.toLowerCase();
        if (val.length > 0 && val.indexOf(queryCon) > -1) {
            return true;
        }
      }
      return false;
    },
    // 搜索条件
    handleSearch() {
      this.tableData = this.initTable;
      let res = this.tableData;
      let dataClone = this.tableData;
      res = dataClone.filter(item => {
          return this.search(item,this.searchCon);
      });
      this.tableData = res;
      this.dataCount = res.length;
      this.currentPage = 1;
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockTableData(params) {
      let ajaxData = [];
      util.ajaxPost("menu", params)
        .then(
          function(response) {
            // 遍历结果数据
            if(response.data.data.length > 0){
              response.data.data.forEach(function(item) {
                ajaxData.push({
                  name: item.name + Math.floor(Math.random() * 7 + 1),
                  site: item.site,
                  api_url: item.api_url,
                  status: Math.floor(Math.random() * 3 + 1),
                  portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
                  people: [{}],
                  time: Math.floor(Math.random() * 7 + 1),
                  update: new Date()
                });
              });
            }
            // 赋值给当前的表格
            this.tableData = this.initTable = ajaxData;
            // 数据总数
            this.dataCount = response.data.data.length;
            // 是否需要对初始数据分页
            if(this.dataCount > this.pageSize){
                this.tableData = this.initTable.slice(0,this.pageSize);
            }
            // 加载效果重置
            this.loading = false;

          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    // 改变分页
    changePage(index) {
      var _start = ( index - 1 ) * this.pageSize;
      var _end = index * this.pageSize;
      // console.log(_start + ' ' + _end);
      // console.log(this.initTable.slice(_start,_end));
      this.tableData = this.initTable.slice(_start,_end);
      this.currentPage = index;
      console.log('changePage');
      console.log(this.pageSize + ' ' + this.dataCount + ' ' + this.currentPage);
    },
    changePageNum(){
      this.pageSize = parseInt(this.pageNum);
      this.pageSize = this.pageSize > 0 ? this.pageSize : this.dataCount;
      this.tableData = this.initTable.slice(0,this.pageSize);
      this.currentPage = 1;
      console.log('changePageNum');
      console.log(this.pageSize + ' ' + this.dataCount + ' ' + this.currentPage);
    },
    // 显示详细信息
    show (index) {
      this.$Modal.info({
        title: '详细信息',
            content: `Name：${this.tableData[index].name}<br>Site：${this.tableData[index].site}<br>Status：${this.tableData[index].status}`
          })
      },
    // 删除
    remove (index) {
      this.tableData.splice(index, 1);
    },
    // 导出
    exportData (type) {
            if (type === 1) {
                this.$refs.gameTable.exportCsv({
                    filename: this.name
                });
            } else if (type === 2) {
                this.$refs.gameTable.exportCsv({
                    filename: this.name,
                    original: false
                });
            }
    },
    addNew () {
        // console.log(this.$refs);
        this.loadResult = true;
        let formItem = this.formItem;
        console.log(this.formItem);
        // 执行异步
          setTimeout(() => {
            this.popModal = false;
              this.$Message.success('添加成功');
          }, 2000);
    },
    cancelAdd () {
      this.loadResult = false;
      this.popModal = false;
      this.$Message.error('取消成功');
    },
    handleReset (formName) {
      this.loadResult = false;
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.$Message.error('重置成功');
    },
  },
  mounted() {

    let params = {
      cmdId: "getGameList", //获取游戏列表操作
      gameId: localStorage.gameId
    };

    this.init(params);
  }
};

</script>