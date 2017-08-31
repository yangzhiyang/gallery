            //生成随机数
            function random(min,max){
                var num = parseInt(Math.random()*(max-min)+min)
                return num 
            } 
            //输出所有数据
            var data = data
            function addPhotos() {
                var temp = document.querySelector('#wrap').innerHTML
                var html = [] 
                var nav = []              
                for(let i=0;i<data.length;i++) {
                     var _html = temp.replace('{{index}}',i)
                                    .replace('{{img}}',data[i].img)
                                    .replace('{{title}}',data[i].title)
                                    .replace('{{describe}}',data[i].describe)
                    html.push(_html)
                    nav.push('<span id="nav_'+i+'" class="i">&nbsp</span>')
                }
                html.push('<div class="nav">'+ nav.join('') +'</div>')
                document.querySelector('#wrap').innerHTML = html.join(' ')
                reSort(random(0,data.length))

            }
            addPhotos()
            //图片排序
            function reSort(n) {
                var _photo = document.querySelectorAll('.photo')
                var _photos = []
                var navs = document.querySelectorAll('.i')
                 for(let i=0;i<_photo.length;i++){
                     _photo[i].className = _photo[i].className.replace(/\s*center\s*/,' ')
                     _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/,' ')
                     _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/,' ')
                     _photo[i].style.left = ''
                     _photo[i].style.top = ''
                     _photo[i].style.right = ''     
                     _photo[i].style.transform= ''
                     //形成标准数组
                     _photos.push(_photo[i])
                 }
                var photoCenter = document.querySelector('#photo_'+n),
                    navCurrent = document.querySelector('#nav_'+n)
                photoCenter.className += ' center'
                photoCenter = _photos.splice(n,1)[0]
                //划分图片左右分区
                var photosLeft = _photos.splice(0,Math.floor(_photos.length/2)),
                    photosRight = _photos,
                    photoWidth = document.querySelector('.photo').clientWidth,
                    photoHeight = document.querySelector('.photo').clientHeight,
                    wrapWidth = document.querySelector('#wrap').clientWidth,
                    wrapHeight = document.querySelector('#wrap').clientHeight
                 for(let i=0;i<photosLeft.length;i++){
                     //左分区图片分布范围
                     //0-photoWidth < left < warpWidth/2-photoWidth/2
                     //0-photoHeight < top < wrapHeight
                    photosLeft[i].style.left = random(0-photoWidth,wrapWidth/2-photoWidth/2)+'px'
                    photosLeft[i].style.top = random(0-photoHeight,wrapHeight)+'px'
                    photosLeft[i].style['transform'] = 'rotate('+random(-120,120)+'deg) scale(.8)'
                    console.log(wrapWidth/2-photoWidth/2);

                 }
                 for(let i=0;i<photosRight.length;i++){
                     //右分区图片分布范围
                     //0-photoWidth < right < warpWidth/2-photoWidth/2
                     //0-photoHeight < top < wrapHeight
                     //右分区定位改用left为了覆盖初始定位left：50%
                    photosRight[i].style.left = wrapWidth - random(0-photoWidth,wrapWidth/2-photoWidth/2)+'px'
                    photosRight[i].style.top = random(0-photoHeight,wrapHeight)+'px'
                    photosRight[i].style['transform'] = 'rotate('+random(-120,120)+'deg) scale(.8)'
                    
                    

                } 
                for(let i=0;i<navs.length;i++){
                    navs[i].className = navs[i].className.replace(/\s*i_current\s*/,' ')
                    navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ')
                } 
                navCurrent.className += ' i_current'


            }
            //图片翻转
            var photos =document.querySelectorAll('.photo')
            var navs = document.querySelectorAll('.i')
            for(let i=0;i<photos.length;i++){               
                photos[i].addEventListener('click',function(){
                    var clsName = photos[i].className
                    if(!/center/.test(clsName)){
                        return reSort(i)
                    }
                    if(/photo-front/.test(clsName)){                   
                        clsName = clsName.replace(/photo-front/,'photo-back') 
                        navs[i].className += ' i_back'
                    }else{
                        clsName = clsName.replace(/photo-back/,'photo-front') 
                        navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ')
                    }
                    return photos[i].className = clsName
                })
            }
            //导航栏点击翻转
            for(let i=0;i<navs.length;i++){
                navs[i].addEventListener('click',function(){
                    var clsName = photos[i].className
                    if(!/center/.test(clsName)){
                        return reSort(i)
                    }
                    if(/photo-front/.test(clsName)){                   
                        clsName = clsName.replace(/photo-front/,'photo-back') 
                        navs[i].className += ' i_back'

                    }else{
                        clsName = clsName.replace(/photo-back/,'photo-front') 
                        navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ')

                    }
                    return photos[i].className = clsName
                })
            }
