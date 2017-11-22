<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="help-buoy"></Icon>
                        权限列表[服务器分页]
                    </p>
                    <Row>
                        <Input v-model="searchConName" @on-change="handleSearch" icon="search" placeholder="请输入游戏名搜搜..." style="width: 200px" />
                        <Input v-model="searchConSite" @on-change="handleSearch" icon="search" placeholder="请输入游戏网址搜搜..." style="width: 200px" />
                    </Row>
                    <Row class="margin-top-10 searchable-table-con">
                        <Table :loading="loading" :columns="tableColumns" :data="tableData"></Table>
                        <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="dataCount" :page-size="pageSize" :current="1" show-total @on-change="changePage"></Page>
                        </div>
                    </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Util from "../../libs/util";

export default {
  name: "game",
  data() {
    return {
      searchConName: "",
      searchConSite: "",
      initTable: [],
      tableData: [],
      dataCount: 100,
      pageSize:  2,
      loading:  true,
      tableColumns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Status",
          key: "status",
          sortable: true,
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1 ? "blue" : row.status === 2 ? "green" : "red";
            const text =
              row.status === 1
                ? "Working"
                : row.status === 2 ? "Success" : "Fail";
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
          title: "Portrayal",
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
          title: "People",
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
          title: "Sampling Time",
          key: "time",
          render: (h, params) => {
            return h("div", "Almost" + params.row.time + "days");
          }
        },
        {
          title: "Updated Time",
          key: "update",
          render: (h, params) => {
            return h(
              "div",
              Util.formatDate(this.tableData[params.index].update)
            );
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
    search(tableData, argumentObj) {
      let res = tableData;
      let dataClone = tableData;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }
      return res;
    },
    // 搜索条件
    handleSearch() {
      this.tableData = this.initTable;
      this.tableData = this.search(this.tableData, {
        name: this.searchConName,
        site: this.searchConSite
      });
    },
    // 分页数据(ajax异步获取)
    mockTableData(params) {
      let ajaxData = [];
      Util.ajax
        .post("/api", params)
        .then(
          function(response) {
            // 遍历结果数据
            response.data.data.forEach(function(item) {
              ajaxData.push({
                name: item.name,
                status: Math.floor(Math.random() * 3 + 1),
                portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
                people: [{}],
                time: Math.floor(Math.random() * 7 + 1),
                update: new Date()
              });
            });
            // 赋值给当前的表格
            this.tableData = this.initTable = ajaxData;
            this.loading = false;
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求出错");
          console.log(error);
        });
    },
    // 改变分页
    changePage(index) {
      console.log("changePage");
      console.log(index);
      var _start = ( index - 1 ) * this.pageSize;
      var _end = index * this.pageSize;
      var params = {};
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.mockTableData(params);
    }
  },
  mounted() {
    var params = {
      cmdId: "getGameList", //获取游戏列表操作
      gameId: this.$store.state.gameId
    };
    this.init(params);
    console.log(this.tableData);
  }
};
</script>