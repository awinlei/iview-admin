<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="compass"></Icon>
                        部门列表[本地分页]
                    </p>
                    <Row class="margin-top-10">
                        <Table :columns="tableColumns" :data="tableData" :loading="loading"></Table>
                        <div style="margin: 10px;overflow: hidden">
                        <span style="margin-right: 16px;">
                          <Button type="success" size="large" @click="popModal = true" icon="android-add">添加</Button>
                           <!-- 模态框添加窗口 -->
                          <Modal
                              v-model="popModal"
                              title="添加"
                              :closable="false"
                              :styles="{top: '20px'}"
                              @on-ok="handleAdd"
                              @on-cancel="handleCancel">
                              <Row type="flex" justify="center">
                               <Form :model="formItem" :label-width="80" ref="formInfo">
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
                                  <Button type="text" @click="handleCancel">Cancel</Button>
                                  <Button type="ghost"  @click="handleReset('formInfo')" style="margin-left: 8px">Reset</Button>
                                  <Button type="primary" :loading="loadResult" @click="handleAdd">Submit</Button>
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
import expandRow from "../my-components/table-show/expandTable.vue";

import util from "@/libs/util";

export default {
  name: "group",
  components: { expandRow },
  data() {
    return {
      popModal: false,
      loadResult: false,
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [0, 50],
        textarea: ""
      },
      tableAction: {
        title: "操作",
        key: "action",
        width: 150,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.update(params.index);
                  }
                }
              },
              "修改"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.handleDelete(params.index);
                  }
                }
              },
              "删除"
            )
          ]);
        }
      },
      tableColumns: [],
      expandParams: {},
      columns: [
        {
          title: "部门ID",
          key: "id"
        },
        {
          title: "部门名称",
          key: "name"
        },
        {
          title: "部门描述",
          key: "description"
        },
        {
          title: "成员数量",
          key: "user_num"
        },
        {
          title: "创建时间",
          key: "add_time"
        }
      ],
      tableData: [],
      initTable: [],
      dataCount: 0,
      pageSize: 10,
      currentPage: 1,
      loading: true,
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
    init(params) {
      console.log(this.columns);
      this.expandParams = {
        type: "expand",
        width: 50,
        render: (h, params) => {
          return h(expandRow, {
            props: {
              col: util.convertArrToObj(this.columns),
              row: params.row
            }
          });
        }
      };
      this.tableColumns.unshift(this.expandParams);
      this.tableColumns = this.tableColumns.concat(this.columns);
      this.tableColumns.push(this.tableAction);
      this.mockTableData(params);
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockTableData(params) {
      let ajaxData = [];
      util
        .ajaxPost("group", params)
        .then(
          function(response) {
            // 遍历结果数据
            if (response.data.data.length > 0) {
              response.data.data.forEach(function(item) {
                ajaxData.push({
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  access_code: item.access_code,
                  user_num: item.user_num,
                  add_time: item.add_time
                });
              });
            }
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
      // console.log(_start + ' ' + _end);
      // console.log(this.initTable.slice(_start,_end));
      this.tableData = this.initTable.slice(_start, _end);
      this.currentPage = index;
      console.log("changePage");
      console.log(
        this.pageSize + " " + this.dataCount + " " + this.currentPage
      );
    },
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
    // 删除
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    // 显示详细信息
    update(index) {
      this.$Modal.info({
        title: "详细信息",
        content: `Name：${this.tableData[index].name}<br>Site：${this.tableData[
          index
        ].site}<br>Status：${this.tableData[index].status}`
      });
    },
    // 删除
    handleUpdate(index) {
      this.tableData.splice(index, 1);
    },
    // 增加
    handleAdd() {
      // console.log(this.$refs);
      this.loadResult = true;
      let formItem = this.formItem;
      console.log(this.formItem);
      // 执行异步
      setTimeout(() => {
        this.popModal = false;
        this.$Message.success("添加成功");
      }, 2000);
    },
    // 取消
    handleCancel() {
      this.loadResult = false;
      this.popModal = false;
      this.$Message.error("取消成功");
    },
    // 重置
    handleReset(formName) {
      this.loadResult = false;
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.$Message.error("重置成功");
    }
  },
  mounted() {
    console.log("start..........");
    let params = {
      cmdId: "list", //获取游戏列表操作
      gameId: localStorage.gameId
    };
    // this.tableColumns.push({
    //   title: "Address",
    //   key: "address"
    // });
    this.init(params);
  }
};
</script>