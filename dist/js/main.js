(function(){

	let documentWidth = $(document).width();

	if(documentWidth < 768 ){
		$('.customers__content-item').hide();
	}

	$(window).resize(function(){
		let documentWidth = $(document).width();

		if(documentWidth < 768 ){
			$('.customers__content-item').hide();
			$('.menu').hide();
		} else if( documentWidth > 768) {
			$('.customers__content-item').css('display','');
			$('.menu').show();
		}
	})

	$('.customers__accordion-button').click(function(){
		if($(this).next().css('display') === 'none'){
			$('.customers__accordion-button').find('img').removeClass('rotate');
			$('.customers__content-item').slideUp();
			$(this).find('img').addClass('rotate');
			$(this).next().slideDown();
		} else {
			$('.customers__accordion-button').find('img').removeClass('rotate');
			$(this).next().slideUp();
		}
	});

	//tabs start
	$('.customers__tab-nav-item').click(function(e){
		e.preventDefault();

		let thisItemIndex = $(this).index();

		$(this)
		.addClass('active')
		.siblings()
		.removeClass('active');

		$('.customers__content-item')
		.eq(thisItemIndex)
		.addClass('active')
		.siblings()
		.removeClass('active');

	});
	//tabs end
	
	//banner slider start
	let intervalAnimate
	let bigScreen = 0;
	let tableScreen = 0;
	let bigMobileScreen = 0;
	let smallMobileScreen = 0;

	function bannerSlider(){

		let screenWidth = $(document).width(),
			items,
			showItems,
			countItems,
			sliderWidth,
			contentWidth = 0,
			itemWidth,
			margin,
			imgArr,
			imgArraySrc = [],
			prevAnimatedIndex;

		function sizeElements(){

			screenWidth = $(document).width(),
			items = $('.banner__slider-item'),
			showItems = 5,
			countItems = items.length,
			sliderWidth = $('.banner__slider').width(),
			contentWidth = 0,
			itemWidth,
			margin,
			imgArr = $('.banner__slider-content .banner__slider-img')

			if( screenWidth < 990 ){
				if( screenWidth > 767 ){
					showItems = 3;
				} else if( screenWidth > 575 ) {
					showItems = 2;
				} else {
					showItems = 1;
				}
			} 

			itemWidth = sliderWidth / showItems;
			margin = itemWidth / 2;

			for(let i = 0; i < countItems; i++){
				contentWidth += itemWidth;
			}

			for(let i = 0; i < items.length; i++){
				imgArraySrc.push(imgArr.eq(i).attr('src'));
			}
			
			$('.banner__slider-item').css('width', itemWidth);
			$('.banner__slider-content').css('width', contentWidth);
			$('.banner__slider-content').css('margin-left', -margin);

		}

		sizeElements();

		function randomNumber(max){
			return Math.round(Math.random() * max);
		}

		
		function nextSlide(){	
			let imgArr = $('.banner__slider-content').find('.banner__slider-img');
			let animatedItem = items.eq(randomNumber(showItems - 1));
			let src = imgArraySrc[randomNumber(items.length - 1)];
			let showImgArraySrc = [];
			

			for(let i = 0; i < showItems + 1; i++){
				showImgArraySrc.push(imgArr.eq(i).attr('src'));
			}

			while(true){
				if(showItems !== 1){
					if(animatedItem.index() === prevAnimatedIndex){
						animatedItem = items.eq(randomNumber(showItems - 1));
					} else {
						prevAnimatedIndex = animatedItem.index();
						break;
					}
				} else{
					break;
				}
				
			}

			while(true){
				let countImg = 0;

				for(let i = 0; i < showImgArraySrc.length; i++){
					if(showImgArraySrc[i] !== src){
	   					countImg++
					}
				}

				if(countImg === showImgArraySrc.length){
					break;
				} else{
					src = imgArraySrc[randomNumber(items.length - 1)];
				}
			}

			animatedItem.append('<img src=' + src + ' alt="img" class="banner__slider-img mask">');

			setTimeout(function(){
				$('.banner__slider-img.mask').addClass('animate');
				setTimeout(function(){
					animatedItem.find('.banner__slider-img')[0].remove();
					animatedItem.find('.mask').removeClass('mask animate');
				}, 1000)
			}, 500)

		}

		intervalAnimate = setInterval(nextSlide, 5000);

		$(window).resize(function(){
			sizeElements();
		});

	}

	bannerSlider();
	//	banner slider end
	


	//mobile menu start
	$('#menu-icon').click(function(){
		if($(this).find('.menu__icon').hasClass('active')){
			$('.menu').slideUp();
			$(this).find('.menu__icon').removeClass('close');
			setTimeout(() => {
				$(this).find('.menu__icon').removeClass('active');
			}, 300)
		} else{
			$('.menu').slideDown();
			$(this).find('.menu__icon').addClass('active');
			setTimeout(() => {
				$(this).find('.menu__icon').addClass('close');
			}, 300)
		}
	});
	//mobile menu end


	//slider start
	function slider(elem){

		$(elem + ' .slider__next-icon').click(function(e) {
			e.preventDefault();

			let activeElement = $(elem + ' .slider__img.active'),
				nextElement = $(elem + ' .slider__img.active').next(),
				nextElementIndex = nextElement.index();
			
			if(nextElementIndex !== -1){

				$(elem + ' .slider__img.active')
				.removeClass('active')
				.addClass('prev')

				nextElement
				.addClass('active')
				.removeClass('next');

			}
		});

		$(elem + ' .slider__prev-icon').click(function(e) {
			e.preventDefault();

			let activeElement = $(elem + ' .slider__img.active'),
				prevElement = activeElement.prev(),
				prevElementIndex = prevElement.index();
			
			if(prevElementIndex !== -1){

				activeElement
				.removeClass('active')
				.addClass('next')

				prevElement
				.addClass('active')
				.removeClass('prev');

			}
		});
	
	}
	
	slider('#our-equipment');
	slider('#our-production');
	//slider end


	//img popup start
	$('#sertificate-img').click(function(){
		let img = $(this);
		let src = img.attr('src');
		$('body').append('<div class="popup">' +
							'<div class="popup_background">' +
								'<img src=' + src + ' />' +
							'</div>' +
						 '</div>');
		$('.popup').fadeIn(800);
		$('.popup_background').click(function(){
			$('.popup').fadeOut(800);
			setTimeout(function(){
				$('.popup').remove();
			}, 800);
		})
	});
	//img popup end


}());