let main = (function () {
    let handleMenuResponsive = function () {
        function close_menu() {
            $(".main-menu,.overlay-menu").removeClass("active");
            $(".hamburger").removeClass("is-active").addClass("unactive");
            // $("body").removeClass("overflow-hidden");
        }

        $(document).on("click", ".hamburger.unactive", function () {
            $(".main-menu,.overlay-menu").addClass("active");
            $(".hamburger").removeClass("unactive").addClass("is-active");
            // $("body").addClass("overflow-hidden");
            return false;
        });
        $(document).on(
            "click",
            ".hamburger.is-active,.bg-layer,.overlay-menu",
            function () {
                close_menu();
                return false;
            }
        );
        // document.getElementsByClassName('bg-layer')[0].addEventListener('click', () => {
        //     close_menu();
        // });
        // document.getElementsByClassName('overlay-menu')[0].addEventListener('click', () => {
        //     close_menu();
        // });
    };

    let handleDropDown = function () {
        $(".custom-dropdown > a").on("click", function (e) {
            e.preventDefault();
            $(this).parent().find("ul").first().slideToggle();
            $(this).parent().siblings().find("ul").hide(200);
        });
        $(document).on("click", function (event) {
            let $trigger = $(".custom-dropdown");
            if ($trigger !== event.target && !$trigger.has(event.target).length) {
                $(".custom-dropdown-menu").slideUp();
            }
        });
    };



    let showHideSearchBar = function () {
        $(".show-search-btn").on("click", function () {
            $(this).closest('.search-toggle').addClass("search-is-active");
        });
        let $trigger = $(".search-toggle");
        let $trigger2 = $(".search-input");

        $(document).on("click", function (event) {
            // console.log(event.target);
            if ($trigger !== event.target && $trigger2 !== event.target && !$trigger.has(event.target).length) {
                $trigger.removeClass("search-is-active");
            }
            if ($(window).width() < 1200 && event.target === $('#header')) {
                $trigger.removeClass("search-is-active");
            }
        });

        if ($(window).width() < 1200) {
            $('.hamburger , #header div').on("click", function () {
                $trigger.removeClass("search-is-active");
            })
        }

        $(".close-search-btn").on('click', function () {
            $(this).closest(".search-toggle").removeClass("search-is-active");
        });
        $(window).on('resize', function () {
            var win = $(this); //this = window
            if (win.width() < 1200) {
                $('#header.search-toggle').removeClass("search-is-active");
            }
        });
    };

    let swiperMainSlider = function () {
        let swiperAnimation = new SwiperAnimation();
        new Swiper("#main-slider", {
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            spaceBetween: 30,
            effect: "fade",
            speed: 500,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                // type: "fraction",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                init: function () {
                    swiperAnimation.init(this).animate();
                },
                slideChange: function () {
                    swiperAnimation.init(this).animate();
                },
            },
        });
    };

    let testimonialSlider = function () {
        var testimonialSlider = new Swiper("#testimonial-slider", {
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            speed: 500,
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 14,
            pagination: {
                el: ".testimonial-slider-pagination",
                clickable: true,
            },
        });
        $("#testimonial-slider").on("mouseenter", function () {
            testimonialSlider.autoplay.stop()
        });
        $("#testimonial-slider").on("mouseleave", function () {
            testimonialSlider.autoplay.start()
        });
    };

    let fixedHeaderOnScroll = function () {
        $(window).scroll(function () {
            let sticky = $("#header"),
                scroll = $(window).scrollTop(),
                body = $("body");

            if (scroll >= 300) {
                sticky.addClass("fixed");
                body.addClass("header-is-fixed");
                if ($('.pages-header').length) {
                    body.addClass("pages-header-fixed");
                }
            } else {
                sticky.removeClass("fixed");
                body.removeClass("header-is-fixed");
                if ($('.pages-header').length) {
                    body.removeClass("pages-header-fixed");
                }
            }
        });
    };

    //plus-btnValue minus-btnValue
    let increaseDecreaseInput = function () {
        $(document).on('click', '.minus-btn, .plus-btn', function (e) {
            var $this = $(e.target),
                input = $this.parent().parent().find('.number-cunt'),
                v = $this.hasClass('minus-btn') ? input.val() - 1 : input.val() * 1 + 1,
                min = input.attr('data-min') ? input.attr('data-min') : 1,
                max = input.attr('data-max') ? input.attr('data-max') : false;
            if (v >= min) {
                if (!max === false && v > max) {
                    return false
                } else input.val(v);
            }
            e.preventDefault();
        });
        $(document).on('change', '.number-cunt', function (e) {
            var input = $(e.target),
                min = input.attr('data-min') ? input.attr('data-min') : 1,
                max = input.attr('data-max'),
                v = input.val();
            if (v > max) input.val(max);
            else if (v < min) input.val(min);
        });
    }

    let calculateImgHeight = function () {
        let cardItem = $('.item-card');
        let imageHeight = $('.item-card-img-container img').height();
        cardItem.css('margin-top', imageHeight - 140 + 'px')
        $(window).on('resize', function () {
            let imageHeight = $('.item-card-img-container img').height();
            let win = $(this);
            if (win.width() > 767) {
                cardItem.css('margin-top', imageHeight - 140 + 'px');

            }
        });
    }

    let resendCode = function () {
        let timeLeft = 30;
        let elem = $('#resendCode');
        let timerId = setInterval(countdown, 1000);

        function countdown() {
            if (timeLeft === -1) {
                clearTimeout(timerId);
                doSomething();
            } else {
                elem.find('span').html(timeLeft);
                timeLeft--;
            }
        }

        function doSomething() {
            $('.resend-btn').removeAttr('disabled')
        }
    }

    let phoneNumber = function () {
        var input = document.querySelector("#phone");
        $("#phone").on("change focus input", function () {
            $(this).removeAttr('placeholder');
        })
        var iti = window.intlTelInput(input, {
            // separateDialCode:true,
            nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
        });
        iti.setCountry("sa");
        // var error = iti.getValidationError();
        // console.log(error)
        // window.iti = iti;
        let phoneInput = $('.iti--allow-dropdown');
        let phoneNumberDrop = $(".iti__country-list")
        let phoneInputWidth = phoneInput.width();
        phoneNumberDrop.css('width', phoneInputWidth + 'px')
        console.log(phoneInputWidth);
        $(window).on('resize', function () {
            let phoneInputWidth = phoneInput.width();
            phoneNumberDrop.css('width', phoneInputWidth + 'px');
            console.log(phoneInputWidth);

        });
    }

    let toggleDiscount = function () {
        $(".discount-form label").on("click", function () {
            $(".discount-form-container").slideToggle(250);
        })
    }
    let faqsButton = function () {
        $(".acc-icon").on("click", function (e) {
            e.preventDefault();
            // $(this).parent().find(".collapse").collapse('toggle')
        })
    }
    let payForm = function () {
        var payButton = document.getElementById("pay-button");
        var form = document.getElementById("payment-form");
        let font_size = '17px';
        if ($(window).width() < 576) {
            font_size = '15px';
        }
        Frames.init({
            publicKey: "pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb",
            style: {
                base: {
                    fontSize: font_size,
                    fontWeight: '600'
                },
                placeholder: {
                    base: {
                        color: "#8D8D8D",
                        fontWeight: '600'
                    }
                }
            }
        })
        var logos = generateLogos();
        function generateLogos() {
            var logos = {};
            logos["card-number"] = {
                src: "card",
                alt: "card number logo",
            };
            logos["expiry-date"] = {
                src: "exp-date",
                alt: "expiry date logo",
            };
            logos["cvv"] = {
                src: "cvv",
                alt: "cvv logo",
            };
            return logos;
        }

        var errors = {};
        errors["card-number"] = "Please enter a valid card number";
        errors["expiry-date"] = "Please enter a valid expiry date";
        errors["cvv"] = "Please enter a valid cvv code";

        Frames.addEventHandler(
            Frames.Events.FRAME_VALIDATION_CHANGED,
            onValidationChanged
        );
        function onValidationChanged(event) {
            var e = event.element;

            if (event.isValid || event.isEmpty) {
                if (e === "card-number" && !event.isEmpty) {
                    showPaymentMethodIcon();
                }
                setDefaultIcon(e);
                clearErrorIcon(e);
                clearErrorMessage(e);
            } else {
                if (e === "card-number") {
                    clearPaymentMethodIcon();
                }
                setDefaultErrorIcon(e);
                setErrorIcon(e);
                setErrorMessage(e);
            }
        }

        function clearErrorMessage(el) {
            var selector = ".error-message__" + el;
            var message = document.querySelector(selector);
            message.textContent = "";
        }

        function clearErrorIcon(el) {
            var logo = document.getElementById("icon-" + el + "-error");
            logo.style.removeProperty("display");
        }

        function showPaymentMethodIcon(parent, pm) {
            if (parent) parent.classList.add("show");

            var logo = document.getElementById("logo-payment-method");
            if (pm) {
                var name = pm.toLowerCase();
                logo.setAttribute("src", "images/card-icons/" + name + ".svg");
                logo.setAttribute("alt", pm || "payment method");
            }
            logo.style.removeProperty("display");
        }

        function clearPaymentMethodIcon(parent) {
            if (parent) parent.classList.remove("show");

            var logo = document.getElementById("logo-payment-method");
            logo.style.setProperty("display", "none");
        }

        function setErrorMessage(el) {
            var selector = ".error-message__" + el;
            var message = document.querySelector(selector);
            message.textContent = errors[el];
        }

        function setDefaultIcon(el) {
            var selector = "icon-" + el;
            var logo = document.getElementById(selector);
            logo.setAttribute("src", "images/card-icons/" + logos[el].src + ".svg");
            logo.setAttribute("alt", logos[el].alt);
        }

        function setDefaultErrorIcon(el) {
            var selector = "icon-" + el;
            var logo = document.getElementById(selector);
            logo.setAttribute("src", "images/card-icons/" + logos[el].src + "-error.svg");
            logo.setAttribute("alt", logos[el].alt);
        }

        function setErrorIcon(el) {
            var logo = document.getElementById("icon-" + el + "-error");
            logo.style.setProperty("display", "block");
        }

        Frames.addEventHandler(
            Frames.Events.CARD_VALIDATION_CHANGED,
            cardValidationChanged
        );
        function cardValidationChanged() {
            payButton.disabled = !Frames.isCardValid();
        }

        Frames.addEventHandler(
            Frames.Events.CARD_TOKENIZATION_FAILED,
            onCardTokenizationFailed
        );
        function onCardTokenizationFailed(error) {
            console.log("CARD_TOKENIZATION_FAILED: %o", error);
            Frames.enableSubmitForm();
        }

        Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, onCardTokenized);
        function onCardTokenized(event) {
            var el = document.querySelector(".success-payment-message");
            el.innerHTML =
                "Card tokenization completed<br>" +
                'Your card token is: <span class="token">' +
                event.token +
                "</span>";
        }

        Frames.addEventHandler(
            Frames.Events.PAYMENT_METHOD_CHANGED,
            paymentMethodChanged
        );
        function paymentMethodChanged(event) {
            var pm = event.paymentMethod;
            let container = document.querySelector(".icon-container.payment-method");

            if (!pm) {
                clearPaymentMethodIcon(container);
            } else {
                clearErrorIcon("card-number");
                showPaymentMethodIcon(container, pm);
            }
        }

        form.addEventListener("submit", onSubmit);
        function onSubmit(event) {
            event.preventDefault();
            Frames.submitCard();
        }

    }

    return {
        init: function () {
            handleMenuResponsive();
            fixedHeaderOnScroll();
            handleDropDown();
            showHideSearchBar();
            if ($("#main-slider").length) {
                swiperMainSlider();
            }
            if ($("#testimonial-slider").length) {
                testimonialSlider();
            }
            if ($('.number-cunt').length) {
                increaseDecreaseInput()
            }
            if ($('.item-card').length) {
                calculateImgHeight()
            }
            if ($('#resendCode').length) {
                resendCode()
            }
            if ($('#phone').length) {
                phoneNumber()
            }
            if ($(".discount-form").length) {
                toggleDiscount()
            }
            if ($(".acc-icon").length) {
                faqsButton()
            }
            if ($("#payment-form").length){
                payForm()
            }
        },
    };
})();

$(document).ready(function () {
    main.init();

    // $('.faqs-accordion').on('hide.bs.collapse', function () {
    //     console.log("close")
    // });
    // $('.faqs-accordion').on('shown.bs.collapse', function () {
    //     console.log(this)
    // })

    $("#show_all").on("click", function () {
        $(this).addClass("active");
        $(this).parent("li").siblings().find("a").removeClass("active");
        $(".tab-pane").removeClass("fade").addClass("active").addClass("show");
    });
    $(".nav-link").not("#show_all").on("click", function () {
        $(".tab-pane").not(this.hash).removeClass("active").removeClass("show");
    });
});
