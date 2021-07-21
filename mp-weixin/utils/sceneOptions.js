const sceneOptions = [
  {
    title: "入门教程",
    child: [
      {
        id: 1,
        type: "web",
        title: "创意者",
        key: "creativity",
        description: [
          {
            txt: "文档地址：https://www.kivicube.com/blog/mp-ar",
            type: "txt",
            style: ""
          }
        ],
        url: "https://www.kivicube.com/blog/mp-ar",
        clickMta: "click_creator_button",
        startMta: "copy_creator_link"
      },
      {
        id: 2,
        type: "web",
        title: "开发者",
        key: "development",
        description: [
          {
            txt: "文档地址：https://www.kivicube.com/blog/mp-ar-plugin",
            type: "txt",
            style: ""
          }
        ],
        url: "https://www.kivicube.com/blog/mp-ar-plugin",
        clickMta: "click_developer_button",
        startMta: "copy_developer_link"
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
            style: ""
          }
        ],
        url: "https://www.yuque.com/kivicube/manual/advanced-api",
        clickMta: "click_doc_button",
        startMta: "copy_doc_link"
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
            txt:
              "10分钟为您的小程序接入AR功能，并可以通过Kivicube后台实时管理与编辑~",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_quickstart_button",
        startMta: "click_quickstart_start"
      },
      {
        id: 18,
        name: "collectionEnter",
        collectionId: "nw4uq2",
        type: "collectScene",
        title: "快速接入kivicube-collection组件",
        description: [
          {
            txt:
              "10分钟为您的小程序接入AR多场景（多图连续识别）功能，并可以通过Kivicube后台实时管理与编辑~",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_colltction_button",
        startMta: "click_colltction_start"
      }
    ]
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.隐藏自带的素材下载与加载Loading，并自定义UI；",
            type: "txt",
            style: ""
          },
          {
            txt: "2.隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: ""
          },
          { txt: "3.隐藏自带的拍照按钮，并自定义UI；", type: "txt", style: "" },
          { txt: "4.自定义照片预览页面；", type: "txt", style: "" },
          { txt: "5.动态切换前后摄像头；", type: "txt", style: "" },
          { txt: "6.自定义AR相框", type: "txt", style: "" }
        ],
        clickMta: "click_uisetting_button",
        startMta: "click_uisetting_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "1.隐藏自带的素材下载与加载Loading，并自定义UI；",
            type: "txt",
            style: ""
          },
          {
            txt: "2.隐藏自带的跟踪扫描提示，并自定义UI；",
            type: "txt",
            style: ""
          },
          { txt: "3.隐藏自带的拍照按钮，并自定义UI；", type: "txt", style: "" },
          { txt: "4.自定义照片预览页面；", type: "txt", style: "" }
        ],
        clickMta: "click_uitracking_button",
        startMta: "click_uitracking_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "不在后台设置“自动跳过扫描”，而是通过高级API设置",
            type: "txt",
            style: ""
          },
          { txt: "应用场景：", type: "txt", style: "" },
          {
            txt:
              "希望用户可以扫描后体验AR，但是期望用户如果长时间没有扫描成功，也可以自动跳过",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_skipcloudar_button",
        startMta: "click_skipcloudar_start"
      },
      {
        id: 7,
        name: "autoPlay",
        type: "scene",
        title: "自动播放",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt:
              "源场景仅添加了一个音频（名称为“霸王龙音频”）、一个模型（名称为“霸王龙模型”）、一个AR视频（名称为“霸王龙AR视频”）与一个透明视频（名称为“霸王龙透明视频”），均未设置播放",
            type: "txt",
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt: "场景开始后，自动播放音频、模型动画、AR视频或透明视频",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_autoplay_button",
        startMta: "click_autoplay_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "1.增加三方素材；", type: "txt", style: "" },
          { txt: "2.删除素材，从内存中移除；", type: "txt", style: "" },
          { txt: "3.修改素材属性；", type: "txt", style: "" },
          { txt: "4.增加三方在线视频；", type: "txt", style: "" }
        ],
        clickMta: "click_assetmanage_button",
        startMta: "click_assetmanage_start"
      }
    ]
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
            txt:
              "场景中只添加了名称为“奶牛”的模型对象，并设置自动循环播放名叫“idle”的动画；",
            type: "txt",
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "1.点击按钮循环播放名叫“dance”的动画，暂停当前的动画，停止当前的动画，重新播放名叫“dance”的动画；",
            type: "txt",
            style: ""
          },
          {
            txt:
              "2.点击“奶牛”模型播放名叫“walk_proud”的动画两遍，并且停在最后一帧，“walk_proud”动画播放完毕后跳转一个示意小程序页面；",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_modelcontrol_button",
        startMta: "click_modelcontrol_start"
      },
      {
        id: 10,
        name: "video",
        type: "scene",
        title: "AR视频控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt:
              "场景中只添加了名称为“mp-ar-cases”的AR视频对象，没有设置播放；",
            type: "txt",
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "1.点击按钮分别播放视频一次，暂停播放视频，停止播放视频，重新播放循环视频；",
            type: "txt",
            style: ""
          },
          {
            txt:
              "2.点击视频停止播放视频，视频停止播放后跳转网页：https://www.kivicube.com",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_arvideocontrol_button",
        startMta: "click_arvideocontrol_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "1.点击按钮分别循环播放视频，暂停播放视频，停止播放视频，重新播放视频；",
            type: "txt",
            style: ""
          },
          {
            txt: "2.点击视频暂停播放视频",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_alphavideocontrol_button",
        startMta: "click_alphavideocontrol_start"
      },
      {
        id: 12,
        name: "audio",
        type: "scene",
        title: "音频控制",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt:
              "场景中只添加了名称为“Childhood-Dreams”的音频对象，没有设置播放；",
            type: "txt",
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "1.点击按钮循环播放音频，暂停播放音频，停止播放音频，重新播放音频；",
            type: "txt",
            style: ""
          },
          {
            txt: "2.音乐停止后，跳转到QQ音乐小程序继续播放歌曲Childhood-Dreams",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_audiocontrol_button",
        startMta: "click_audiocontrol_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "使用Tween实现一个简单的入场动画", type: "txt", style: "" }
        ],
        clickMta: "click_customanimation_button",
        startMta: "click_customanimation_start"
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "将Occluder设置为遮罩类型，Occluder便可以挡住“柠檬”部分运动轨迹，达到柠檬跑到物体背后被遮挡，AR体验更真实",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_occluder_button",
        startMta: "click_occluder_start"
      }
    ]
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "自定义PBR材质的环境贴图", type: "txt", style: "" }
        ],
        clickMta: "click_customenv_button",
        startMta: "click_customenv_start"
      },
      {
        id: 15,
        name: "imageSprite",
        type: "scene",
        title: "精灵图序列",
        description: [
          { txt: "源场景：", type: "title", style: "" },
          {
            txt:
              "源场景中仅添加了名称为“Childhood-Dreams-1”的音频对象，并在编辑器后台设置自动循环播放；",
            type: "txt",
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          { txt: "1.音频播放时同步播放精灵图序列；", type: "txt", style: "" },
          {
            txt: "2.点击精灵图序列暂停精灵图序列播放与音频播放；",
            type: "txt",
            style: ""
          },
          {
            txt:
              "3.处于暂停状态的精灵图序列再次被点击，继续播放精灵图序列与音频",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_sprite_button",
        startMta: "click_sprite_start"
      }
    ]
  },
  {
    title: "多图识别",
    child: [
      {
        id: 16,
        name: "autoEnter",
        type: "cloudar",
        title: "使用kivi-cloudar实现",
        description: [
          { txt: "实现流程：", type: "title", style: "" },
          {
            txt:
              "1.使用kivi-cloudar加载Kivicube项目，扫描图像识别后，返回场景ID；",
            type: "txt",
            style: ""
          },
          { txt: "2.跳转新的页面加载刚才识别到的场景", type: "txt", style: "" }
        ],
        clickMta: "click_cloudar_button",
        startMta: "click_cloudar_start"
      }
    ]
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
            style: ""
          },
          {
            txt: "（2）隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: ""
          },
          {
            txt: "（3）场景切换功能；",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_cloudar_button",
        startMta: "click_cloudar_start"
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
            style: ""
          },
          {
            txt: "（2）隐藏自带的云识别扫描提示，并自定义UI；",
            type: "txt",
            style: ""
          },
          {
            txt: "（3）隐藏自带的图像跟踪提示，并自定义UI；",
            type: "txt",
            style: ""
          },
          {
            txt: "（4）场景切换功能；",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_tracking_button",
        startMta: "click_tracking _start"
      }
    ]
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
            style: ""
          },
          { txt: "高级API功能：", type: "title", style: "" },
          {
            txt:
              "1.透明视频播放完毕后，跳转到新的小程序页面（开发者可以在新的页面开发比如发券、发红包功能）",
            type: "txt",
            style: ""
          }
        ],
        clickMta: "click_arscan_button",
        startMta: "click_arscan_start"
      }
    ]
  }
];
export default sceneOptions;
