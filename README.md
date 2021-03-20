# vuea

路由  
router: 路由器  
routes: 路由  
route:  路由 路由器找到路由集合,然后分析请求路径,找到请求路径对应的组件并渲染,渲染到<route-view></router-view>

APP.vue->根界面

<router-view/>->路由占位符,访问路径得到的资源会在路由占位符中显示 请求:/

常用的插件:

- chinese
- open in browser
- auto rename tag //自动修改标签名
- auto close tag //自动完成关闭标签
- vetur //vue语法高亮模板等
- vue-helper //vue关键字提示
- eslint //编程风格

# 安装经验总结

1. 安装cnpm: npm install -g @vue/cli --registry 淘宝的npm镜像 如何设置npm淘宝镜像
2. 安装前先把前面安装的vue的cli删掉
3. permission,权限,切换到管理员安装
4. 命令未定义:检查环境变量
5. 安装过程中不要出现特殊字符

# 2021年3月15日 day01总结

1. vue相关知识
2. 项目开发的一般步骤
3. 环境的安装
    - node
    - 阿里的npm镜像,阿里的maven镜像
    - vue的cli

4. vue ui 图形化搭建vue项目
5. 相关文件
    - main.js 入口文件
    - APP.vue -> 根页面
    - router-view -> 路由占位符
    - router路由
         - router: 路由器
         - routes: 路由集合
         - route: 路由
    - components:存放组件的地方
    - asset: 静态资源
    - plugins: 插件的配置
    - `mode_modules:js`的组件库
    - 组件:
      - `template:html`骨架
      - `script:html`中的js
      - `style:html`中的css

# 2021年3月16日 day02总结

### `vue`相关

1. 路由跳转

   - `this.$router.push('路径')`->跳转到下一个页面
   - 路由器压栈出栈

2. `vue`组件中的内容

   1. `template --> html`
   2. `script --> script`
   3. `style --> style`

3. touter-view:路由占位符

   - 单页应用:自始至终只有一个跟页面,界面的更换或者迭代,都是通过组件切换造成

4. 特殊的语法

   `data:function(){} --> data(){}`

### element相关

1. 使用方式:先引入,再使用

2. element的组件

   1. 导入时的名称:`el-form-item --> FormItem`

   2. form表单

      - 控件

          1. el-form
          2. el-form-item
          3. el-input
          4. el-checkbox
          5. el-button
          6. message
      - 方法和属性
          1. 绑定表单的值
          2. 数据验证
          3. 将表单绑定到`vue`当中去

   3. 布局控件

      1. el-container
      2. el-header
      3. el-aside
      4. el-main

      - 可以通过el-container灵活的将其他组件组合在一起

   4. el-avatar,el-dropdown,el-dropdown-menu,el-dropdown-item


### flex

1. 针对父容器,改变布局分方式

    1. 写法:`display:flex`

    3. `felx-decration`:以什么位主轴,row,column

    4. `justify-content`:元素在主轴上的排列方式,

       - flex-start
       - center
       - flex-end
       - space-around
       - space-between

    5. align-items:元素在非主轴上的排列方式

       - flex-start

       - center

       - flex-end

    6. flex-wrap:元素在挤满了,是否要换行
2. 针对于内部元素的排列方式
    - order:越小越靠前
    - align-self:元素在非主轴上的排列方式

# 2021年3月16日 day03总结

### postman

- 理解：小型的浏览器
- postman的使用

### axios的使用

1. 先引入并绑定到vue中 
2. axios如何修改content-type     
   - 普通参数
        - application/json
        - application/x-www-form-urlencorded
     
   - 文件
        - form
            - mutipart/form-data
        - ajax
            - form-data
   
3. qs库：stringtify()

### 登录状态
- 非前后端分离项目
  
    通过session和cookie进行状态保存
  
- 前后端分离项目
  
    通过token进行状态保存
  
- sessionStorage(存储字符串，若是对象则转化成json再存储)
  
    作用范围：当前页面，页面关闭，数据清空
  
- localStorage
  
    一般用作存储用户的使用习惯

### 路由守卫

- beforeEach(function(to,from,next){}):在路径更改前调用该方法
    - to:去哪个界面
    - from:从哪个界面来
    - next:方法，放行方法
    - next():直接放行，继续前面的路由
    - next(false):截断，不在进行跳转
    - next("/login"):跳转指定的界面


### RBAC: 角色访问控制权限（Role-Based Access Control）

### 搭建侧导航栏
- el-menu
    - index
        - 菜单的标识
        - 作为路由,只有el-menu-item才能作为路由
    - backgroud-color:背景色
    - text-color:文字的颜色
    - active-text-color:选中菜单的字体颜色
- el-submenu
- el-menu-item

### 子路由

1. children:在路由中定义childred属性作为子路由
2. 组件渲染位置:由路由找到组件，然后将组件渲染到父组件的路由占位符位置，没有父组件的，将渲染到App.vue的路由占位符位置