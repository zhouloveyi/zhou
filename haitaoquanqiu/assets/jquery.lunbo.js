(function($){
	$.fn.lunbo = function(options){
		// 预设默认值
		var defaults = {
			autoPlay:true,
			showSmall:true,
			showButton:true,
			type:'fade' //渐显(fade,默认)，上下滚动(moveY)，左右滚动(moveX)
		}
		var opt = $.extend(defaults,options);

		this.each(function(){
			var $focus = $(this);
			var $bigWrap = $('.big-wrap',$focus);//与find效果相同，一般用于插件编写
	        var $big = $('ul',$focus);
			//显示图片索引
	        var index = 0;

	        // 获取图片数量
	        var len = $big.children('li').length;

	        // 给大图设置高度
	        // **获取图片的高度必须等待图片加载完成
	        $big.children('li').find('img').eq(0).load(function(){
	        	var imgWidth = $(this).outerWidth();
	        	var imgHeight = $(this).outerHeight()
	        	$bigWrap.css({
	        		height:imgHeight,
	        		width:imgWidth
	        	});
	        	$focus.width(imgWidth);
	        });
	        

	        // 初始化：
	        // 显示小图标
	        if(opt.showSmall){
	        	var $smallWrap = $('<div/>').addClass('small-wrap');
		        for(i=0;i<len;i++){
				var $p=$('<p/>')
		        $p.appendTo($smallWrap);
		        $focus.append($smallWrap);
				}
		        // 点击小图切换效果
		        $smallWrap.on('click','p',function(){
		            index = $(this).index();
		            show();
		        });
	        }
	        // 页面加载时显示第一张图
	        show();

			if(opt.autoPlay){
				var timer;

				// 鼠标移入停止，移除继续
				$focus.on('mouseenter',function(){
				clearInterval(timer);
				if(opt.showButton){
	        	// 添加左右按钮
		        $('<span/>').addClass('prev').html('&lt;').appendTo($focus);
		        $('<span/>').addClass('next').html('&gt;').appendTo($focus);
	        }
				}).on('mouseleave',function(){
				timer = setInterval(animation,1000);
				var $span=$focus.find('span');
				$span.remove();
				}).trigger('mouseleave');
			}
			//上一张
			$focus.on('click','.prev',function(){
		        	index--;
		        	show();
		        })

		        // 下一张
		     .on('click','.next',animation);

	        // 图片切换
	        function animation(){
	            index++;
	            show();
	        }
	        function show(){
	            if(index==len){
	                index=0;
	            }else if(index < 0){
	                index = len - 1;
	            }
	            $big.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0});
	            if(opt.showSmall){
					$smallWrap.find('p').eq(index).addClass('now').siblings().removeClass('now');
	            }
	            
	        }
		});
        
        return this;
	}
})(jQuery);

// $('#focus').arSlide();
// $('.focus').arSlide();