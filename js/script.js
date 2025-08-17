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
					activeSlide?.classList.add('effect');
					this.update();
					setTimeout(() => {
						activeSlide?.classList.remove('effect');
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
	if(document.querySelector('.reviews__letters')){
		new Swiper('.reviews__letters', {
			slidesPerView: 4,
			spaceBetween: 24,
			speed: 600,
			autoHeight: true,
			navigation: {
				nextEl: '.reviews-letters__next',
				prevEl: '.reviews-letters__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 18,
				},
				900:{
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1161:{
					slidesPerView: 4,
					spaceBetween: 24,
				},
			},
		});
	}
	if(document.querySelector('.reviews__socials')){
		new Swiper('.reviews__socials', {
			slidesPerView: 4,
			spaceBetween: 24,
			speed: 600,
			navigation: {
				nextEl: '.reviews-socials__next',
				prevEl: '.reviews-socials__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 18,
				},
				900:{
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1161:{
					slidesPerView: 4,
					spaceBetween: 24,
				},
			},
		});
	}
	if(document.querySelector('.reviews__audios')){
		new Swiper('.reviews__audios', {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: false,
			speed: 600,
			breakpoints: {
				0: {
					spaceBetween: 15,
					slidesPerView: 1,
				},
				768: {
					spaceBetween: 15,
					slidesPerView: 2,
				},
				1111: {
					spaceBetween: 24,
					slidesPerView: 3,
				},
			},
			navigation: {
				nextEl: '.reviews-audios__next',
				prevEl: '.reviews-audios__prev',
			}
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

	var tabsItems = document.querySelectorAll('[data-tab]');
	if(tabsItems){
		tabsItems.forEach(function(tabsItem) {
			tabsItem.addEventListener('click', function(event) {
				event.preventDefault();
				var tabParent = this.closest('.tabs');
				var tabActive = tabParent.querySelector('[data-tab].active');
				var contentActive = tabParent.querySelectorAll('[data-content].target');
				if (tabActive) {
					tabActive.classList.remove('active');
				}
				contentActive.forEach(function(contentActive){
					if (contentActive) {
						contentActive.classList.remove('target');
						
						const activeAudios = contentActive.querySelectorAll('.reviews__audio.playing');
						activeAudios?.forEach((activeAudio) => {
							const audioTag = activeAudio.querySelector('audio');
							audioTag?.pause();
							audioTag.currentTime = 0;
							activeAudio.classList.remove('playing');
						});

					}	  
				});
				this.classList.add('active');
				const tabContent = this.getAttribute("data-tab");
				const tabId = tabParent.querySelectorAll(`[data-content="${tabContent}"]`);
				tabId.forEach(function(tabId){
					if (tabId) {
						tabId.classList.add('target');
					}	  
				});
			});
		});
	}
	let revAudio = document.querySelectorAll('.reviews__audio');
	if(revAudio){
		revAudio.forEach((revAudio) => {
			revAudio.addEventListener('click', function() {
				const audioTag = revAudio.querySelector('audio');
				if(audioTag){
					if(audioTag.paused){
						const activeAudios = document.querySelectorAll('.reviews__audio.playing');
						activeAudios?.forEach((activeAudio) => {
							const audioTag = activeAudio.querySelector('audio');
							audioTag?.pause();
							audioTag.currentTime = 0;
							activeAudio.classList.remove('playing');
						});
						audioTag.play();
						revAudio.classList.add('playing');
					}
					else{
						audioTag.pause();
						revAudio.classList.remove('playing');
					}
				}
			});
		})
	}

	const companySearch = document.querySelector('.bank__companies-search input');
	let swiperCompanies = null;
	
	function initSwiperCompanies() {

		if (swiperCompanies) swiperCompanies.destroy(true, true);
	
		swiperCompanies = new Swiper('.bank__companies', {
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
	
	function filterCompanies(query) {
		const slides = document.querySelectorAll('.bank__companies .swiper-slide');
		const lowerQuery = query.toLowerCase();
		slides.forEach(slide => {
			const title = slide.getAttribute('title')?.toLowerCase() || '';
			if (title.includes(lowerQuery)) {
				slide.classList.remove('hide');
			} else {
				slide.classList.add('hide');
			}
		});
		initSwiperCompanies();
	}
	
	if (companySearch) {
		companySearch.addEventListener('input', function () {
			filterCompanies(this.value);
		});
	}
	
	if (document.querySelector('.bank__companies')) {
		initSwiperCompanies();
	}

	const bargainMore = document.querySelectorAll('.bargain__more');
	if(bargainMore) {
		bargainMore.forEach((bargainMore) => {
			bargainMore.addEventListener('click', function(e) {
				e.preventDefault();
				this.closest('.bargain__text').classList.add('open');
			});
		})
	}

	let banksTop = document.querySelectorAll('.banks__item-top');
	if(banksTop){
		banksTop.forEach((banksTop) => {
			banksTop.addEventListener("click", function (e) {
				if(e.target.closest('.no-toggle')) return;
				banksTop.parentNode.classList.toggle('active');
				slideToggle(banksTop.nextElementSibling);
			});
		});
	}

	const filterBtn = document.querySelector('.banks__filter-btn');
	const filter = document.querySelector('.filter');
	const filterClose = document.querySelector('.filter__close');
	if(filterBtn && filter){
		filterBtn.addEventListener("click", function (e) {
			e.preventDefault();
			filter.classList.add('open');
			body.classList.add('filterlock');
		});
	}
	if(filterClose && filter){
		filterClose.addEventListener("click", function (e) {
			e.preventDefault();
			filter.classList.remove('open');
			body.classList.remove('filterlock');
		});
	}

	const filterRanges = document.querySelectorAll('.filter__range');
	if(filterRanges.length){
		filterRanges.forEach((filterRange) => {
			let filterRangeInput = filterRange.previousElementSibling;
			let filterMin = +filterRange.dataset.min;
			let filterMax = +filterRange.dataset.max;
			let filterStep = +filterRange.dataset.step;
			let isDays = filterRange.dataset.type === 'days'; 

			noUiSlider.create(filterRange, {
				start: [filterMin],
				connect: [true, false],
				step: filterStep || 1,
				range: {
					min: filterMin,
					max: filterMax
				},
			});

			function formatDays(days) {
				const years = Math.floor(days / 365);
				const rem = days % 365; 
				const months = Math.floor(rem / 30);
				const d = rem % 30;

				let parts = [];
				if (years > 0) parts.push(`${years} ${declOfNum(years, ['год', 'года', 'лет'])}`);
				if (months > 0) parts.push(`${months} мес.`);
				if (d > 0) parts.push(`${d} ${declOfNum(d, ['день', 'дня', 'дней'])}`);
				
				return parts.join(' ');
			}

			function declOfNum(n, titles) {
				return titles[
					n % 10 === 1 && n % 100 !== 11 ? 0 :
					n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
				];
			}


			filterRange.noUiSlider.on('slide', (values) => {
				const value = parseInt(values[0]);
				filterRangeInput.value = isDays
					? formatDays(value)
					: value.toLocaleString('ru-RU');
			});

			filterRangeInput.addEventListener('input', () => {
				filterRangeInput.value = filterRangeInput.value.replace(/[^\d ]+/g, '');
			});

			filterRangeInput.addEventListener('change', handleInput);
			function handleInput() {
				let value = parseInt(filterRangeInput.value.replace(/\D/g, ''), 10) || filterMin;

				value = Math.min(Math.max(value, filterMin), filterMax);

				filterRangeInput.value = isDays
					? formatDays(value)
					: value.toLocaleString('ru-RU');

				filterRange.noUiSlider.set(value);
			}
			filter.addEventListener('reset', () => {
				filterRange.noUiSlider.set([filterMin]);
			});
		});
	}

	if(document.querySelector('.magazine-catalog__slider')){
		new Swiper('.magazine-catalog__slider', {
			slidesPerView: 2,
			spaceBetween: 20,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.magazine-catalog__next',
				prevEl: '.magazine-catalog__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				601: {
					slidesPerView: 2,
				},
				881: {
					slidesPerView: 3,
				},
				1023: {
					slidesPerView: 1,
				},
				1091: {
					slidesPerView: 2,
				},
			}
		});
	}

	let copyBtns = document.querySelectorAll('.approach__mail button');
	if(copyBtns){
		copyBtns.forEach((copyBtn) => {
			copyBtn.addEventListener('click', function () {
				const textToCopy = this.previousElementSibling.textContent.trim();

				navigator.clipboard.writeText(textToCopy).then(() => {
					const notification = copyBtn.querySelector('.copy-notification');
					notification.classList.add('show');
					setTimeout(() => {
						notification.classList.remove('show');
					}, 500);
				});
			});
		});
	}
	if(document.querySelector('.find__slider')){
		new Swiper('.find__slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.find__next',
				prevEl: '.find__prev',
			},
			pagination: {
				el: '.find__pagination',
				clickable: true,
			},
		});
	}
	if(document.querySelector('.gallery__slider')){
		new Swiper('.gallery__slider', {
			slidesPerView: 3,
			spaceBetween: 24,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.gallery__next',
				prevEl: '.gallery__prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1.49,
					spaceBetween: 16,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1024:{
					slidesPerView: 2.5,
					spaceBetween: 24,
				},
				1101:{
					slidesPerView: 3,
					spaceBetween: 24,
				},
			}
		});
	}
	if(document.querySelector('.examples__slider')){
		new Swiper('.examples__slider', {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: false,
			speed: 600,
			navigation: {
				nextEl: '.examples__next',
				prevEl: '.examples__prev',
			},
			pagination: {
				el: '.examples__pagination',
				clickable: true,
			}
		});
	}
	let commentMore = document.querySelectorAll('.comment__more');
	if(commentMore){
		commentMore.forEach((commentMore) => {
			commentMore.addEventListener('click', function () {
				commentMore.parentNode.classList.toggle('active');
			});
		});
	}
});