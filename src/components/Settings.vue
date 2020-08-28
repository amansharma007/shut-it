<template>
  <el-container style="text-align: left;">
    <el-main>
      <h2 class="mb-small">Permanently block websites</h2>
      <p
        class="text-gray mt-0"
      >These websites will be fully blocked, and not just some section of it.</p>
      <el-row class="mb-small" v-for="(website, index) in blockedWebsites" :key="index">
        <el-col :span="18">
          <el-input v-model="blockedWebsites[index]" size="small" placeholder="Enter website url"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button
            @click="addEmptyURLField()"
            type="primary"
            size="small"
            style="margin-left: 10px"
          >Add</el-button>
        </el-col>
      </el-row>

      <h2 class="mb-small">Block sections from websites</h2>
      <p
        class="text-gray mt-0 mb-medium"
      >You can select presets which will allow you to block certain sections of a website.</p>
      <el-row class="mb-small" v-for="(website, index) in presets" :key="index">
        <el-checkbox>{{ website.name }}</el-checkbox>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      blockedWebsites: [],
      presets: [
        {
          name: "YouTube",
          url: "https://www.youtube.com/",
          selectors: ["#contents"],
          selected: false
        },
        {
          name: "Reddit",
          url: "https://www.reddit.com/",
          selectors: ["body"],
          selected: false
        }
      ]
    };
  },
  mounted() {
    this.addEmptyURLField();
  },
  methods: {
    addEmptyURLField: function() {
      this.blockedWebsites.push("");
    }
  }
};
</script>

<style>
</style>
