document.addEventListener('DOMContentLoaded', function(){

	const stepsCard = document.querySelectorAll('.steps__card');
	function handleScroll() {
		window.requestAnimationFrame(function() {
			var scroll = document.documentElement.scrollTop;
			var header = document.querySelector('.header');
			if(scroll > 10){
				header.classList.add('show');
			}
			else{
				header.classList.remove('show');
			}
			scrollPos = scroll;

			stepsCard.forEach((step) => {
				if(step.getBoundingClientRect().top < window.innerHeight/ 1.5){
					step.classList.add('active');
				}else{
					step.classList.remove('active');
				}
			});
		});
		

	}
	handleScroll();
	window.addEventListener('scroll', handleScroll);

	let headerBurger = document.querySelector('.header__burger');
	let menu = document.querySelector('.menu');
	let body = document.body;
	let location = document.querySelectorAll('.location');
	let locBtn = document.querySelectorAll('.header__location, .menu__location');
	let locClose = document.querySelector('.header__close');
	let headerRight = document.querySelector('.header__right');
	let locs = document.querySelector('.locs');
	let locationBtns = document.querySelectorAll('.location > button');
	let headerSearch = document.querySelector('.header__search');
	let search = document.querySelector('.search');
	if(headerBurger){
		headerBurger.addEventListener("click", function () {
			if(document.querySelector('.header__top > .location').classList.contains('open')){
				headerBurger.classList.toggle('active');
			}else{
				headerBurger.classList.toggle('active');
				menu.classList.remove('hide');
				menu.classList.toggle('open');
				body.classList.toggle('lock');
			}
		});		
	}

	if(locBtn) {
		locBtn.forEach((locBtn) => {
			locBtn.addEventListener("click", function () {
				location.forEach((location) => {
					location.classList.add('open');
				});
				menu.classList.toggle('hide');
				headerRight.classList.toggle('hide');
				locs.classList.toggle('active');
				locClose.classList.toggle('show');
				menu.classList.remove('open');
				body.classList.remove('lock');
			});
		});
	}

	if(locationBtns){
		locationBtns.forEach((locationBtn) => {
			locationBtn.addEventListener("click", function (e) {
				e.preventDefault();
				location.forEach((location) => {
					location.classList.remove('open');
				});
				menu.classList.remove('hide');
				headerRight.classList.remove('hide');
				locClose.classList.remove('show');
				locs.classList.remove('active');
			});
		});
	}

	if(headerSearch) {
		headerSearch.addEventListener("click", function () {
			headerSearch.classList.toggle('active');
			search.classList.toggle('open');
		});
	}

	document.addEventListener("click", function (e) {
		if (!document.querySelector('.header__actions .location').contains(e.target) && !document.querySelector('.header__top > .location').contains(e.target) && !document.querySelector('.header__location').contains(e.target) && !document.querySelector('.menu__location').contains(e.target) && !document.querySelector('.locs').contains(e.target)) {
			location.forEach((location) => {
				location.classList.remove('open');
			});
			if(headerRight.classList.contains('hide')){
				headerBurger.classList.remove('active');
			}
			menu.classList.remove('hide');
			headerRight.classList.remove('hide');
			locClose.classList.remove('show');
			locs.classList.remove('active');
		}
		if(!search.contains(e.target) && !headerSearch.contains(e.target)){
			headerSearch.classList.remove('active');
			search.classList.remove('open');
		}
	});

	let locsAddr = document.querySelectorAll('.locs__addr a');
	let locsInput = document.querySelectorAll('.location > input');
	let headerLocsInput = document.querySelector('.header__top .location > input');
	let locsWrapper = document.querySelectorAll('.locs__wrapper li');
	let locsHolder = document.querySelector('.menu__location p');
	let locationWrapper = document.querySelectorAll('.location__wrapper p');

	if(locsAddr){
		locsAddr.forEach((addr) => {
			addr.addEventListener("click", function (e) {
				e.preventDefault();
				locsHolder.textContent = addr.textContent.replace(',', '').replace(' ', '');
				locsInput.forEach((locsInput) => {
					locsInput.value = addr.textContent.replace(',', '').replace(' ', '');
				})
				filterCities(headerLocsInput.value);
				locsAddr.forEach((locsAddr) => {
					if(locsAddr.textContent.replace(',', '').replace(' ', '') === headerLocsInput.value){
						locsAddr.classList.add('active');
					}else{
						locsAddr.classList.remove('active');
					}
				});
				location.forEach((location) => {
					location.classList.remove('open');
				});
				menu.classList.remove('hide');
				headerRight.classList.remove('hide');
				locClose.classList.remove('show');
				locs.classList.remove('active');
			});
		});
	}
	if(locsWrapper) {
		locsWrapper.forEach((wrapper) => {
			wrapper.addEventListener("click", function (e) {
				e.preventDefault();
				locsHolder.textContent = locsInput.value = wrapper.textContent;
				locsInput.forEach((locsInput) => {
					locsInput.value = wrapper.textContent;
				})
				filterCities(headerLocsInput.value);
				locsAddr.forEach((locsAddr) => {
					if(locsAddr.textContent.replace(',', '').replace(' ', '') === headerLocsInput.value){
						locsAddr.classList.add('active');
					}else{
						locsAddr.classList.remove('active');
					}
				});
				locsWrapper.forEach((locsWrapper) => {
					if(locsWrapper.textContent === headerLocsInput.value){
						locsWrapper.classList.add('active');
					}else{
						locsWrapper.classList.remove('active');
					}
				});

				location.forEach((location) => {
					location.classList.remove('open');
				});
				menu.classList.remove('hide');
				headerRight.classList.remove('hide');
				locClose.classList.remove('show');
				locs.classList.remove('active');
			});
		});
	}
	if(locsInput) {
		locsInput.forEach((locsInput) => {
			locsInput.addEventListener("input", function () {
				filterCities(locsInput.value);
				locsHolder.textContent = locsInput.value.length ? locsInput.value : 'Москва';
				locsAddr.forEach((locsAddr) => {
					if(locsAddr.textContent.replace(',', '').replace(' ', '').toLowerCase() === locsInput.value.toLowerCase()){
						locsAddr.classList.add('active');
					}else{
						locsAddr.classList.remove('active');
					}
				});
				locsWrapper.forEach((locsWrapper) => {
					if(locsWrapper.textContent.toLowerCase() === locsInput.value.toLowerCase()){
						locsWrapper.classList.add('active');
					}else{
						locsWrapper.classList.remove('active');
					}
				});
			});
		});
	}

	if(locationWrapper) {
		locationWrapper.forEach((wrapper) => {
			wrapper.addEventListener("click", function (e) {
				e.preventDefault();
				locsHolder.textContent = wrapper.textContent;
				locsInput.forEach((locsInput) => {
					locsInput.value = wrapper.textContent;
				})
				filterCities(headerLocsInput.value);
				location.forEach((location) => {
					location.classList.remove('open');
				});
				menu.classList.remove('hide');
				headerRight.classList.remove('hide');
				headerBurger.classList.remove('active');
				locClose.classList.remove('show');
				locs.classList.remove('active');
				locsAddr.forEach((locsAddr) => {
					if(locsAddr.textContent.replace(',', '').replace(' ', '').toLowerCase() === headerLocsInput.value.toLowerCase()){
						locsAddr.classList.add('active');
					}else{
						locsAddr.classList.remove('active');
					}
				});
				locsWrapper.forEach((locsWrapper) => {
					if(locsWrapper.textContent.toLowerCase() === headerLocsInput.value.toLowerCase()){
						locsWrapper.classList.add('active');
					}else{
						locsWrapper.classList.remove('active');
					}
				});
			});
		});
	}

	function filterCities(value) {
		const keyword = value.toLowerCase();
		locationWrapper.forEach(city => {
			const name = city.dataset.original || city.textContent;
			const lowerName = name.toLowerCase();
			const index = lowerName.indexOf(keyword);
			if (index === -1) {
				city.classList.add('hide');
			} else {
				const start = name.slice(0, index);
				const match = name.slice(index, index + keyword.length);
				const end = name.slice(index + keyword.length);
				if (!city.dataset.original) {
					city.dataset.original = name;
				}
				city.innerHTML = `${start}<b>${match}</b>${end}`;
				city.classList.remove('hide');
			}
		});
	}

	let menuItemLink = document.querySelectorAll('.menu__item a');
	if(menuItemLink){
		menuItemLink.forEach((menuItemLink) => {
			menuItemLink.addEventListener("click", function () {
				let activeLink = document.querySelector('.menu__item.active');
				if(activeLink && activeLink !== menuItemLink.parentNode){
					activeLink.classList.remove('active');
					if(activeLink.querySelector('.menu__sublist')){
						slideToggle(activeLink.querySelector('.menu__sublist'));
					}
				}
				menuItemLink.parentNode.classList.toggle('active');
				slideToggle(menuItemLink.nextElementSibling);
			});
		});
	}

	const submitForms = document.querySelectorAll('[data-submit]');
	if(submitForms) {
		submitForms.forEach((form) => {
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				const activePopup = document.querySelector('.popup.open');
				if(activePopup) {
					activePopup.classList.remove('open');
					body.classList.remove('popuplock');
				}
				const dataSubmit = this.getAttribute('data-submit');
				const dataClassPopup = document.querySelector(`${dataSubmit}`);
				if (dataClassPopup !== null) {
					dataClassPopup.classList.add('open');
					body.classList.add('popuplock');
				}
			});
		});
	}
	const popupButton = document.querySelectorAll("[data-popup]");
	if(popupButton){
		popupButton.forEach(function (popupButton) {
			popupButton.addEventListener("click", function (event) {
				event.preventDefault();
				const dataPopup = this.getAttribute("data-popup");
				const dataClassPopup = document.querySelector(`${dataPopup}`);
				if (dataClassPopup !== null) {
					dataClassPopup.classList.add("open");
					body.classList.add('popuplock');
				}

			});
		});
	}
	var popupClose = document.querySelectorAll('.popup__close, .popup__bg');
	if(popupClose){
		popupClose.forEach(function(popupClose) {
			popupClose.addEventListener('click', function(event) {
				event.preventDefault();
				body.classList.remove('popuplock');
				popupClose.closest('.popup').classList.remove('open');
			});
		});
	}

	const mainIcon = document.querySelector('.main__icon img');
	const mainOvertitle = document.querySelector('.main__texts small');
	const mainTitle = document.querySelector('.main__texts p');

	if(document.querySelector('.main__slider')){
		new Swiper('.main__slider', {
			slidesPerView: 1,
			spaceBetween: 10,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.main__next',
				prevEl: '.main__prev',
			},
			on: {
				slideChange: function () {
					const activeSlide = this.slides[this.activeIndex];
					const icon = activeSlide.dataset.icon;
					const overtitle = activeSlide.dataset.overtitle;
					const title = activeSlide.dataset.title;
					mainIcon.src = icon;
					mainOvertitle.textContent = overtitle;
					mainTitle.textContent = title;
				}
			}
		});
	}

	const banksSearch = document.querySelector('.bank__search input');
	let swiperInstance = null;
	
	function initSwiper() {

		if (swiperInstance) swiperInstance.destroy(true, true);
	
		swiperInstance = new Swiper('.bank__slider', {
			slidesPerView: "auto",
			spaceBetween: 95,
			loop: false,
			speed: 600,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
				},
				1024: {
					spaceBetween: 45,
				},
				1201: {
					spaceBetween: 95,
				},
			},
		});
	}
	
	function filterBanks(query) {
		const slides = document.querySelectorAll('.bank__slider .swiper-slide');
		const lowerQuery = query.toLowerCase();
		slides.forEach(slide => {
			const title = slide.getAttribute('title')?.toLowerCase() || '';
			if (title.includes(lowerQuery)) {
				slide.classList.remove('hide');
			} else {
				slide.classList.add('hide');
			}
		});
		initSwiper();
	}
	
	if (banksSearch) {
		banksSearch.addEventListener('input', function () {
			filterBanks(this.value);
		});
	}
	
	if (document.querySelector('.bank__slider')) {
		initSwiper();
	}
	
	if(document.querySelector('.steps__slider')){
		new Swiper('.steps__slider', {
			slidesPerView: 1,
			spaceBetween: 15,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.steps__next',
				prevEl: '.steps__prev',
			}
		});
	}

	if(document.querySelector('.reviews__slider')){
		new Swiper('.reviews__slider', {
			slidesPerView: "auto",
			spaceBetween: 24,
			initialSlide: 2,
			loop: false,
			speed: 600,
			centeredSlides: true,
			slideToClickedSlide: true,
			navigation: {
				nextEl: '.reviews__next',
				prevEl: '.reviews__prev',
			},
			on: {
				slideChangeTransitionStart: function () {
					const slides = this.slides;
					const activeSlide = slides[this.activeIndex];
					activeSlide.classList.add('effect');
					this.update();
					setTimeout(() => {
						activeSlide.classList.remove('effect');
					}, 250);
				}
			},
			breakpoints: {
				0: {
					slidesPerView: 1.1,
					spaceBetween: 17,
					allowTouchMove: true,
				},
				768: {
					slidesPerView: 1.5,
					spaceBetween: 24,
					allowTouchMove: true,
				},
				1161:{
					slidesPerView: "auto",
					spaceBetween: 24,
					allowTouchMove: false,
				}
			},
		});
	}

	if(document.querySelector('.suggest__slider')){
		new Swiper('.suggest__slider', {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: false,
			speed: 600,
			breakpoints: {
				0: {
					spaceBetween: 8,
					slidesPerView: 1,
				},
				768: {
					spaceBetween: 16,
					slidesPerView: 2,
				},
				1111: {
					spaceBetween: 24,
					slidesPerView: 3,
				},
			},
			navigation: {
				nextEl: '.suggest__next',
				prevEl: '.suggest__prev',
			}
		});
	}

	let faqTop = document.querySelectorAll('.faq__top');
	if(faqTop){
		faqTop.forEach((faqTop) => {
			faqTop.addEventListener("click", function () {
				faqTop.parentNode.classList.toggle('active');
				slideToggle(faqTop.nextElementSibling);
			});
		});
	}

	let servicesName = document.querySelectorAll('.services__name');
	if(servicesName){
		servicesName.forEach((servicesName) => {
			servicesName.addEventListener("click", function () {
				servicesName.parentNode.classList.toggle('active');
				slideToggle(servicesName.nextElementSibling);
			});
		});
	}

	let filters = document.querySelectorAll('[data-filter]');
	let journalSwiper = null;

	function initJournalSwiper() {
		document.querySelector('.journal__slider').classList.add('notReady');
		if (journalSwiper) journalSwiper.destroy(true, true);

		journalSwiper = new Swiper('.journal__slider', {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.journal__next',
				prevEl: '.journal__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1.3,
				},
				611: {
					slidesPerView: 2,
				},
				876: {
					slidesPerView: 3,
				},
				1116: {
					slidesPerView: 4,
				},
			},
		});
		setTimeout(() => {
			document.querySelector('.journal__slider').classList.remove('notReady');
		}, 100);
	}

	function filterJournalSlides(category) {
		const slides = document.querySelectorAll('.journal__slider .swiper-slide');
		slides.forEach(slide => {
			const slideCategory = slide.dataset.fitem;
			if (category === 'все' || category === slideCategory) {
				slide.classList.remove('hide');
			} else {
				slide.classList.add('hide');
			}
		});
		initJournalSwiper();
	}

	if (filters.length) {
		filters.forEach((filter) => {
			filter.addEventListener("click", function (e) {
				e.preventDefault();
				filters.forEach(f => f.classList.remove('active'));
				this.classList.add('active');

				const activeCategory = this.dataset.filter || this.textContent.toLowerCase();
				filterJournalSlides(activeCategory);
			});
		});
	}

	if (document.querySelector('.journal__slider')) {
		initJournalSwiper();
	}

	function slideToggle(element) {
		var target = element.style;
		if (target.maxHeight) {
			target.maxHeight = null;
		} else {
			target.maxHeight = element.scrollHeight + 'px';
		}
	}	

	const telmask = document.querySelectorAll("input[type='tel']");
	if(telmask){
		telmask.forEach(function(input) {
			let maskOptions = {
				mask: '+{7} (000) 000-00-00',
				lazy: true,
			};
			IMask(input, maskOptions);
			let maskPlaceholder = input.getAttribute('placeholder');
			input.addEventListener('focus', function() {
				input.setAttribute('placeholder', '+7 (___) ___-__-__');
			});
			input.addEventListener('blur', function() {
				input.setAttribute('placeholder', maskPlaceholder);
			});
		});
	}
	var selects = document.querySelectorAll('select');
	if(selects){
		selects.forEach((select) => {
			var searchable = select.hasAttribute('searchable');
			var options = {searchable: searchable, placeholder: select.getAttribute('data-placeholder'), selectedtext: select.getAttribute('data-selectedtext')};
			NiceSelect.bind(select,  options);
		})
	}

	var calcVal = document.querySelectorAll('.calc__val button');
	if(calcVal){
		calcVal.forEach((calcVal) => {
			calcVal.addEventListener('click', function() {
				calcVal.previousElementSibling.focus();
			});
		})
	}

	const countrySearch = document.querySelector('.bank__country-search input');
	let swiperCountries = null;
	
	function initSwiperCountries() {

		if (swiperCountries) swiperCountries.destroy(true, true);
	
		swiperCountries = new Swiper('.bank__countries', {
			slidesPerView: "auto",
			spaceBetween: 30,
			loop: false,
			speed: 600,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
				},
				768: {
					spaceBetween: 30,
				},
			},
		});
	}
	
	function filterCountries(query) {
		const slides = document.querySelectorAll('.bank__countries .swiper-slide');
		const lowerQuery = query.toLowerCase();
		slides.forEach(slide => {
			const title = slide.textContent?.toLowerCase() || '';
			if (title.includes(lowerQuery)) {
				slide.classList.remove('hide');
			} else {
				slide.classList.add('hide');
			}
		});
		initSwiperCountries();
	}
	
	if (countrySearch) {
		countrySearch.addEventListener('input', function () {
			filterCountries(this.value);
		});
	}
	
	if (document.querySelector('.bank__countries')) {
		initSwiperCountries();
	}
});