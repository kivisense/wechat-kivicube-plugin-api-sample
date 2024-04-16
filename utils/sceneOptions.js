export const sceneOptions = [
  {
    title: "入门教程",
    child: [
      //   {
      //     id: 1,
      //     type: "web",
      //     title: "创意者",
      //     key: "creativity",
      //     description: [
      //       {
      //         txt: "文档地址：https://www.kivicube.com/blog/mp-ar",
      //         type: "txt",
      //         style: "",
      //       },
      //     ],
      //     url: "https://www.kivicube.com/blog/mp-ar",
      //     clickMta: "click_creator_button",
      //     startMta: "copy_creator_link",
      //   },
      {
        id: 2,
        type: "web",
        title: "开发者文档",
        key: "development",
        description: [
          {
            txt: "文档地址：https://www.yuque.com/kivicube/manual/mp-ar",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/mp-ar",
        clickMta: "click_developer_button",
        startMta: "copy_developer_link",
      },
      {
        id: 19,
        type: "web",
        title: "AR示例说明文档",
        key: "development",
        description: [
          {
            txt: "文档地址：https://www.yuque.com/kivicube/manual/advanced-api",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/advanced-api",
        clickMta: "click_doc_button",
        startMta: "copy_doc_link",
      },
      {
        id: 3,
        name: "autoEnter",
        sceneId: "Q3mSW9yDIuLrXeUgaN0H23WaxBQ7ZKgE",
        from: "list",
        type: "scene",
        title: "快速接入kivicube-scene组件",
        description: [
          {
            txt: "10分钟为您的小程序接入AR功能，并可以通过Kivicube后台实时管理与编辑~",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_quickstart_button",
        startMta: "click_quickstart_start",
        url: "/pages/started/kivicube-scene/kivicube-scene",
      },
      {
        id: 101,
        type: "web",
        title: "入门示例",
        description: [
          {
            txt: "未使用任何高级API的入门示例",
            type: "txt",
            style: "",
          },
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-quickstart?#一-场景",
            type: "txt",
            style: "",
          },
        ],
        url: "https://github.com/kivisense/wechat-kivicube-plugin-quickstart?#%E4%B8%80-%E5%9C%BA%E6%99%AF",
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
    ],
  },
  {
    title: "场景案例",
    child: [
      {
        id: 102,
        type: "web",
        title: "图像AR - 动态壁画",
        description: [
          {
            txt: "使用高级API开发的一个完整的案例",
            type: "txt",
            style: "",
          },
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivicube/manual/the-sun",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/the-sun",
        miniprogram: {
          appId: "wx96a8b6a94a60e9e5",
          path: "",
          btnText: "立即体验",
        },
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
      {
        id: 103,
        type: "web",
        title: "图像AR - 裸眼插画",
        description: [
          {
            txt: "使用高级API开发的一个完整的案例",
            type: "txt",
            style: "",
          },
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivicube/manual/image-tracking",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/image-tracking",
        miniprogram: {
          appId: "wx03800a762308862c",
          path: "",
          btnText: "立即体验",
        },
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
      {
        id: 104,
        type: "web",
        title: "云识别/陀螺仪 - AR 虎娃贺新春",
        description: [
          {
            txt: "使用高级API开发的一个完整的案例",
            type: "txt",
            style: "",
          },
          {
            txt: "文档与示例代码地址：https://github.com/kivisense/wechat-kivicube-plugin-cases/tree/main/tiger-year-red-envelopes-%E9%AB%98%E7%BA%A7api",
            type: "txt",
            style: "",
          },
        ],
        url: "https://github.com/kivisense/wechat-kivicube-plugin-cases/tree/main/tiger-year-red-envelopes-%E9%AB%98%E7%BA%A7api",
        miniprogram: {
          appId: "wx359163cee1fa4fb9",
          path: "",
          btnText: "立即体验",
        },
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
    ],
  },
  {
    title: "场景设置",
    child: [
      {
        id: 4,
        name: "penetrateUI",
        type: "scene",
        title: "自定义UI与设置",
        sceneId: "hDcL74ud0j1aUd8tSUtJs702EzpiULAA",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“奶牛”的模型对象",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.隐藏自带的素材下载与加载Loading，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "2.隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: "",
          },
          { txt: "3.隐藏自带的拍照按钮，并自定义UI；", type: "txt", style: "" },
          { txt: "4.自定义照片预览页面；", type: "txt", style: "" },
          { txt: "5.动态切换前后摄像头；", type: "txt", style: "" },
          { txt: "6.自定义AR相框", type: "txt", style: "" },
        ],
        clickMta: "click_uisetting_button",
        startMta: "click_uisetting_start",
        url: "/pages/scene-setup/setup-ui/setup-ui",
      },
      {
        id: 5,
        name: "penetrateUITracking",
        type: "scene",
        title: "自定义跟踪UI",
        sceneId: "hDcL74ud0j1aUd8tSUtJs702EzpiULAA",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“07Global-Network”的模型对象；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.隐藏自带的素材下载与加载Loading，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "2.隐藏自带的跟踪扫描提示，并自定义UI；",
            type: "txt",
            style: "",
          },
          { txt: "3.隐藏自带的拍照按钮，并自定义UI；", type: "txt", style: "" },
          { txt: "4.自定义照片预览页面；", type: "txt", style: "" },
        ],
        clickMta: "click_uitracking_button",
        startMta: "click_uitracking_start",
        url: "/pages/scene-setup/setup-tracking/setup-tracking",
      },
      {
        id: 6,
        name: "skipCloudar",
        type: "scene",
        title: "跳过云识别",
        sceneId: "qcAluuIz6JGQU0ArD2HS4fAytPPaLoZp",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“animal cell”的模型对象；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "不在后台设置“自动跳过扫描”，而是通过高级API设置",
            type: "txt",
            style: "",
          },
          { txt: "应用场景：", type: "txt", style: "" },
          {
            txt: "希望用户可以扫描后体验AR，但是期望用户如果长时间没有扫描成功，也可以自动跳过",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_skipcloudar_button",
        startMta: "click_skipcloudar_start",
        url: "/pages/scene-setup/setup-skip/setup-skip",
      },
      {
        id: 7,
        name: "autoPlay",
        type: "scene",
        title: "自动播放",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景仅添加了一个音频（名称为“霸王龙音频”）、一个模型（名称为“霸王龙模型”）、一个AR视频（名称为“霸王龙AR视频”）与一个透明视频（名称为“霸王龙透明视频”），均未设置播放",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "场景开始后，自动播放音频、模型动画、AR视频或透明视频",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_autoplay_button",
        startMta: "click_autoplay_start",
        url: "/pages/scene-setup/setup-autoPlay/setup-autoPlay",
      },
      {
        id: 8,
        name: "objManage",
        type: "scene",
        title: "素材管理",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景为空场景；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "1.增加三方素材；", type: "txt", style: "" },
          { txt: "2.删除素材，从内存中移除；", type: "txt", style: "" },
          { txt: "3.修改素材属性；", type: "txt", style: "" },
          { txt: "4.增加三方在线视频；", type: "txt", style: "" },
        ],
        clickMta: "click_assetmanage_button",
        startMta: "click_assetmanage_start",
        url: "/pages/scene-setup/setup-source/setup-source",
      },
    ],
  },
  {
    title: "素材对象",
    child: [
      {
        id: 9,
        name: "model",
        type: "scene",
        title: "模型控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "场景中只添加了名称为“奶牛”的模型对象，并设置自动循环播放名叫“idle”的动画；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.点击按钮循环播放名叫“dance”的动画，暂停当前的动画，停止当前的动画，重新播放名叫“dance”的动画；",
            type: "txt",
            style: "",
          },
          {
            txt: "2.点击“奶牛”模型播放名叫“walk_proud”的动画两遍，并且停在最后一帧，“walk_proud”动画播放完毕后跳转一个示意小程序页面；",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_modelcontrol_button",
        startMta: "click_modelcontrol_start",
        url: "/pages/material/model-control/model-control",
      },
      {
        id: 10,
        name: "video",
        type: "scene",
        title: "AR视频控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "场景中只添加了名称为“mp-ar-cases”的AR视频对象，没有设置播放；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.视频的播放，暂停，停止，循环播放可通过点击事件直接控制；",
            type: "txt",
            style: "",
          },
          {
            txt: "2.视频被绑定点击、播放、暂停、播放结束四个事件，事件触发后会有toast提示；",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_arvideocontrol_button",
        startMta: "click_arvideocontrol_start",
        url: "/pages/material/video-control/video-control",
      },
      {
        id: 11,
        name: "alphaVideo",
        type: "scene",
        title: "透明视频控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "场景中只添加了名称为“Cat”的透明视频对象，没有设置播放；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.点击按钮分别循环播放视频，暂停播放视频，停止播放视频，重新播放视频；",
            type: "txt",
            style: "",
          },
          {
            txt: "2.点击视频暂停播放视频",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_alphavideocontrol_button",
        startMta: "click_alphavideocontrol_start",
        url: "/pages/material/alphaVideo-control/alphaVideo-control",
      },
      {
        id: 12,
        name: "audio",
        type: "scene",
        title: "音频控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "场景中只添加了名称为“Childhood-Dreams”的音频对象，没有设置播放；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.点击按钮循环播放音频，暂停播放音频，停止播放音频，重新播放音频；",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_audiocontrol_button",
        startMta: "click_audiocontrol_start",
        url: "/pages/material/audio-control/audio-control",
      },
      {
        id: 13,
        name: "tweenAnimation",
        type: "scene",
        title: "自定义动画",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“animal cell”的模型对象；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "使用TweenJS实现一个简单的入场动画", type: "txt", style: "" },
        ],
        clickMta: "click_customanimation_button",
        startMta: "click_customanimation_start",
        url: "/pages/material/tween-control/tween-control",
      },
      {
        id: 19,
        name: "maskModel",
        type: "scene",
        title: "模型遮罩",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中添加了名称为“柠檬”与“Occluder”的模型对象",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "将Occluder设置为遮罩类型，Occluder便可以挡住“柠檬”部分运动轨迹，达到柠檬跑到物体背后被遮挡，AR体验更真实",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_occluder_button",
        startMta: "click_occluder_start",
        url: "/pages/material/mask-control/mask-control",
      },
    ],
  },
  {
    title: "特殊素材",
    child: [
      {
        id: 14,
        name: "envMap",
        type: "scene",
        title: "自定义环境贴图",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“sphere”的模型对象；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "自定义PBR材质的环境贴图", type: "txt", style: "" },
        ],
        clickMta: "click_customenv_button",
        startMta: "click_customenv_start",
        url: "/pages/material-special/environment-map/environment-map",
      },
      {
        id: 15,
        name: "imageSprite",
        type: "scene",
        title: "精灵图序列",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "源场景中仅添加了名称为“Childhood-Dreams-1”的音频对象，并在编辑器后台设置自动循环播放；",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "1.音频播放时同步播放精灵图序列；", type: "txt", style: "" },
          {
            txt: "2.点击精灵图序列暂停精灵图序列播放与音频播放；",
            type: "txt",
            style: "",
          },
          {
            txt: "3.处于暂停状态的精灵图序列再次被点击，继续播放精灵图序列与音频",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_sprite_button",
        startMta: "click_sprite_start",
        url: "/pages/material-special/sprite-image/sprite-image",
      },
    ],
  },
];

export const collectionOptions = [
  {
    title: "入门教程",
    child: [
      {
        id: 2,
        type: "web",
        title: "开发者文档",
        key: "development",
        description: [
          {
            txt: "文档地址：https://www.yuque.com/kivicube/manual/mp-ar",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/mp-ar",
        clickMta: "click_developer_button",
        startMta: "copy_developer_link",
      },
      {
        id: 19,
        type: "web",
        title: "AR示例说明文档",
        key: "development",
        description: [
          {
            txt: "文档地址：https://www.yuque.com/kivicube/manual/advanced-api",
            type: "txt",
            style: "",
          },
        ],
        url: "https://www.yuque.com/kivicube/manual/advanced-api",
        clickMta: "click_doc_button",
        startMta: "copy_doc_link",
      },
      {
        id: 18,
        name: "collectionEnter",
        collectionId: "uucpmp",
        type: "collectScene",
        title: "快速接入kivicube-collection组件",
        description: [
          {
            txt: "10分钟为您的小程序接入AR多场景（多图连续识别）功能，并可以通过Kivicube后台实时管理与编辑~",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_colltction_button",
        startMta: "click_colltction_start",
        url: "/pages/started/kivicube-collection/kivicube-collection",
      },
      {
        id: 201,
        type: "web",
        title: "入门示例",
        description: [
          {
            txt: "未使用任何高级API的入门示例",
            type: "txt",
            style: "",
          },
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-quickstart#二-合辑",
            type: "txt",
            style: "",
          },
        ],
        url: "https://github.com/kivisense/wechat-kivicube-plugin-quickstart#%E4%BA%8C-%E5%90%88%E8%BE%91",
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
    ],
  },
  {
    title: "多图连续识别（kivicube-collection组件）",
    child: [
      {
        id: 20,
        name: "cloudOrGyroscopeCollecttion",
        type: "collectScene",
        collectionId: "8rwg2z",
        title: "多个陀螺仪/云识别场景",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "（1）隐藏自带的返回按钮，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "（2）隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "（3）场景切换功能；",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_cloudar_button",
        startMta: "click_cloudar_start",
        url: "/pages/multi-continue-recognition/cloud-gyroscope/cloud-gyroscope",
      },
      {
        id: 21,
        name: "trackingCollecttion",
        type: "collectScene",
        collectionId: "uucpmp",
        title: "多个图像跟踪场景",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "（1）自定义开启或关闭识别的时机；",
            type: "txt",
            style: "",
          },
          {
            txt: "（2）隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "（3）隐藏自带的图像跟踪提示，并自定义UI；",
            type: "txt",
            style: "",
          },
          {
            txt: "（4）场景切换功能；",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_tracking_button",
        startMta: "click_tracking _start",
        url: "/pages/multi-continue-recognition/multi-tracking/multi-tracking",
      },
    ],
  },
];

export const apiOptions = [
  {
    title: "高级API文档",
    child: [
      {
        id: 2,
        type: "web",
        title: "高级API文档",
        key: "api",
        description: [
          {
            txt: "文档地址：https://github.com/kivisense/wechat-kivicube-plugin-api-demo",
            type: "txt",
            style: "",
          },
        ],
        url: "https://github.com/kivisense/wechat-kivicube-plugin-api-demo",
        // clickMta: "click_developer_button",
        // startMta: "copy_developer_link",
      },
    ],
  },
  {
    title: "基础素材管理和使用",
    child: [
      {
        id: 25,
        type: "scene",
        title: "3D对象共有API【基类】",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "包含子对象处理、点击事件、渲染钩子函数、显示隐藏等的示例",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/common/common",
      },
      {
        id: 26,
        type: "scene",
        title: "glb模型",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载glb模型",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/model/model",
      },
      {
        id: 27,
        type: "scene",
        title: "组合容器",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "可以将模型、图片、AR视频、透明视频、精灵图组合未一个整体",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/group/group",
      },
      {
        id: 28,
        type: "scene",
        title: "将模型素材指定为遮罩",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "将模型素材指定为遮罩",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/mask/mask",
      },
      {
        id: 29,
        type: "scene",
        title: "精灵图",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "可以将序列帧处理为单张精灵图进行加载",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/imageSprite/imageSprite",
      },
      {
        id: 30,
        type: "scene",
        title: "音频",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载音频",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/audio/audio",
      },
      {
        id: 31,
        type: "scene",
        title: "AR视频/透明视频",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载AR视频/透明视频",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/video/video",
      },
      {
        id: 32,
        type: "scene",
        title: "全景图",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载 360 全景图",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/panorama/panorama",
      },
      {
        id: 33,
        type: "scene",
        title: "全景视频",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载 360 全景视频",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/panorama-video/panorama-video",
      },
      {
        id: 34,
        type: "scene",
        title: "天空盒子",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载 6 张图形式的 skybox",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/sky-box/sky-box",
      },
      {
        id: 35,
        type: "scene",
        title: "灯光",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "设置场景灯光",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/light/light",
      },
      {
        id: 36,
        type: "scene",
        title: "自定义环境贴图",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载自定义环境贴图",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/env-map/env-map",
      },
      {
        id: 37,
        type: "scene",
        title: "素材管理 包含自定义增删改素材",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "素材管理 包含自定义增删改素材",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/base/manage/manage",
      },
    ],
  },
  {
    title: "云识别/陀螺仪场景",
    child: [
      {
        id: 38,
        type: "scene",
        title: "云识别/陀螺仪场景主动跳过云识别阶段【不依赖后台配置】",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "云识别/陀螺仪场景主动跳过云识别阶段【不依赖后台配置】",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/cloudar/skipCloudar/skipCloudar",
      },
    ],
  },
  {
    title: "图像AR场景",
    child: [
      {
        id: 39,
        type: "scene",
        title: "使用license去除图像追踪水印",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "使用license去除图像追踪水印",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/image-tracking/image2d-tracking/image2d-tracking",
      },
      {
        id: 40,
        type: "scene",
        title: "手动设置图像追踪版本",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "手动设置图像追踪版本",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/image-tracking/tracking-version/tracking-version",
      },
    ],
  },
  {
    title: "平面AR场景",
    child: [
      {
        id: 41,
        type: "scene",
        title: "使用指示器点击放置",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "使用指示器点击放置",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/plane/indicator/indicator",
      },
      {
        id: 42,
        type: "scene",
        title: "检测到平面自动放置",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "检测到平面自动放置",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/plane/auto-locate/auto-locate",
      },
    ],
  },
  {
    title: "漫游AR场景",
    child: [
      {
        id: 43,
        type: "scene",
        title: "漫游AR场景示例",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "漫游AR场景示例",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/roam/roam-ar/roam-ar",
      },
    ],
  },
  {
    title: "世界AR场景",
    child: [
      {
        id: 44,
        type: "scene",
        title: "世界AR场景示例",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "世界AR场景示例",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/world/world-ar/world-ar",
      },
      {
        id: 45,
        type: "scene",
        title: "世界AR场景自定义 marker",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "世界AR场景自定义 marker",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/world/world-marker/world-marker",
      },
      {
        id: 46,
        type: "scene",
        title: "多图连续识别",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "多图连续识别",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/world/multiple/simple/multiple-simple",
      },
    ],
  },
  {
    title: "其它",
    child: [
      {
        id: 47,
        type: "scene",
        title: "自定义模型动画播放和控制",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "自定义模型动画播放和控制",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/play-animation/play-animation",
      },
      {
        id: 48,
        type: "scene",
        title: "动态切换前后摄像头",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "动态切换前后摄像头",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/camera/camera",
      },
      {
        id: 49,
        type: "scene",
        title: "自动播放",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "自动播放动画",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/autoPlay/autoPlay",
      },
      {
        id: 50,
        type: "scene",
        title: "自定义UI 穿透自定义UI点击到模型",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "自定义UI 穿透自定义UI点击到模型",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/penetrateUI/penetrateUI",
      },
      {
        id: 51,
        type: "scene",
        title: "拍照处理 自定义拍照按钮",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "拍照处理 自定义拍照按钮",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/photo/photo",
      },
      {
        id: 52,
        type: "scene",
        title: "简单的自定义动画",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "简单的自定义动画",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/simpleAnimation/simpleAnimation",
      },
      {
        id: 53,
        type: "scene",
        title: "使用TWEEN 实现缓动动画",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "使用TWEEN 实现缓动动画",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/tweenAnimation/tweenAnimation",
      },
      {
        id: 54,
        type: "scene",
        title: "使用 trackball 手势",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "使用 trackball 手势，旋转场景没有限制",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/trackball/trackball",
      },
      {
        id: 55,
        type: "scene",
        title: "AR画面录制",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "AR画面录制",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/recorder/recorder",
      },
      {
        id: 56,
        type: "scene",
        title: "设置渲染色调映射",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "设置渲染色调映射",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/tone-mapping/tone-mapping",
      },
      {
        id: 57,
        type: "scene",
        title: "设置各向异性",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "设置各向异性",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/set-anisotropy/set-anisotropy",
      },
      {
        id: 58,
        type: "scene",
        title: "加载量化(优化三角形/网格/材质/纹理/顶点/动画)后的模型",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "加载量化(优化三角形/网格/材质/纹理/顶点/动画)后的模型",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/load-compressed-gltf/load-compressed-gltf",
      },
      {
        id: 59,
        type: "scene",
        title: "camera - 获取位置、3D素材放置屏幕上",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "camera - 获取位置、3D素材放置屏幕上",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/screen/screen",
      },
      {
        id: 60,
        type: "scene",
        title: "简单判断模型是否在相机画面内",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "简单判断模型是否在相机画面内",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/others/model-render/model-render",
      },
    ],
  },
  {
    title: "合辑",
    child: [
      {
        id: 61,
        type: "collection",
        title: "基础【如何获取高级API】",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "基础【如何获取高级API】",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/collection/collection/collection",
      },
    ],
  },
  {
    title: "合辑【如何使用高级API】",
    child: [
      {
        id: 62,
        type: "collection",
        title: "云识别类型合辑 - 自定义返回扫描功能",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "云识别类型合辑 - 自定义返回扫描功能",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/collection/backToScan/backToScan",
      },
      {
        id: 63,
        type: "collection",
        title: "云识别开启与关闭",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "云识别开启与关闭",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/collection/cloudar/cloudar",
      },
      {
        id: 64,
        type: "collection",
        title: "场景的打开与关闭",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "场景的打开与关闭",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/collection/scene/scene",
      },
      {
        id: 65,
        type: "collection",
        title: "合辑拍照",
        description: [
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "合辑拍照",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "/pages/api/collection/collectionPhoto/collectionPhoto",
      },
    ],
  },
];

export const extensionOptions = [
  {
    title: "开发框架示例",
    child: [
      {
        id: 301,
        type: "web",
        title: "uni-app",
        description: [
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/uni-app",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/uni-app",
      },
      {
        id: 302,
        type: "web",
        title: "taro3-react",
        description: [
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/taro3-react",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/taro3-react",
      },
      {
        id: 303,
        type: "web",
        title: "taro3-vue2",
        description: [
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/taro3-vue2",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/framework/taro3-vue2",
      },
    ],
  },
  {
    title: "插件分包示例",
    child: [
      {
        id: 304,
        type: "web",
        title: "uni-app",
        description: [
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/subpackages/uni-app",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/subpackages/uni-app",
      },
      {
        id: 305,
        type: "web",
        title: "wechat-native-mp",
        description: [
          {
            txt: "示例代码：https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/subpackages/wechat-native-mp",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://github.com/kivisense/wechat-kivicube-plugin-samples/tree/master/subpackages/wechat-native-mp",
      },
    ],
  },
  {
    title: "网页端开发",
    child: [
      {
        id: 306,
        type: "web",
        title: "自研H5接入",
        description: [
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivicube/manual/h5-access",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivicube/manual/h5-access",
      },
      {
        id: 307,
        type: "web",
        title: "Web版AR插件快速接入",
        description: [
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivicube/manual/web-ar-plugin-quick-start",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivicube/manual/web-ar-plugin-quick-start",
      },
    ],
  },
  {
    title: "APP开发",
    child: [
      {
        id: 308,
        type: "web",
        title: "自研APP接入",
        description: [
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivicube/manual/app-access",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivicube/manual/app-access",
      },
    ],
  },
  {
    title: "实用案例",
    child: [
      {
        id: 17,
        name: "imageScan",
        type: "scene",
        title: "AR扫福",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt: "空场景",
            type: "txt",
            style: "",
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.透明视频播放完毕后，跳转到新的小程序页面（开发者可以在新的页面开发比如发券、发红包功能）",
            type: "txt",
            style: "",
          },
        ],
        clickMta: "click_arscan_button",
        startMta: "click_arscan_start",
        url: "/pages/case/image-scan",
      },
    ],
  },
  {
    title: "更多增值功能",
    child: [
      {
        id: 310,
        type: "web",
        title: "弥知AI插件开发",
        description: [
          {
            txt: "文档地址：https://www.yuque.com/kivicube/manual/ai-plugin",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivicube/manual/ai-plugin",
      },
      {
        id: 311,
        type: "web",
        title: "Web端AI插件开发（即将上线）",
        description: [
          {
            txt: "",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "",
      },
      {
        id: 312,
        type: "web",
        title: "AR虚拟试戴平台",
        description: [
          {
            txt: "制作眼镜试戴的平台，提供插件供开发者接入",
            type: "txt",
            style: "",
          },
          {
            txt: "文档地址：https://www.yuque.com/kivisense/vto",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivisense/vto",
      },
      {
        id: 313,
        type: "web",
        title: "Kivisense Try-on平台",
        description: [
          {
            txt: "制作AR试鞋的平台，提供Shopify插件开发",
            type: "txt",
            style: "",
          },
          {
            txt: "文档地址：https://www.yuque.com/kivisense/try-on",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivisense/try-on",
      },
      {
        id: 314,
        type: "web",
        title: "弥知声网美颜插件",
        description: [
          {
            txt: "提供声网美颜插件",
            type: "txt",
            style: "",
          },
          {
            txt: "文档与示例代码地址：https://www.yuque.com/kivisense/agora/start",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "https://www.yuque.com/kivisense/agora/start",
      },
      {
        id: 315,
        type: "web",
        title: "AR涂涂乐（即将上线）",
        description: [
          {
            txt: "AR涂涂乐（即将上线）",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "",
      },
      {
        id: 316,
        type: "web",
        title: "AR实景导航（即将上线）",
        description: [
          {
            txt: "AR实景导航（即将上线）",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_arscan_button",
        // startMta: "click_arscan_start",
        url: "",
      },
    ],
  },
];

export const toolsOptions = [
  {
    title: "地标AR",
    child: [
      {
        id: 22,
        name: "videoCapture",
        type: "tool",
        title: "采集地标训练视频（最佳体验点视频）",
        description: [
          {
            txt: "快速采集地标训练视频，最短2秒，最长30秒，并保存到手机",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_quickstart_button",
        // startMta: "click_quickstart_start",
        url: "/pages/tools/landmark-video/landmark-video",
      },
      {
        id: 23,
        name: "imageCapture",
        type: "tool",
        title: "采集地标定位图（识别图）",
        description: [
          {
            txt: "快速采集地标定位图（识别图），并保存到手机",
            type: "txt",
            style: "",
          },
        ],
        // clickMta: "click_colltction_button",
        // startMta: "click_colltction_start",
        url: "/pages/tools/landmark-photo/landmark-photo",
      },
    ],
  },
  {
    title: "反馈页面",
    child: [
      {
        id: 1001,
        name: "feedback",
        type: "feedback",
        title: "小程序反馈",
        description: [],
        clickMta: "click_feedback_button",
        startMta: "click_feedback_start",
        url: "/pages/feedback/feedback",
      },
      {
        id: 1002,
        name: "web-feedback",
        type: "feedback",
        title: "WebView反馈",
        description: [],
        clickMta: "click_feedbackWeb_button",
        startMta: "click_feedbackWeb_start",
        url: "/pages/feedback-web/feedback-web",
      },
      // {
      //   id: 1003,
      //   name: "web-feedback",
      //   type: "feedback",
      //   title: "小程序兼容反馈",
      //   description: [],
      //   // clickMta: "click_feedbackWeb_button",
      //   // startMta: "click_feedbackWeb_start",
      //   url: "/pages/tools/miniprogram-feedback/miniprogram-feedback",
      // },
      // {
      //   id: 1004,
      //   name: "web-feedback",
      //   type: "feedback",
      //   title: "web兼容反馈",
      //   description: [],
      //   // clickMta: "click_feedbackWeb_button",
      //   // startMta: "click_feedbackWeb_start",
      //   url: "/pages/tools/web-feedback/web-feedback",
      // },
    ],
  },
];
