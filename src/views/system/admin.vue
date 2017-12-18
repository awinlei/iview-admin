<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="person-add"></Icon>
                        用户列表[本地分页]
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
                          <Button type="success" size="large" @click="popModal = true" icon="android-add">添加</Button>
                          <!-- 模态框添加窗口 -->
                          <Modal
                              v-model="popModal"
                              title="添加用户"
                              :loading="loadResult"
                              :closable="false"
                              :styles="{top: '20px'}"
                              @on-ok="handleSubmit('formData')"
                              @on-cancel="handleCancel">
                              <Row type="flex" justify="center">
                              <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
                                  <FormItem label="账号" prop="name">
                                      <Input v-model="formData.name" placeholder="Enter your name"></Input>
                                  </FormItem>
                                  <FormItem label="真实姓名" prop="realname">
                                      <Input v-model="formData.realname" placeholder="Enter your realname"></Input>
                                  </FormItem>
                                  <FormItem label="邮件" prop="mail">
                                      <Input v-model="formData.mail" placeholder="Enter your e-mail"></Input>
                                  </FormItem>
                                  <FormItem label="手机" prop="mobile">
                                      <Input v-model="formData.mobile" placeholder="Enter your mobilephone"></Input>
                                  </FormItem>
                                  <FormItem label="渠道" prop="channel">
                                      <Select v-model="formData.channel" placeholder="选择渠道">
                                          <Option value="beijing">游族</Option>
                                          <Option value="shanghai">腾讯</Option>
                                          <Option value="shenzhen">小米</Option>
                                      </Select>
                                  </FormItem>
                                  <FormItem label="状态" prop="status">
                                      <RadioGroup v-model="formData.status">
                                          <Radio label="male">激活</Radio>
                                          <Radio label="female">未激活</Radio>
                                      </RadioGroup>
                                  </FormItem>
                                  <FormItem label="部门" prop="department">
                                      <CheckboxGroup v-model="formData.department">
                                          <Checkbox label="运维"></Checkbox>
                                          <Checkbox label="运营"></Checkbox>
                                          <Checkbox label="研发"></Checkbox>
                                      </CheckboxGroup>
                                  </FormItem>
                              </Form>
                              </Row>
                              <div slot="footer">
                                  <Button type="text" @click="handleCancel">取消</Button>
                                  <Button type="ghost" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
                                  <Button type="primary" @click="handleSubmit('formData')">提交</Button>
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
      loadResult: true,
      formData: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
      ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: 'The realname cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    mobile: [
                        { required: true, message: 'The mobile cannot be empty', trigger: 'blur' }
                    ]
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
          title: "用户名",
          key: "name",
          sortable: true,
        },
        {
          title: "真实姓名",
          key: "site"
        },
        {
          title: "电子邮件",
          key: "api_url"
        },
        {
          title: "状态",
          key: "status",
          sortable: true,
          render: (h, params) => {
            const row = params.row;
            const color = row.status === 2 ? "blue" : row.status === 1 ? "green" : "red";
            const text =  row.status === 2 ? "已激活" : row.status === 1 ? "封禁中" : "未激活";
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
          title: "用户权限",
          key: "portrayal",
          sortable: true,
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
          title: "所属联运商",
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
          title: "创建时间",
          key: "add_time",
          sortable: true,
          render: (h, params) => {
            return h("div",util.formatDate(this.tableData[params.index].add_time)
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
      util.ajaxPost("", params)
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
                  add_time: new Date()
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
        let formItem = this.formItem;
        console.log(this.formItem);
        // 执行异步
          setTimeout(() => {
              this.popModal = false;
              this.$Message.success('添加成功');
          }, 2000);
    },
    handleCancel () {
          this.popModal = false;
          this.$Message.error('取消成功');
    },
    handleReset (formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.$Message.error('重置成功');
    },
    handleSubmit (formName) {
      console.log(formName);
        this.$refs[formName].validate((valid) => {
            let formItem = this.form.name;
            console.log(formItem);
            if (valid) {
                this.$Message.success('验证成功');
            } else {
                this.$Message.error('数据输入异常，请检查！');
            }
        })
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