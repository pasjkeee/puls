const catalogItem = document.querySelectorAll('.catalog__item');
catalogItem.forEach(item => {
    const more = item.querySelector('.catalog__item-more');
    const back = item.querySelector('.catalog__item-back');
    const descriptionList = item.querySelector('.catalog__item-description');
    more.addEventListener('click', e => {
        e.preventDefault();
        descriptionList.style.transform = "translateX(0%)";
    })

    back.addEventListener('click', e => {
        e.preventDefault();
        descriptionList.style.transform = "translateX(120%)";
    })
});

const slider = document.querySelector('.slider__content');
const slides = slider.querySelectorAll('.slider__img');
const sliderContainer = slider.querySelector('.slider__container');
let procent = 0;
slider.querySelector('.slider__arr-right').addEventListener('click', ()=>{
    if(procent < 100 * 2){
        procent+=100;
        let activNum = 0;
        slides.forEach((slide, i) => {
            if(slide.classList.contains('active')){
                activNum = i;
            }
        })
        slides[activNum].classList.remove('active');
        slides[activNum+1].classList.add('active');
        slides.forEach(slide => {
            slide.style.transform = `translateX(${-procent}%)`;
        })
    }
});

slider.querySelector('.slider__arr-left').addEventListener('click', ()=>{
    if(procent > 0){
        procent-=100;
        let activNum = 0;
        slides.forEach((slide, i) => {
            if(slide.classList.contains('active')){
                activNum = i;
            }
        })
        slides[activNum].classList.remove('active');
        slides[activNum-1].classList.add('active');
        slides.forEach(slide => {
            slide.style.transform = `translateX(${-procent}%)`;
        })
    }
});

const catalog = document.querySelector('.catalog');
const tabs = catalog.querySelectorAll('.catalog__tab-item');
const tabsContetnt = catalog.querySelectorAll('.catalog__items');


tabs.forEach((item, i) => {
    item.addEventListener('click', ()=> {
        tabs.forEach(element => {
            element.classList.remove('catalog__tab-item_active');
        });
        item.classList.add('catalog__tab-item_active');

        tabsContetnt.forEach(element => {
            element.classList.remove('catalog__items_active');
        });
        tabsContetnt[i].classList.add('catalog__items_active');
    })
});
const overlay = document.querySelector('.overlay');

overlay.querySelectorAll(".modal__close").forEach(item => {
    item.addEventListener('click', ()=>{
        item.parentElement.style.display = "none";
        overlay.style.display = "none";
    })
});

document.querySelectorAll('[data-modal=consultation]').forEach(item=> {
    item.addEventListener('click', ()=> {
        overlay.querySelector('#thanks').style.display = "none";
        overlay.style.display = "block";
        overlay.querySelector('#consultation').style.display = "block";
    });
})

document.querySelectorAll('.catalog__bat').forEach((item, i) => {
    item.addEventListener('click', ()=> {
        overlay.querySelector('[data-name=pulsometr').textContent = document.querySelectorAll('.catalog__item-title')[i].textContent;
        overlay.querySelector('#thanks').style.display = "none";
        overlay.style.display = "block";
        overlay.querySelector('#order').style.display = "block";
    });
});



    function validateForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phonenumber: "required",
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                    name: "Пожалуйста введите своё имя",
                    phonenumber: "Пожалуйста введите свой телефон",
                    email: {
                        required: "Пожалуйста введите свой e-mail",
                        email: "Введите правильный e-mail"
                    }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#con2');
    validateForms('#con3');
    $(".form-phonenumber").mask("+7 (999) 999-99 99");

    $('form').submit((e)=>{
        e.preventDefault();
        $.ajax({
                type: "POST",
                url: "../dist3/mailer/smart.php",
                data: $(this).serialize()
            }).done( ()=>{
                $(this).find("input").val("");

                overlay.querySelector('#consultation').style.display = "none";
                overlay.querySelector('#order').style.display = "none";
                overlay.querySelector('#thanks').style.display = "block";


                $('form').trigger('reset');
            });

            return false;
    });

    //pageup

    $(window).scroll(()=>{
        if($(this).scrollTop() > 1600){
            $('.arrow-up').fadeIn();
        } else {
            $('.arrow-up').fadeOut();
        }
    });

    $("a[href^='#up']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
