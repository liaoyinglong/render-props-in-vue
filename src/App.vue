<template>
  <div id="app">
    <TableContainer url="/article/list" :params="params">
      <div slot-scope="{tableData,fetchData}">
        <el-select v-model="params.type" placeholder="请选择" style="margin-right:10px" clearable>
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button @click="fetchData">查询</el-button>
        <hr>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="type" label="type" width="180"></el-table-column>
          <el-table-column prop="display_time" label="display_time"></el-table-column>
          <el-table-column prop="author" label="author"></el-table-column>
        </el-table>
      </div>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from "./components/TableContainer";
export default {
  name: "app",
  components: {
    TableContainer
  },
  data() {
    return {
      params: { type: "" },
      options: ["CN", "US", "JP", "EU"]
    };
  }
};
</script>
