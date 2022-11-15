##  项目介绍

* 此项目是为了帮助您快速了解和使用kivicube插件的高级api

* 此项目是基于uniapp开发，[uniapp相关文档](https://uniapp.dcloud.io/)

* **注意：如果不熟悉uniapp框架，可以查看小程序原生开发的sample，只需点击左上角分支按钮切换到“mp-wechat”即可。**

* 此项目功能说明文档，详见[示例仓库](https://www.yuque.com/kivicube/manual/advanced-api)

* DEMO示例[（API示例与文档）](https://github.com/kivisense/wechat-kivicube-plugin-api-demo)

* 此项目对应的微信小程序叫”AR示例“，可扫描如下所示小程序码  
![avatar](https://cdn.nlark.com/yuque/0/2020/jpeg/217517/1606982678816-87c46bb6-261c-458d-b8bf-e3a6d15b9993.jpeg?x-oss-process=image%2Fresize%2Cw_200)

## 项目启动步骤

* npm install

* npm run dev:mp-weixin （该示例只支持微信小程序 ）

## 项目基本构成

collect: 分包页面（合辑)  
components：各种场景的demo  
mixins: 项目公共混合方法  
pages 主包页面  
static 静态图片资源  
App.vue 导入全局样式  
utils 全局工具集  
main.js 入口文件  
manifest.json uni-app配置文件 appid 插件等  
pages.json 页面url注册 分包已建好  
uni.scss 全局scss变量  

###  AR示例分为三个页面

1.kivicube-scene ==> @/pages/scene

功能示例：场景设置，素材对象，特殊素材等

因以上功能示例具有大部分相同功能，故@/pages/scene页面中实现公共功能，并引入scene组件（@/components/scene）进行不同功能展示。

2.kivi-cloudar ==> @/pages/cloudar

功能示例：多图识别，实用案例

因以上功能示例具有大部分相同功能，故@/pages/cloudar页面中实现公共功能，并引入cloudar组件（@/components/scene）进行不同功能展示。

3.kivicube-collection ==> @/collect/pages/index 

功能示例：多图连续识别（kivicube-collection组件）

因微信主包不能超过2M, 对合辑采取分包政策，所有合辑相关都在collect分包内



以上对应可功能示例在scene.js配置可见(@/components/scene/scene.js)

## 插件的介绍

详见[文档](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx3bbab3920eabccb2&token=&lang=zh_CN)

## 插件的使用

### 添加插件
首先要在小程序管理后台的“设置-第三方服务-插件管理”中添加插件。

### 引入插件代码包：
    "plugins": {
      "kivicube": {
        "version": "1.5.1",
        "provider": "wx3bbab3920eabccb2"
      }
	}


