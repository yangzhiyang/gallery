var Gallery = (function(){
    function _Gallery(){
        this.dataArr =data;
        this.photos;
        this.navs;
        this.addPhotos();
    }
    _Gallery.prototype = {
        addPhotos: function(){
            var temp = document.querySelector('#wrap').innerHTML;
            var html = []; 
            var nav = [];              
            for(let i=0;i<this.dataArr.length;i++) {
                    var _html = temp.replace('{{index}}',i)
                                .replace('{{img}}',this.dataArr[i].img)
                                .replace('{{title}}',this.dataArr[i].title)
                                .replace('{{describe}}',this.dataArr[i].describe);
                html.push(_html);
                nav.push('<span id="nav_'+i+'" class="i"></span>');
            }
            html.push('<div class="nav">'+ nav.join('') +'</div>');
            document.querySelector('#wrap').innerHTML = html.join(' ');
            this.photos =document.querySelectorAll('.photo');
            this.navs = document.querySelectorAll('.i');
            this.reSort(this.random(0,this.dataArr.length));
            this.turnAround(this.photos);        
            this.turnAround(this.navs);
        },
        reSort: function(n){
            var _photos = [];
            var navs = document.querySelectorAll('.i');
                for(let i=0;i<this.photos.length;i++){
                this.photos[i].className = this.photos[i].className.replace(/\s*center\s*/,' ');
                this.photos[i].className = this.photos[i].className.replace(/\s*photo_front\s*/,' ');
                this.photos[i].className = this.photos[i].className.replace(/\s*photo_back\s*/,' ');
                this.photos[i].style.left = '';
                this.photos[i].style.top = '';
                this.photos[i].style.right = '';     
                this.photos[i].style.transform= '';
                    //形成标准数组
                    _photos.push(this.photos[i]);
                }
                console.log(_photos);
            var photoCenter = document.querySelector('#photo_'+n),
                navCurrent = document.querySelector('#nav_'+n);
            photoCenter.className += ' center';
            photoCenter = _photos.splice(n,1)[0];
            //划分图片左右分区
            var photosLeft = _photos.splice(0,Math.floor(_photos.length/2)),
                photosRight = _photos,
                photoWidth = document.querySelector('.photo').clientWidth,
                photoHeight = document.querySelector('.photo').clientHeight,
                wrapWidth = document.querySelector('#wrap').clientWidth,
                wrapHeight = document.querySelector('#wrap').clientHeight;
                for(let i=0;i<photosLeft.length;i++){
                    //左分区图片分布范围
                    //0-photoWidth < left < warpWidth/2-photoWidth/2
                    //0-photoHeight < top < wrapHeight
                photosLeft[i].style.left = this.random(0-photoWidth,wrapWidth/2-photoWidth/2)+'px';
                photosLeft[i].style.top = this.random(0-photoHeight,wrapHeight)+'px';
                photosLeft[i].style['transform'] = 'rotate('+this.random(-120,120)+'deg) scale(.8)';
                console.log(wrapWidth/2-photoWidth/2);

                }
                for(let i=0;i<photosRight.length;i++){
                    //右分区图片分布范围
                    //0-photoWidth < right < warpWidth/2-photoWidth/2
                    //0-photoHeight < top < wrapHeight
                    //右分区定位改用left为了覆盖初始定位left：50%
                photosRight[i].style.left = wrapWidth - this.random(0-photoWidth,wrapWidth/2-photoWidth/2)+'px';
                photosRight[i].style.top = this.random(0-photoHeight,wrapHeight)+'px';
                photosRight[i].style['transform'] = 'rotate('+this.random(-120,120)+'deg) scale(.8)';
                
                

            } 
            for(let i=0;i<this.navs.length;i++){
                this.navs[i].className = this.navs[i].className.replace(/\s*i_current\s*/,' ');
                this.navs[i].className = this.navs[i].className.replace(/\s*i_back\s*/,' ');
            } 
            navCurrent.className += ' i_current';
    
        },
        turnAround:function(clickArr){
            var _this = this;
            for(let i =0;i<clickArr.length;i++){
                clickArr[i].addEventListener('click',function(){
                    var clsName = _this.photos[i].className;
                    if(!/center/.test(clsName)){
                        return _this.reSort(i);
                    }
                    if(/photo-front/.test(clsName)){
                        _this.photos[i].className = clsName.replace(/photo-front/,'photo-back');
                        console.log(clsName); 
                        _this.navs[i].className += ' i_back';
                    }else{
                        _this.photos[i].className = clsName.replace(/photo-back/,'photo-front');
                        _this.navs[i].className = _this.navs[i].className.replace(/\s*i_back\s*/,' ');
                    }

                })
            }
        },
        random:function(min,max){
                var num = parseInt(Math.random()*(max-min)+min);
                return num;
        }
                    
    }

    return ({
        init: function(){
            new _Gallery();
        }
    })

})()
Gallery.init();
            
            
            
            
            
            
