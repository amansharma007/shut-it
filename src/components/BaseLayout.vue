<template>
  <el-container>
    <el-main>
      <h1>SHUT IT!</h1>
      <el-radio-group
        class="mb-medium"
        @change="handleModeChange()"
        v-model="userMode"
        size="small"
      >
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
      userMode: "off",
      options: {
        presets: [],
        blockedWebsites: []
      }
    };
  },
  created() {
    chrome.storage.sync.get(["options"], result => {
      this.$set(this.options, "presets", result.options.presets);
      this.$set(
        this.options,
        "blockedWebsites",
        result.options.blockedWebsites
      );
    });
  },
  methods: {
    handleModeChange: function() {
      switch (this.userMode) {
        case "off":
          // Reset everything
          this.reset();
          break;
        case "focus":
          // Hide specific portions
          this.hideWebsiteSections();
          // Block websites
          this.blockWebsites();
          break;
        case "cautious":
          break;
        default:
          console.log("Wrong mode");
          break;
      }
    },
    reset: function() {
      chrome.tabs.executeScript({
        code: 'document.getElementById("contents").style.cssText=""'
      });
    },
    hideWebsiteSections: function() {
      let domain = "";
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        domain = new URL(tabs[0].url).hostname;
        this.options.presets.map(elem => {
          if (elem.url.includes(domain) && elem.selected) {
            console.log(domain)
            elem.selectors.map(selector => {
              this.hidingScript(selector);
            });
          }
        });
      });
    },
    hidingScript(selector) {
      chrome.tabs.executeScript({
        code: `document.querySelector("${selector}").style.cssText="display: none !important;"`
      });
    },
    blockWebsites: function() {}
  }
};
</script>

<style>
</style>
