<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <TableContainer url="/article/list" :params="params">
            <div slot-scope="{tableData,getTableData}">
              <el-select
                v-model="params.type"
                placeholder="请选择"
                style="margin-right:10px"
                clearable
              >
                <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-button @click="getTableData">查询</el-button>
              <hr>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id" width="180"></el-table-column>
                <el-table-column prop="type" label="type" width="180"></el-table-column>
                <el-table-column prop="display_time" label="display_time"></el-table-column>
                <el-table-column prop="author" label="author"></el-table-column>
              </el-table>
            </div>
          </TableContainer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ElTableBody from "element-ui/packages/table/src/table-body";
import TableContainer from "./components/TableContainer";

export default {
  name: "app",
  components: {
    ElTableBody,
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


<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
