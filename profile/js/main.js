// fullpage配置

// 控制动画显示，第二次加载不再显示动画
var counter1= 0;
var counter2= 0;
var counter3= 0;
var counter4= 0;
$(function() {
	$('#fullpage').fullpage({
		verticalCentered:false, //取消默认垂直居中
		navigation: true, // 显示圆点导航
		navigationTooltips: ['你谁啊？', '你会啥？','弄过啥？','以前干啥？'], // 圆点导航显示
		slidesNavigation: true, // 显示slide导航
		// scrollOverflow: true,
		// autoScrolling: false;
		afterLoad:function (anchorlink,index) {
			switch(anchorlink,index) {
				case 1:
					$('.avator-wrapper').addClass('animated bounceInDown');
					//  循环闭包  ！！！！
					$(function () {
						var items= $('.item');
						for(var i= 0; i < items.length; i++) {
							(function (i) {
								setTimeout(function () {
									$('.item').eq(i).show().addClass('animated bounceInUp')
								},i*200)
							})(i)
						}
					});
					// 动态打印字符   全局counter控制，避免回滚是触发afterload，重新打印
					if (counter1 === 0) {
						$(function () {
							var p1= '吴正坤';
							var p2 ='stay hungry, stay foolish.';
							var count= 0;
							var timer1= setInterval(function () {
								$('.name').html(p1.slice(0,count));
								count++;
								if(count > p1.length+1) {
									clearInterval(timer1);
									var timer2= setInterval(function () {
										$('.geyan').html(p2.slice(0,count));
										count++;
										if (count > p2.length + 1) {
											clearInterval(timer2)
										}
									},100)
								}
							},300);
						});
						counter1++;
					} else {
						return
					}
				break;
				case 2:
				// 动态画圆
					if (counter2 === 0){
						var skills= $('.skill-arc');
						for (var i= 0; i < skills.length; i++) {
							if (skills[i].getContext) {	
								var eachdeg= ( (2 * skills[i].dataset.score) / 100 - 0.5) * Math.PI;
								drawArc(skills[i], -Math.PI/2, eachdeg, 2*Math.PI/180, 100, 100, 90, 250, 250, skills[i].dataset.score);
							};

						}
					};
					counter2++;
					$('.rate').show().addClass('animated bounceInRight');
				break;
				case 3:
					if (counter3 === 0) {
						animate('.demo-1', 'animated bounceInUp');
						$('#demo1-info').show().addClass('animated bounceInRight')
					};
					counter3++;
				break;
				case 4:
				// 动态绘制时间轴
					if (counter4 === 0){
						var timeAxis= $('#timeAxis')[0];
						var y = document.documentElement.clientHeight;
						if(y >= 900) {
							if (timeAxis.getContext) {
								timeAxis.width= 20;
								timeAxis.height= 900;
								var axis= timeAxis.getContext('2d');
								drawLine(axis, 900, 800, 6); //第一条线
								setTimeout(function () { 				//第一个时间
									$('.time1').show().addClass('animated bounceInUp'); 
								}, 200);
								setTimeout(function () { 	//第二条线
									drawLine(axis, 760, 470, 6);
								},1000);
								setTimeout(function () { 								//第一个exp
									$('.exp1').show().addClass('animated bounceInUp')
								},1000);
								setTimeout(function () { 				//第二个时间
									$('.time2').show().addClass('animated bounceInRight');
								},1200);
								setTimeout(function () { 	//第三条线
									drawLine(axis, 430, 140, 6)
								},2000);
								setTimeout(function () { 				//第三个时间
									$('.time3').show().addClass('animated bounceInUp');
								},2100);
								setTimeout(function () { 								//第二个exp
									$('.exp2').show().addClass('animated bounceInLeft')
								},2100);
								setTimeout(function () {
									drawLine(axis, 100, 0, 6)
								},3100);
							};
						} else if (y >= 600 && y < 900) {
							console.log(111);
							if (timeAxis.getContext) {
								timeAxis.width= 20;
								timeAxis.height= 760;
								var axis= timeAxis.getContext('2d');
								drawLine(axis, 760, 710, 6); //第一条线
								setTimeout(function () { 				//第一个时间
									$('.time1').show().addClass('animated bounceInUp'); 
								}, 200);
								setTimeout(function () { 	//第二条线
									drawLine(axis, 670, 450, 6);
								},1000);
								setTimeout(function () { 								//第一个exp
									$('.exp1').show().addClass('animated bounceInUp')
								},1000);
								setTimeout(function () { 				//第二个时间
									$('.time2').show().addClass('animated bounceInRight');
								},1200);
								setTimeout(function () { 	//第三条线
									drawLine(axis, 410, 190, 6)
								},2000);
								setTimeout(function () { 				//第三个时间
									$('.time3').show().addClass('animated bounceInUp');
								},2100);
								setTimeout(function () { 								//第二个exp
									$('.exp2').show().addClass('animated bounceInLeft')
								},2100);
								setTimeout(function () {
									drawLine(axis, 150, 120, 6)
								},3100);
							};	
						}
					};
					counter4++;
				break;
			}
		},
		afterSlideLoad: function (slideIndex) {
			switch(slideIndex) {
				case 2:
					animate('.demo-2', 'animated bounceInDown');
				break;
			}
		}
	})
})

//封装画圆函数drawArc
function drawArc(el, startdeg, overdeg, addtion, x, y, r, width, height, score){
	if (el.getContext) {
		el.width = width;
		el.height = height;
		var ctx = el.getContext('2d');
		var curdeg = startdeg;
		function draw(){
			if (curdeg < overdeg) {
				curdeg += addtion
			} else {
				curdeg = overdeg;
				return;
			}
			ctx.beginPath();
			ctx.lineWidth= 5;
			ctx.arc(x, y, r, startdeg, curdeg,false);
			ctx.strokeStyle= '#fff';
			ctx.stroke();
			requestAnimationFrame(draw);	
		};
	};
	draw();

	//绘制文字
	var fontsize= 30;
	ctx.beginPath();
	if (score < 60) {
		text= '一般'
	} else if (score >= 60 && score < 80) {
		text= '良好'
	} else {
		text= '精通'
	};
	ctx.font=fontsize + 'px' +' Microsoft Yahei';
	ctx.fillStyle= 'rgba(255,255,255,0.7)';
	ctx.fillText(text, x - fontsize, y + fontsize/2);

}

//封装 循环闭包 addClass() 函数
function animate(el, animation) {
	var classes= $(el);
	for (var i = 0; i < classes.length; i++) {
		(function (i) {
			setTimeout(function () {
				$(el).eq(i).show().addClass(animation);
			},i * 200);
			setTimeout(function () {
				$(el).eq(i).removeClass(animation);
			},i * 700);
		})(i);
	}
}


//封装 画线函数，绘制时间轴
function drawLine(canvas, start, over, decrease, x, y) {
	var cur= start;
	canvas.beginPath();
	canvas.moveTo(0,start);
	function line() {
		if (cur > over){
			cur -= decrease;
		} else {
			cur = over;
			return
		}
		canvas.lineTo(0,cur);
		canvas.lineWidth= 5;
		canvas.strokeStyle= '#fff';
		canvas.stroke();
		requestAnimationFrame(line);
	};
	line();
}

// 图片懒加载配置
Echo.init({
    offset: 0,//离可视区域多少像素的图片可以被加载
　　throttle: 0 //图片延时多少毫秒加载
}); 
