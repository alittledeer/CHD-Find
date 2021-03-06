## 项目名称
长大寻物——长安大学失物招领服务
## 项目介绍
#### 1.介绍
“长大寻物”小程序是针对失主和拾主两类用户进行开发和设计，整合目前已有的相关App的优点，目的在于为失主提供一个安全、有效、快捷、方便的信息接收，为拾主提供一个快速、高效的信息发布平台，为长大校园提供一个让人放心、让人满意、轻松使用的失物招领服务平台。其功能有五个部分：拾主信息发布功能、拾主申请领取功能、管理人员审核功能、信息展示功能、用户投诉与建议。其中，失主申请领取功能，失主可以通过提供相关证明信息，从而提交表单，让管理人员进行审核；拾主信息发布功能，拾主可以通过提供相应拾取信息，提交表单，让管理人员进行审核；信息展示功能，能够在首页进行信息的展示和搜索；管理人员审核功能，使得管理人员可以审核信息的发布和失主申请；用户投诉与建议可以让用户对管理过程中遇到的问题提供建议。
#### 2.使用角色
校园物品遗失寄存相关管理负责人员、校园学生及教职工
#### 3.创新点
- 相较于APP需要用户下载、申请账号、身份认证、登陆等环节后才能使用，微信小程序属于格外的能源节约模式。它内嵌于社交软件微信，更适用于 用户低频率、及时化的应用场景。用户可以通微信公共平台提供的界面，轻松地连接到第三方服务器提供的服务。使用完毕需要退出时，可直接点击关闭按钮，用完即走的理念能够满足用户需求且节省用户的手机内存。
- 对于系统开发者，微信小程序的优势也十分明显，小程序覆盖了PC网页接口、微信公众号等多个板块，大大减小了开发成本、减少了系统维护、升级成本。同时可借助微信强大的流量入口，减少了运营的成本，并且降低了推广的难度。内嵌于微信公众号中开发失物招领小程序，则方便运营者与用户交互和平台运营，运营者一方面可以通过公众号对话框接收用户实时的反馈意见，一方面借由公众号的流量收入覆盖经营成本。总体来说，搭建校园失物招领微信小程序是一 种有效的平台，加之校园内部统的实体失物招领站点的管理，能够更好及时地在小程序中反馈失物信息，高效找寻失物。
## 效果展示

![展示1](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E5%B1%95%E7%A4%BA1.gif "展示1")
![展示2](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E5%B1%95%E7%A4%BA2.gif "展示2")
![展示3](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E5%B1%95%E7%A4%BA3.gif "展示3")
![展示4](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E5%B1%95%E7%A4%BA4.gif "展示4")
![展示5](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E5%B1%95%E7%A4%BA5.gif "展示5")

## 项目架构
![项目架构](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E6%9E%B6%E6%9E%84.png "项目架构图")

小程序架构如上图所示，“长大寻物”小程序融合无服务器有关技术，整体架构的最底层为Android系统和IOS系统，微信应用作为宿主环境继承相关权限，逻辑层上基于微信小程序API用于云端操作，基于JavaScript语言代码进行编码，使用进程的相关技术，利用无服务器架构函数即服务的理念所提供的云函数，在小程序端进行编写，于云端部署，成功部署后获得文档型数据库的最高权限，而最上层即视图层使用WXML和WXSS语言，更加符合小程序的编写习惯，有利于开发。
## 概念设计
如下图所示为程序的整体流程图。
![项目流程图](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E9%95%BF%E5%A4%A7%E5%AF%BB%E7%89%A9%E4%B8%BB%E6%B5%81%E7%A8%8B%E5%9B%BE%20(1).png "项目流程图")

## 部署教程

#### 1.下载相关平台与项目
- **1.1下载工具平台**。首先下载[微信小程序开发平台](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html "小程序开发平台下载")，根据自己的系统下载合适的版本（本项目基于Windows 64），下载好后，按照提示，一步步进行安装，然后打开安装平台。
- **1.2下载本项目**。在本项目master分支下直接下载，点击Code->Download Zip，即可下载到本地。或打开cmd输入下面一行代码进行下载：
```Bash
git clone https://github.com/alittledeer/CHD-Find.git
```

#### 2.打开项目工程（参考[官方链接](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#%E7%94%B3%E8%AF%B7%E5%B8%90%E5%8F%B7 "参考链接")）
- **2.1申请账号**。在[申请账号页面](https://mp.weixin.qq.com/wxopen/waregister?action=step1 "申请账号页面")申请账号，根据指引填写信息和提交相应的资料，就可以拥有自己的小程序帐号
进入小程序注册页 根据指引填写信息和提交相应的资料，就可以拥有自己的小程序帐号。
- **2.2获取AppID**。登录[小程序后台](https://mp.weixin.qq.com/ "微信小程序后台") ，我们可以在菜单 “开发”--->“开发设置” 看到小程序的AppID了。小程序的AppID相当于小程序平台的一个身份证，后续很多地方要用到AppID。
- **2.3打开项目**。打开微信开发工具，使用注册好的账号扫二维码进入，并导入下载好的本项目。如下图所示

![项目部署1](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B21.png "项目部署1")
![项目部署2](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B22.png "项目部署2")

#### 3.转为云开发工程
- **3.1云开发部署**。由于会涉及到云开发相关工具，因此本小程序会将其转为云开发项目。打开项目后，点击工具栏中的“云开发”按钮，如下图：

![云开发按钮](https://github.com/alittledeer/CHD-Find/blob/master/imgs/1.%E5%BC%80%E9%80%9A%E4%BA%91%E6%9C%8D%E5%8A%A1.png "云开发按钮")

然后创建环境名称，等待几十秒后，即可创建成功，创建成功如下图。

![项目部署成功](https://github.com/alittledeer/CHD-Find/blob/master/imgs/%E4%BA%91%E5%BC%80%E5%8F%91%E9%83%A8%E7%BD%B2%E6%88%90%E5%8A%9F%E9%A1%B5%E9%9D%A2.png "部署成功")

- **3.2.云函数部署**。
如下所示在project.config.json中输入如下代码，其目的是声明一个云函数文件夹的名称和路径，点击如下图中红框所示标志手动创建一个同名文件夹。文件夹名称和代码声明名称必须一致
代码：
```javascript
{
  "description": "项目配置文件",
  "cloudfunctionRoot":"cloudFn",
  "packOptions": {
  "ignore": []
},
```
![文件配置](https://github.com/alittledeer/CHD-Find/blob/master/imgs/5.%E5%88%9B%E6%96%87%E4%BB%B6%E5%A4%B9%E9%85%8D%E7%BD%AE.png "创文件配置")

## 项目链接
[https://github.com/alittledeer/CHD-Find](https://github.com/alittledeer/CHD-Find)

### 开源许可证
[链接](https://github.com/alittledeer/CHD-Find/blob/master/LICENSE "开源许可证链接")
