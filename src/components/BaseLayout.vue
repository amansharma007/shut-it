<template>
  <el-container>
    <el-main class="p-0">
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
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function() {
    return {
      userMode: "",
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
    chrome.storage.sync.get(["userMode"], result => {
      if (!result.userMode) {
        result.userMode = "off";
      }
      this.userMode = result.userMode;
    });
    this.handleModeChange();
  },
  methods: {
    handleModeChange: function() {
      let self = this;
      chrome.storage.sync.set({ userMode: self.userMode });

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
      let domain = "";
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        domain = new URL(tabs[0].url).hostname;
        this.options.presets.map(elem => {
          if (elem.url.includes(domain) && elem.selected) {
            elem.selectors.map(selector => {
              chrome.tabs.executeScript({
                code: `document.querySelectorAll("${selector}").forEach(elem => {
                  elem.style.cssText=""
                })`
              });
            });
          }
        });

        this.options.blockedWebsites.map(url => {
          if (url.includes(domain) || domain.includes(url)) {
            chrome.tabs.executeScript({
              code: `document.querySelector("body").style.cssText=""`
            });
          }
        });
      });
    },
    hideWebsiteSections: function() {
      let domain = "";
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        domain = new URL(tabs[0].url).hostname;
        this.options.presets.map(elem => {
          if (
            (elem.url.includes(domain) || domain.includes(elem.url)) &&
            elem.selected
          ) {
            elem.selectors.map(selector => {
              this.hidingScript(selector);
            });
          }
        });
      });
    },
    hidingScript(selector) {
      if (selector) {
        chrome.tabs.executeScript({
          code: `document.querySelectorAll("${selector}").forEach(elem => {
            elem.style.cssText="display: none !important;"
          })`
        });
      }
    },
    blockWebsites: function() {
      let domain = "";
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        domain = new URL(tabs[0].url).hostname;
        this.options.blockedWebsites.map(url => {
          if (url.includes(domain) || domain.includes(url)) {
            chrome.tabs.executeScript({
              code: `document.querySelector("body").style.cssText="display: none !important;"`
            });
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
