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
                        <div style="float: right;margin: 10px;overflow: hidden">
                            <Page :total="dataCount" :page-size="pageSize" :current="currentPage" show-total @on-change="changePage"></Page>
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
  name: "operator",
  components: { expandRow },
  data() {
    return {
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
          title: "部门名称",
          key: "name"
        },
        {
          title: "部门描述",
          key: "address"
        },
        {
          title: "部门权限值",
          key: "access_code"
        },
        {
          title: "成员数量",
          key: "age"
        },
      ],
      tableData: [],
      initTable: [],
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
    };
  },
  methods: {
    // 初始化数据
    init(params) {
      this.mockTableData(params);
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockTableData(params) {
      let ajaxData = [];
      util
        .ajaxPost("", params)
        .then(
          function(response) {
            // 遍历结果数据
            if (response.data.data.length > 0) {
              response.data.data.forEach(function(item) {
                ajaxData.push({
                  name: item.name + Math.floor(Math.random() * 7 + 1),
                  age: Math.floor(Math.random() * 3 + 1),
                  address: item.site,
                  access_code: Math.floor(Math.random() * 7 + 1),
                  job: item.api_url,
                  movie:'',
                  interest:'',
                  music:'',
                  birthday: new Date()
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
  },
  mounted() {
    console.log("start..........");
    let params = {
      cmdId: "getGameList", //获取游戏列表操作
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