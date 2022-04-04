function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    // class Slider{
    //     constructor(arrowLeft, arrowRight, slidesCounter, countOfSlides, offerSlide) {
    //         this.arrowLeft = arrowLeft;
    //         this.arrowRight = arrowRight;
    //         this.slidesCounter = slidesCounter;
    //         this.countOfSlides = countOfSlides;
    //         this.offersSlider = offerSlide;
    //         this.count = 0;

    //     }

    //     hideAllElements(){
    //         this.offersSlider.forEach(element =>{
    //             element.hidden = true;
    //         });
    //     }

    //     showElement(index){

    //         this.offersSlider[index].hidden = false;
    //     }

    //     hideElement(index){
    //         this.offersSlider[index].hidden = true;
    //     }

    //     setTheValueOfTheCountOfSlides(){
    //         const len = this.offersSlider.length;
    //         if(len < 10){
    //             return "0" + len;
    //         }else{
    //             return len;
    //         }
    //     }

    //     setTheCountOfSlides(){
    //         this.countOfSlides.innerHTML = this.setTheValueOfTheCountOfSlides();
    //     }

    //     setSlidesCounter(){

    //         const value = this.count + 1;

    //         if(value < 10){
    //             this.slidesCounter.innerHTML =  "0" + value;
    //         }else{
    //             this.slidesCounter.innerHTML = value;
    //         }    
    //     }

    //     toggleLeft(){
    //         this.arrowLeft.addEventListener('click', () =>{
    //             this.hideElement(this.count);

    //             if (this.count <= 0){
    //                 this.count = this.offersSlider.length;
    //             }

    //             this.showElement(--this.count);
    //             this.setSlidesCounter();
    //         });

    //     }

    //     toggleRight(){
    //         this.arrowRight.addEventListener('click', () =>{
    //             this.hideElement(this.count);

    //             if (this.count >= this.offersSlider.length - 1){
    //                 this.count = -1;
    //             }

    //             this.showElement(++this.count);
    //             this.setSlidesCounter(); 
    //         });
    //     }

    //     createSlider(){
    //         this.hideAllElements();

    //         this.showElement(0);

    //         this.setTheCountOfSlides();
    //         this.setSlidesCounter();
    //         this.countControl();
    //         this.toggleLeft();
    //         this.toggleRight();
    //     } 
    // }

    const arrowLeft = document.querySelector(prevArrow),
        arrowRight = document.querySelector(nextArrow);

    const current = document.getElementById(currentCounter),
        total = document.getElementById(totalCounter);

    const slides = document.querySelectorAll(slide);

    const slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    const Slider = document.querySelector(container);


    let offset = 0,
        slideIndex = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // new Slider(arrowLeft, arrowRight, slidesCounter, countOfSlides, offerSlider).createSlider();
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    Slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    Slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function offsetCheck() {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }


    }

    function slidestranslateX(offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function countControl() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotsFilling() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    arrowRight.addEventListener('click', () => {
        offsetCheck();
        slidestranslateX(offset);

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        countControl();

        dotsFilling();

    });

    arrowLeft.addEventListener('click', () => {
        offsetCheck();
        slidestranslateX(offset);

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        countControl();

        dotsFilling();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidestranslateX(offset);

            countControl();

            dotsFilling();
        });
    });
}

export default slider;