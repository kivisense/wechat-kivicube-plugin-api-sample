##  项目介绍

* 此项目是为了帮助您快速了解和使用kivicube插件的高级api

* 此项目是基于微信小程序开发，[微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

* 此项目功能说明文档，详见[示例仓库](https://www.yuque.com/kivicube/manual/advanced-api)

* DEMO示例[（API示例与文档）](https://github.com/kivisense/wechat-kivicube-plugin-api-demo)

* 此项目对应的微信小程序叫”AR示例“，可扫描下方小程序码进行体验  
![avatar](https://cdn.nlark.com/yuque/0/2020/jpeg/217517/1606982678816-87c46bb6-261c-458d-b8bf-e3a6d15b9993.jpeg?x-oss-process=image%2Fresize%2Cw_200)

## 项目启动步骤
* 安装依赖包： npm install

* 导入项目： 使用微信开发者工具导入本项目

* 使用微信开发者工具构建npm：点击工具栏`工具`按钮，在下拉列表中点击`构建npm`，构建成功后即可预览

* 小程序npm构建有疑惑详见：[npm 支持 | 微信开放文档](https://github.com/kivisense/wechat-kivicube-plugin-api-demo)

## 项目目录及页面介绍
```
├─assets 	资源文件
├─components 	视图组件
├─pages
│  ├─camera-preview   	相机预览页
│  ├─case		实用案例，AR扫福
│  ├─index		首页列表
│  ├─land-page 		落地页
│  ├─material 		素材对象
│  │  ├─alphaVideo-control透明视频控制
│  │  ├─audio-control 	  音频控制
│  │  ├─mask-control  	  模型遮罩
│  │  ├─model-control     模型控制
│  │  ├─tween-control	  自定义动画
│  │  └─video-control	  AR视频控制
│  ├─material-special	特殊素材
│  │  ├─environment-map	  自定义环境贴图
│  │  └─sprite-image	  精灵图序列
│  ├─multi-continue-recognition 多图连续识别
│  │  ├─cloud-gyroscope	          多个陀螺仪/云识别场景
│  │  └─multi-tracking		  多个图像跟踪场景
│  ├─multi-recognition 	多图识别
│  ├─scene-setup	场景设置
│  │  ├─setup-autoPlay	  自动播放
│  │  ├─setup-skip	  跳过云识别
│  │  ├─setup-source 	  素材管理
│  │  ├─setup-tracking	  自定义跟踪UI
│  │  └─setup-ui	  自定义UI与设置
│  └─started		入门教程
│      ├─kivicube-collection	快速接入kivicube-collection组件
│      └─kivicube-scene		快速接入kivicube-scene组件
└─utils			
  ├─ sceneOptions.js	整个项目示例的页面配置文件
  └─ util.js 		工具函数
```

## 插件使用说明

[Kivicube AR插件使用说明](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx3bbab3920eabccb2&token=&lang=zh_CN)

[微信插件使用文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html) 

### 添加插件
首先要在小程序管理后台的“设置-第三方服务-插件管理”中添加插件。

### 引入插件代码包：
    "plugins": {
      "kivicube": {
        "version": "1.5.7",
        "provider": "wx3bbab3920eabccb2"
      }
	}



