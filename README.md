## 一个动态图片展示效果：
### 1.页面刷新重新排列图片位置
### 2.中间位置随机放大展示其中一张图片。
### 3.点击其他指定图片或导航按钮，会重新排列位置，并在中间位置展示指定的图片。
### 4.若点击的图片或导航按钮对应的图片已展示在中间位置，则翻转图片。
### 存在的问题：
- Chrome和Firefox下效果最佳，safari下图片重排列效果存在抖动问题，仍在查找兼容方案
- 若photo back面的内容过多，会导致图片翻转过程中图片偶发的短暂消失，翻转完成后出现，所以设置`overflow：hidden`
- 代码过于笨重，需简化
 
[效果预览](https://yangzhiyang.github.io/gallery/index.html)

[灵感来源](http://www.17sucai.com/preview/1/2014-12-23/ScatteredPolaroidsGallery/index.html)
