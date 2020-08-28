<template>
  <el-container style="text-align: left;">
    <el-main>
      <h2>Permanently block websites</h2>
      <el-row class="mb-small" v-for="(website, index) in blockedWebsites" :key="index">
        <el-col :span="18">
          <el-input v-model="blockedWebsites[index]" size="small" placeholder="Enter website url"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="addWebsiteToBlock(index)" type="primary" size="small" style="margin-left: 10px">Add</el-button>
        </el-col>
      </el-row>
      <h2>Block sections from websites</h2>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      blockedWebsites: []
    };
  },
  mounted() {
    this.blockedWebsites.push("")
  },
  methods: {
    addWebsiteToBlock: function(index) {
      console.log(index)
      this.blockedWebsites.push("")
    }
  }
};
</script>

<style>
</style>
