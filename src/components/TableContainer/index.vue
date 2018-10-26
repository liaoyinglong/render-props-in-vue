<template>
  <div id="TableContainer">
    <slot :tableData="tableData" :getTableData="getTableData"></slot>
    <el-pagination
      style="margin-top:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    url: { type: String, default: "" },
    params: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      const { params, current, pageSize } = this;
      axios
        .get(this.url, { params: { ...params, current, pageSize } })
        .then(res => {
          console.log(res);
          this.tableData = res.data.list;
          this.current = res.data.current;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getTableData();
    },
    handleCurrentChange(current) {
      this.current = current;
      this.getTableData();
    }
  }
};
</script>
