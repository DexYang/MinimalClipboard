// 在渲染进程中使用Menu模块需要用到remote函数
const Menu = require('electron').remote.Menu

Menu.setApplicationMenu(null)
