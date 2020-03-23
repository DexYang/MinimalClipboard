<template>
  <div class="main-app">
    <div class="header">
      <el-link
        class="button close"
        :underline="false"
        icon="el-icon-close"
        @click.stop.prevent="close()" />
      <el-link
        class="button minus"
        :underline="false"
        icon="el-icon-minus"
        @click.stop.prevent="min()" />
      <el-link
        v-if="!isTop"
        class="button close"
        :underline="false"
        icon="el-icon-back"
        @click.stop.prevent="top()" />
      <el-link
        v-else
        class="button close"
        :underline="false"
        icon="el-icon-download"
        @click.stop.prevent="unTop()" />
    </div>
    <div class="content">
      <el-scrollbar
        wrap-class="scrollbar"
        style="height: 100%;">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="item"
          @click.stop.prevent="copy(tableData[tableData.length - index - 1].text)"
          @contextmenu.prevent="deleteItem(tableData[tableData.length - index - 1])">
          <el-link
            :underline="false">
            {{ index + 1 }}. {{ tableData[tableData.length - index - 1].text }}
          </el-link>
        </div>
      </el-scrollbar>
    </div>
    <div class="footer">
      <!--      <el-link-->
      <!--        class="button setting"-->
      <!--        :underline="false"-->
      <!--        icon="el-icon-setting" />-->
      <el-link
        class="button delete"
        :underline="false"
        icon="el-icon-delete"
        @click.stop.prevent="deleteItem()" />
    </div>
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require('electron')
import '@/components/menu/menu'
const { clipboard } = require('electron')
export default {
  name: 'Home',
  data() {
    return {
      text: '',
      isTop: false,
      tableData: []
    }
  },
  mounted() {
    this.refresh()
    setInterval(this.refresh, 10)
  },
  methods: {
    refresh() {
      const text = clipboard.readText()
      if (this.text !== text) {
        this.tableData.push({ text: text })
        this.text = text
      }
    },
    copy(text) {
      this.text = text
      clipboard.writeText(text)
    },
    deleteItem(item) {
      if (!item) {
        this.tableData = []
      } else {
        console.log(item)
        this.tableData.splice(this.tableData.indexOf(item), 1)
      }
    },
    min() {
      ipc.send('min')
    },
    close() {
      ipc.send('close')
    },
    top() {
      this.isTop = true
      ipc.send('top')
    },
    unTop() {
      this.isTop = false
      ipc.send('unTop')
    }
  }
}
</script>

<style>
  .el-link {
    font-family: "Microsoft YaHei";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scrollbar {
    overflow-x: auto;
    overflow-y: auto;
    padding-left: 16px;
  }

  .el-scrollbar__bar.is-vertical {
    color: #dedede !important;
  }

  .el-scrollbar__thumb {
    background: #dedede !important;
  }

  .el-link--default {
    color: black !important;
  }

  .el-link--default:hover {
    color: #215b90 !important;
  }

  .main-app {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    width: 100%;
    height: 100%;
    line-height: 2;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
  }

  .button {
    -webkit-app-region: no-drag;
    color: black !important;
  }

  .header {
    -webkit-app-region: drag;
    height: 28px;
    margin-top: 2px;
  }

  .footer {
    -webkit-app-region: drag;
    height: 28px;
    margin-bottom: 2px;
  }

  .content {
    width: calc(100vw);
    height: calc(100vh - 60px);
    padding-right: 5px;
    overflow:hidden;
  }

  .item {
    width: calc(100vw - 32px) !important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .close {
    float: right;
    margin: 7px 10px 0 10px;
  }

  .minus {
    float: right;
    margin-top: 11px;
  }

  .delete {
    float: right;
    margin: 7px 10px 0 10px;
  }

  .setting {
    float: left;
    margin: 7px 10px 0 10px;
  }
</style>
