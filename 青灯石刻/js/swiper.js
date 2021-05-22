;(function($){
	$.fn.carousel = function(param){
		var carousel = param.carousel,//杞挱妗嗘灦
		indexContainer = param.indexContainer,//涓嬫爣妗嗘灦
		list = $(carousel).children("li"),//杞挱鍐呭
		len = list.length,//杞挱鍐呭鏁伴噺
		prev = param.prev,//涓婄炕鎸夐挳
		next = param.next,//涓嬬炕鎸夐挳
		timing = param.timing,//鑷姩杞挱闂撮殧鏃堕棿
		animateTime = param.animateTime,//鍔ㄧ敾鏃堕棿
		autoPlay = param.autoPlay,//鑷姩鎾斁 true/false
		timer,//瀹氭椂鍣�
		index = 1,//绱㈠紩鍊�
		indexList,//涓嬫爣鍒楄〃
		indexClassName = "js_index",//涓嬫爣楂樹寒绫诲悕
		action = true,//寮€濮嬫粴鍔� true/false
		totalWidtn = list.width()*(list.length+2),//杞挱妗嗘灦鎬诲搴�
		direction = param.direction;//婊氬姩鏂瑰悜
		
		/*鍒濆鍖�*/
		for(var i = 1;i <= list.length;i++){
			$(indexContainer).append("<li>"+i+"</li>")
		}
		$(carousel).width(totalWidtn)
		.append($(list[0]).clone())
		.prepend($(list[list.length-1]).clone())
		.css("left","-"+list.width()+"px");
		list = $(carousel).children("li");
		indexList = $(indexContainer).children("li");
		$(indexList[index-1]).addClass(indexClassName);

		/*鍒ゆ柇鏄惁鑷姩鎾斁*/
		if (autoPlay) {
			startTiming();
			$(carousel+","+prev+","+next+","+indexContainer).hover(function(){
				window.clearInterval(timer);
			},function(){
				startTiming();
			});
		}

		/*璁℃椂鏂规硶*/
		function startTiming(){
			/*鍒ゆ柇鏂瑰悜*/
			switch (direction) {
				case "right" :
					timer = window.setInterval("$.rightChangeImg();",timing);
				break;
				case "left" :
					timer = window.setInterval("$.leftChangeImg();",timing);
				break;
				default:
					timer = window.setInterval("$.leftChangeImg();",timing);
			}
		};

		/*鍒囨崲楂樹寒涓嬫爣*/
		$.extend({changeIndex:function(index){
			$(indexList).removeClass(indexClassName);
			$(indexList[index]).addClass(indexClassName);
		}});
		

		/*鍚戝乏鍒囨崲鍥剧墖*/
		$.extend({leftChangeImg:function(){
			action = false;
			if (index==len) {
				index = 0;
				$(carousel).stop(true,true).css("left","0px");
			}
			index++;
			$(carousel).stop(true,true).animate({
				left : "-="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==len) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				action = true;
			},animateTime);
			$.changeIndex(index-1);
		}});

		/*鍚戝彸鍒囨崲鍥剧墖*/
		$.extend({rightChangeImg:function(){
			action = false;
			if (index==0) {
				index = len;
				$(carousel).stop(true,true).css("left","-"+left+"px");
			}
			index--;
			var left = totalWidtn-list.width()*2;
			$(carousel).stop(true,true).animate({
				left : "+="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				action = true;
			},animateTime);
			if (index == 0) {
				$.changeIndex(len-1);
			}else{
				$.changeIndex(index-1);
			}
		}});

		/*涓嬬炕鐐瑰嚮澶勭悊*/
		$(next).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == left) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				$.leftChangeImg();
			}
		});

		/*涓婄炕鐐瑰嚮澶勭悊*/
		$(prev).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == 0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				$.rightChangeImg();
			}
		});

		/*涓嬫爣鐐瑰嚮澶勭悊*/
		indexList.on("click",function(){
			var no = $(this).index()+1;
			if (action) {
				if (no > index) {
					$.changeIndex(no-1);
					action = false;
					var left = (no - index)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "-="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}else if (no < index) {
					$.changeIndex(no-1);
					action = false;
					var left = (index - no)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "+="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}
	
			}
		});
	}
})(jQuery);