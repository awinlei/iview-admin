<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="person-add"></Icon>
                        菜单列表
                    </p>
                    <Row>
                        <Select v-model="pageNum" icon="search" placeholder="请选择数量"  @on-change="changePageNum" style="width:120px;float:left;">
                            <Option v-for="item in pageNumList" :value="item.value" :key="item.value" v-if="item.value == 'all'">{{ $t('allText') }}</Option>
                            <Option :value="item.value" :key="item.value" v-else>{{item.value}} {{ $t('pageNumText') }}</Option>
                        </Select>
                        <Input v-model="searchCon" @on-change="handleSearch" icon="search" placeholder="请输入关键字搜搜..." style="width: 200px;float: right;" />
                    </Row>
                    <Row class="margin-top-10">
                        <can-edit-table refs="tableInfo" v-model="tableData" :columns-list="tableColumns" @on-delete="handleDel" @on-change="handleChange"></can-edit-table>
                        <div style="margin-top: 10px;margin-right: 10px;overflow: hidden">
                        <span style="margin-right: 16px;">
                          <Button type="success" size="large" @click="popModal = true" icon="android-add">添加</Button>
                           <!-- 模态框添加窗口 -->
                          <Modal
                              v-model="popModal"
                              title="添加"
                              :closable="false"
                              :styles="{top: '20px'}"
                              @on-ok="handleSubmit('formGroup')"
                              @on-cancel="handleCancel">
                              <Row type="flex" justify="center">
                               <Form ref="formGroup" :model="formItem" :label-width="80" :rules="ruleValidate">
                                   <FormItem label="菜单名称" prop="name">
                                      <Input v-model="formItem.name" placeholder="Enter your name"></Input>
                                  </FormItem>
                                  <FormItem label="菜单ICON" prop="icon">
                                      <Input v-model="formItem.icon" placeholder="Enter your icon"></Input>
                                  </FormItem>
                                  <FormItem label="菜单说明" prop="title">
                                      <Input v-model="formItem.title" placeholder="Enter your title"></Input>
                                  </FormItem>
                                  <FormItem label="所属组件" prop="component">
                                      <Select v-model="formItem.component" placeholder="选择组件">
                                          <Option value="Main">主模块</Option>
                                          <Option value="Children">子模块</Option>
                                      </Select>
                                  </FormItem>
                                  <FormItem label="菜单类型" prop="type">
                                      <RadioGroup v-model="formItem.type">
                                          <Radio label="group">组合</Radio>
                                          <Radio label="single">独立</Radio>
                                      </RadioGroup>
                                  </FormItem>
                                  <FormItem label="菜单权限" prop="access">
                                     <Select v-model="formItem.access" placeholder="选择权限">
                                          <Option value="1">一级权限</Option>
                                          <Option value="2">二级权限</Option>
                                          <Option value="3">三级权限</Option>
                                      </Select>
                                  </FormItem>
                              </Form>
                              </Row>
                              <div slot="footer">
                                  <Button type="text" @click="handleCancel">取消</Button>
                                  <Button type="ghost"  @click="handleReset('formGroup')" style="margin-left: 8px">重置</Button>
                                  <Button type="primary" :loading="loadResult" @click="handleSubmit('formGroup')">提交</Button>
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
import expandRow from "../my-components/table-show/expandSpan.vue";
import canEditTable from "../my-components/table-show/canEditTable.vue";

import util from "@/libs/util";

export default {
  name: "menu",
  components: { expandRow, canEditTable },
  data() {
    return {
      apiName: "menu",
      popModal: false,
      loadResult: false,
      searchCon: "",
      formItem: {
        name: "",
        icon: "",
        title: "",
        component: "",
        type: "",
        access: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        icon: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "Please select the title",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "Please select the type",
            trigger: "change"
          }
        ],
        component: [
          {
            required: true,
            message: "The component cannot be empty",
            trigger: "blur"
          }
        ]
      },
      tableColumns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "菜单ID",
          key: "id",
          sortable: true
        },
        {
          title: "菜单名称",
          key: "name",
          sortable: true
        },
        {
          title: "菜单图标",
          key: "icon",
          editable: true,
          sortable: true
        },
        {
          title: "菜单说明",
          key: "title",
          editable: true,
          sortable: true
        },
        {
          title: "更新时间",
          key: "add_time",
          sortable: true
        },
        {
          title: "操作",
          align: "center",
          width: 190,
          key: "handle",
          handle: ["edit", "delete"]
        }
      ],
      tableData: [],
      initTable: [],
      dataCount: 0,
      pageSize: 10,
      currentPage: 1,
      loading: true,
      apiParams: {
        cmdId: "",
        gameId: localStorage.gameId
      },
      pageNum: "",
      pageNumList: [
        { value: "10" },
        { value: "20" },
        { value: "50" },
        { value: "100" },
        { value: "all" }
      ]
    };
  },
  methods: {
    // 初始化数据
    init() {
      this.apiParams.cmdId = "list";
      this.mockTableData();
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockTableData() {
      let ajaxData = [];
      let groupData = [];
      util
        .ajaxPost(this.apiName, this.apiParams)
        .then(
          function(response) {
            // 遍历结果数据
            if (response.data.data.length > 0) {
              response.data.data.forEach(function(item) {
                ajaxData.push(item);
              });
            }
            console.log(response.data);
            // 赋值给当前的表格
            this.tableData = this.initTable = ajaxData;
            // 数据总数
            this.dataCount = response.data.data.length;
            // 是否需要对初始数据分页
            if (this.dataCount > this.pageSize) {
              this.tableData = this.initTable.slice(0, this.pageSize);
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
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.tableData = this.initTable.slice(_start, _end);
      this.currentPage = index;
      console.log("changePage");
      console.log(
        this.pageSize + " " + this.dataCount + " " + this.currentPage
      );
    },
    // 改变每页数量
    changePageNum() {
      this.pageSize = parseInt(this.pageNum);
      this.pageSize = this.pageSize > 0 ? this.pageSize : this.dataCount;
      this.tableData = this.initTable.slice(0, this.pageSize);
      this.currentPage = 1;
      console.log("changePageNum");
      console.log(
        this.pageSize + " " + this.dataCount + " " + this.currentPage
      );
    },
    // 搜索条件
    handleSearch() {
      this.tableData = this.initTable;
      let res = this.tableData;
      let dataClone = this.tableData;
      res = dataClone.filter(item => {
        return this.search(item, this.searchCon);
      });
      this.tableData = res;
      this.dataCount = res.length;
      this.currentPage = 1;
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
    // 删除一条
    handleDel(val, index) {
      let currentRowData = this.initTable[index];
      this.apiParams.cmdId = "delete";
      this.apiParams.postData = currentRowData;
      // 远程调用ajax执行删除
      util
        .ajaxPost(this.apiName, this.apiParams)
        .then(
          function(response) {
            // 遍历结果数据
            if (response.data.result != 0) {
              this.init();
              this.$Message.success("删除了第" + (index + 1) + "行数据");
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    // 修改
    handleChange(val, index) {
      let currentRowData = this.tableData[index];
      console.log(currentRowData);
      this.apiParams.cmdId = "update";
      this.apiParams.postData = currentRowData;
      // 远程调用ajax执行删除
      util
        .ajaxPost(this.apiName, this.apiParams)
        .then(
          function(response) {
            // 遍历结果数据
            if (response.data.result != 0) {
              this.init();
              this.$Message.success("修改了第" + (index + 1) + "行数据");
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    // 增加
    handleSubmit(formName) {
      // 验证表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadResult = true;
          this.apiParams.cmdId = "add";
          this.apiParams.postData = this.formItem;
          util
            .ajaxPost(this.apiName, this.apiParams)
            .then(
              function(response) {
                // 遍历结果数据
                if (response.data.result != 0) {
                  // 关闭模态框
                  this.popModal = false;
                  // 加载最新的表数据
                  this.init();
                  this.$Message.success("添加成功");
                }
              }.bind(this)
            )
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("数据输入异常，请检查！");
        }
      });
    },
    // 取消
    handleCancel() {
      this.loadResult = false;
      this.popModal = false;
      // this.$Message.error("取消成功");
    },
    // 重置
    handleReset(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.$Message.error("重置成功");
    }
  },
  mounted() {
    // 初始化
    this.init();
  }
};
</script>