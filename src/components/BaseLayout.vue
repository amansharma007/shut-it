<template>
  <el-container>
    <el-main>
      <h1>SHUT IT!</h1>
      <el-radio-group class="mb-basic" v-model="mode" size="medium" :stretch="true">
        <el-radio-button label="focus">Focus</el-radio-button>
        <el-radio-button label="cautious">Cautious</el-radio-button>
        <el-radio-button label="off">Off</el-radio-button>
      </el-radio-group>
      <el-tabs type="card" :stretch="true">
        <el-tab-pane label="Dashboard">Dashboard</el-tab-pane>
        <el-tab-pane label="Help">Help</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      mode: "Off"
    };
  }
};
</script>

<style>
</style>
