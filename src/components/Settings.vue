<template>
  <el-container style="text-align: left;">
    <el-main>
      <h2 class="mb-small">Permanently block websites</h2>
      <p
        class="text-gray mt-0"
      >These websites will be fully blocked, and not just some section of it.</p>
      <el-row class="mb-small" v-for="(website, index) in options.blockedWebsites" :key="index + website">
        <el-col :span="18">
          <el-input v-model="options.blockedWebsites[index]" size="small" placeholder="Enter website url"></el-input>
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
      <el-row class="mb-small" v-for="(preset, index) in options.presets" :key="index + preset.url">
        <el-checkbox @change="handlePresetSelect()" v-model="preset.selected">{{ preset.name }}</el-checkbox>
      </el-row>

      <el-row class="mb-small">
        <el-button @click="dialogFormVisible = true" type="primary" size="small">Add new preset</el-button>
      </el-row>

      <el-row v-if="dialogFormVisible">
        <h3>Add new preset</h3>
        <p class="text-bold">Name</p>
        <el-input
          v-model="newPreset.name"
          class="mb-small"
          placeholder="Enter website name"
          autocomplete="off"
        ></el-input>

        <p class="text-bold mt-0">URL</p>
        <el-input
          v-model="newPreset.url"
          class="mb-small"
          placeholder="Enter website URL"
          autocomplete="off"
        ></el-input>

        <p class="text-bold mt-0">Selectors</p>
        <el-input
          v-model="newSelectorsString"
          type="textarea"
          :rows="4"
          class="mb-small"
          placeholder="Enter CSS selectors by pressing ENTER after each. For e.g, #id-name"
          autocomplete="off"
        ></el-input>

        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addNewPreset()">Confirm</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      options: {
        blockedWebsites: ["https://www.facebook.com/"],
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
      },
      dialogFormVisible: false,
      newSelectorsString: "",
      dataLoaded: false,
      newPreset: {
        name: "",
        url: "",
        selectors: [],
        selected: false
      }
    };
  },
  created() {
    chrome.storage.sync.get(["options"], result => {
      if (result.options) {
        this.$set(this.options, "presets", result.options.presets);
        console.log(JSON.stringify(this.options));
      }
    });
    this.addEmptyURLField();
  },
  watch: {
    newSelectorsString: function(newVal) {
      this.newPreset.selectors = newVal.split("\n");
    }
  },
  methods: {
    handlePresetSelect: function() {
      let self = this;
      chrome.storage.sync.set({ options: { presets: self.options.presets } }, () => {
        console.log("Value is set to " + JSON.stringify(this.options.presets));
      });
    },
    addEmptyURLField: function() {
      this.options.blockedWebsites.push("");
    },
    addNewPreset: function() {
      this.options.presets.push(this.newPreset);
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style>
</style>
