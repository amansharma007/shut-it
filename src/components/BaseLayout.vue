<template>
  <el-container>
    <el-main>
      <h1>SHUT IT!</h1>
      <el-radio-group class="mb-medium" v-model="mode" size="small" :stretch="true">
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
      mode: "off"
    };
  },
  created() {
    this.runScript()
  },
  methods: {
    runScript: function() {
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"'
      });
    }
  }
};
</script>

<style>
</style>
