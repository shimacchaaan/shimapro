$(function(){
  "use strict";

	var ua = navigator.userAgent;

	/* ie6判定 */
    var isIe6 = (typeof document.documentElement.style.maxHeight === "undefined") ? true : false;

	/* スマホ判定 */
	var isSp = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) ? true : false;
	var isIphone = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 ) ? true : false;
	var isIpad = (ua.indexOf('iPad') > 0 ) ? true : false;

	/*とりま急ごしらえ*/
	if(isIpad){$("meta[name=viewport]").remove(); console.log('hoge');}  

	/* スライドショー */
	var changeImg = function(data, target){

		//設定

		var imgOver = target.find('.over');
		var imgUnder = target.find('.under');
		var targetExp = target.find('p');
		var cnt = 0;

		//スライド

		var changeAction = function(){

			//カウンタ巻き戻し判定
			if(cnt >= data.length) {
				cnt = 0;
			}

			//フェードアウト. コールバック関数内で画像書き換え
			imgOver.animate({'opacity': 0}, 'slow',function(){

				//over画像セット,再描画
				imgOver.attr('src', data[cnt]).css('opacity','1');

				//under画像セット
				if(cnt + 1 < data.length) {
					imgUnder.attr('src', data[cnt + 1]);
				} else {
					imgUnder.attr('src', data[0]);
				}

				//カウンタ進める
				cnt++;
				
			});

		};

		//マウスオーバー

		var hoverAction = function(){

			//説明ボックス初期化
			targetExp.css({'display':'block', 'opacity': 0});

			//アクション
			target.hover(function(){
				targetExp.stop().animate({'opacity':0.8}, 'slow');
			}, function(){
				targetExp.stop().animate({'opacity':0}, 'slow');
			});

			// スマホ向け追記
			if(isSp) {
				target.click(function(){
					targetExp.toggle('fast');
				});
			}

		};

		//初期化

		var init = function(){
			
			imgOver.attr('src', data[0]);
			imgUnder.attr('src', data[1]);

			cnt = 1;
			window.setInterval(changeAction, 2000);

			hoverAction();

		};

		init();

	};// end of changeImg

	/* トップスクロール */
	var scrollToTop = function(target){

		var masterWindow = $(window);

		//出し入れ
		var hideShow = function(){

			if(masterWindow.scrollTop() < 500) {
				//target.animate({'opacity':0}, 1000).css('display', 'none');;
				target.fadeOut();
			} else {
				//target.animate({'opacity':1}, 1000).css('display', 'block');
				target.fadeIn();
			}

		};

		//アニメーション
		var scrollEffect = function(){

			$($.browser.webkit ? 'body' : 'html').animate({ scrollTop: 0 }, 1500, 'easeOutQuart');

		};

		//初期化

		var init = function(){

			target.hide();
			if(!isIe6) {
				masterWindow.scroll(hideShow);
			}
			target.click(scrollEffect);
			blinkEffect(target, 0.8);

		};

		init();

	};// end of scrollToTop

	/* ナビゲーションスクロール */
	var navScroll = function(triggers){

		var scrollFunc = function(event){

			//アンカー名&位置取得
			var urlStr = event.target.href;
			var anchorStr = urlStr.slice(urlStr.lastIndexOf('#'));
			var anchorPos = $(anchorStr).offset().top;

			//スクロールアニメーション
			$($.browser.webkit ? 'body' : 'html').animate({scrollTop: anchorPos}, 1500, 'easeOutQuart');

		};

		//イベント付与
		triggers.click(scrollFunc);

	};// end of navScroll

	var hoverFade = function(target){
		target.hover(function(){
			$(this).stop().animate({'opacity':0}, 'slow');
		}, function(){
			$(this).stop().animate({'opacity':1}, 'slow');
		});

	};// end of hoverFade

	/* 点滅 */
	var blinkEffect = function(target, strength, easing, duration){

		var blinking;
		if(strength === undefined){ strength = 0.5;}
		//明示的にundefined -> false　しておく　（意味あるのか）
		if(!easing){ easing = false;}
		if(!duration){ duration = 500;}

		var toggleBlink = function(){
			target.stop().animate({'opacity':strength}, duration, easing, function(){
				$(this).animate({'opacity':1}, duration, easing);
			});
		};

		target.hover(function(){

			blinking = setInterval(function(){
					toggleBlink();
			}, duration * 2);
			toggleBlink();

		}, function(){

			target.stop(true, true);
			clearInterval(blinking);

		});
	};// end of blinkEffect

	/* 開始アニメーション */
	var openingEffect = function() {


		//文字だし
		$('#kikuchiMain').css({'display':'block', 'opacity':0, 'left': '100px'});
		$('#btnFollowTop').css({'display':'block', 'opacity': 0, 'top':'448px'});
		$('#mainTtl li').css({'display':'block', 'opacity': 0 });


		var typeEffect = function(callback){
			var cnt = 0;
			var duration = 300;
			for (var i = 1; i < 9; i++) {
				$('#title'+ i).css({'top': cnt - 50 + 'px'}).delay(duration * i).animate({'opacity': 1, 'top': cnt + 'px'}, duration, 'easeOutBounce');
				if(i === 4) {cnt = 90;}
			}
			$('#subTtl').css({'opacity': 0, 'top':'142px'}).delay(2800).animate({'opacity':1, 'top':'190px' }, 500, 'easeOutBounce', callback);
		};

		var mainEffect = function(callback){
			$('#kikuchiMain').delay(400).animate({'opacity':1, 'left': '474px'}, 1700, 'easeOutCirc');
			$('#btnFollowTop').delay(1650).animate({'opacity':1, 'top':'448px' }, 500, 'easeOutBack', callback);
			$('#btnFollowTop .overlay').delay(1700).animate({'left': '200px'}, 1000, function(){$(this).css('left', '-200px');});
		};

		//スタートタイミング
		var timing = (!isSp) ? 700 : 2700;
		setTimeout( function(){ typeEffect(mainEffect);}, timing);	

	}; // end of openingEffect 

	/* ボタン系エフェクト */
	var btnEffects = function(){

		//blinkEffect($('#btnEntry a'), 0,　false, 800);
		hoverFade($('#btnEntry a'));
		hoverFade($('#btnFollowTop a'));
		hoverFade($('#btnFollowBottom a'));
		$('#wallpaperPrev dd a').each(function(){
			blinkEffect($(this), 0, false, 1500);
		});

		setInterval(function(){
			$('#btnEntry .overlay').animate({'left': '480px'}, 500, 'swing', function(){ $(this).css('left', '-200px');});
		}, 2000);

	}; // end of buttomEffects

	/*　デバイス調整 */
	var deviceFix = function(){
		//css読み込み
		var fixCss;
		if(isIphone) { fixCss = './css/iphone.css';}
		else if(!isSp){ fixCss = './css/pc.css';}

		if(fixCss) {
			var link = $(document.createElement('link')).attr({
			'href': fixCss,
			'rel' : 'stylesheet',
			'type' : 'text/css'
			});
			$('head').append(link);
		}
		
		if(isSp) {
			$('#biography .guide dt').html('tap');
		} else {
		//高画質書き戻し
			$('#kikuchiMain').attr('src','./img/kikuchi_main.png');		
		}
	};

	/* コントロール関数 */
	var masterInit = function(){ 

		/* スライドショー */
		//スライドデータ
		var setting = {

			//画像 20210222更新画像17
			
			images:[
				['./img/career1_a_shima.jpg', './img/career1_a_shima.jpg'],
				['./img/career2_a_shima.jpg', './img/career2_b_shima.jpg', './img/career2_c_shima.jpg', './img/career2_d_shima.jpg', './img/career2_e_shima.jpg'],
				['./img/career3_a_shima.jpg', './img/career3_b_shima.jpg', './img/career3_c_shima.jpg', './img/career3_d_shima.jpg', './img/career3_e_shima.jpg', './img/career3_f_shima.jpg', './img/career3_g_shima.jpg'],
				['./img/career4_a_shima.jpg', './img/career4_b_shima.jpg', './img/career4_c_shima.jpg', './img/career4_d_shima.jpg']
			],

			//はこ
			targets:['#careerImage1', '#careerImage2', '#careerImage3', '#careerImage4']
		};

		///スライド組み立て
		for(var i = 0; i <= 3; i++){
			changeImg(setting.images[i], $(setting.targets[i]));
		}

		//スクロールボタン
		scrollToTop($('#btnTopScroll'));

		//ナビゲーションスクロール
		navScroll($('#globalNav a'));

		//ナビゲーションホバー
		$('#globalNav a').each(function(){ blinkEffect($(this), 0,　false, 800);});

		//ボタン系
		btnEffects();

		//オープニングアニメーション
		openingEffect();

		deviceFix();

	};// end of masterInit

	masterInit();

}
);
