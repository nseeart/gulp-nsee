#gulp-twig-data 
利用twig模板在前后端共用的特性做前后端开发分享方案

####目录结构
```
apps       //项目
--demo	   //式例项目1
----build
------less     //less目录
------twig     //模板目录
------js       //脚本目录
------images   //图片目录
------rev      //临时rev相关文章
----data      //模拟动态数据.json目录
----dist      //生成调试目录
------css
------js
------images   //压缩后图片目录
------index.html
--demo1
--...
assets      //后端静态资源目录
mode_modules
tasks       //gulp子任务gulpfile.demo.js
views       //后端模板目录
gulpConfig.json   //目录配置
gulpfile.js       //gulp配置
```

####发布目录配置
在gulpConfig.json中配置
```javascript
{
	"appPath":"/apps",    //前端项目目录
	"viewsPath": "./views",   //后端模板目录（.twig ）
	"assetsPath": "./assets"   //后端静态资源目录 （img,js,css）
}
```

####发布命令
* 默认命令（twig,less,js,watch）
```
gulp demo（项目名|目录名）
```

* 发布到后端模板目录
```
gulp demo:views
```

* 发布到后端静态资源目录
```
gulp demo:assets
```