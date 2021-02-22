$(document).ready(function(){
    var header=$('header');
    var headerHeight=header.outerHeight();
    var subHieght;
    var gnb=header.find(".gnb>li");
    var nav=$('header .gnb');
    var trigger=$('.trigger');
    var Timer;
    //pc일때 풀페이지 구현
    var sections=$('.main');
    var  winWidth;
    var wrap=$('.wrap');
    var section=$('.section');
    var lang=$('.right_menu .lang');
    var fam=$('.right_menu .fam');
    var subMenu=$('header .sub_con');
    function fullpage(){

            if(wrap.hasClass('pc')){
                var currentindex=0;
                var sectionLen=section.length;
        
                function setslide(){
                    var prevHeight=0;
                    var totalHeight=0;
                    var currentHeight=0;
                    var allHeight=0;
                    section.each(function(index){
                        currentHeight=$(this).outerHeight();
                        allHeight +=currentHeight;
                        prevHeight+=currentHeight;
                        totalHeight=currentHeight+prevHeight-currentHeight*2;
                        if(currentHeight != $(window).height()){
                            totalHeight=currentHeight+prevHeight-currentHeight*2-($(window).height()-currentHeight);
                          }
                        //   console.log(currentHeight);
                        $(this).attr('data-index',totalHeight);
                    })
                    sections.css({height:allHeight+'px'});
                 
                }//setslide

                //pc에서 마우스휠 사용할 때 애니메이션
                function pcOffset(){
                    section.each(function(i,v){
                        console.log(currentindex === i)
                        var aniElem= $(this).find(".animate");
                        if(currentindex === i){
                            if(!aniElem.hasClass('motion')){
                                aniElem.addClass("motion")
                            }
                        }
                    })
                }
                function sectionTab(){
                    section.each(function(){
                        $(this).on('focusin',function(){
                            var aniElem= $(this).find(".animate");
                            if(!aniElem.hasClass('motion')){
                                aniElem.addClass("motion")
                            }
                        })
                    })
                }
            
                

                function moveslide(index){
                    console.log('move')
                    if($('body').hasClass('hidden')) return;
                    currentindex=index;
                    if(currentindex <0){
                        currentindex=0;
                        return
                    }
                    if(currentindex >=sectionLen){
                        currentindex=sectionLen-1;
                        return
                    }
                    var sectionTop=section.eq(currentindex).attr('data-index');
                    sections.css(
                        {transform:'translate3d(0,'+(-sectionTop)+'px'+',0)',
                             });

                             $('.navi_btns>li').removeClass('active');
                             $('.navi_btns>li').eq(currentindex).addClass("active");
                    pcOffset();
                    numCount();
                }

        
                $('.navi_btns>li').click(function(){
                    var index=$(this).index();
                    moveslide(index);
                    $('.navi_btns>li').removeClass('active');
                    $(this).addClass("active");
                })
              
        
                var wheellstate=false;
                $('.section').on('mousewheel',function(e){
                    console.log('마우스확인');
                    var delta; 
                    if (e.originalEvent.detail) {
                        delta = e.originalEvent.detail;
                    }
                    else if (e.originalEvent.wheelDelta) {
                        delta = e.originalEvent.wheelDelta;
                    }
                    else {
                        delta = e.originalEvent.deltaY;
                        delta = -delta;
                    }
            
                    if (delta >= 0 && $('.pc').length>0) {
                        if(!wheellstate){
                        // if(currentindex<0) return;
                        moveslide(currentindex-1)
                        }
                        wheellstate=setTimeout(function(){
                            wheellstate=false;
                        },700)
                } else if (delta < 0 && $('.pc').length>0) {
                    if(!wheellstate){
                        // if(currentindex>sectionLen-1) return;
                    moveslide(currentindex+1)
                        }
                        wheellstate=setTimeout(function(){
                            wheellstate=false;
                        },700)           
                }
                })
            setslide();  
            sectionTab();
            // moveslide(currentindex);      

        };
    }

    function init(){
        winWidth=$(window).width();
        if(winWidth<1240){
            console.log('모바일')
            wrap.removeClass('pc');
            sections.removeAttr("style");
            section.removeAttr("data-index");    
            if(winWidth<800){
                section.each(function(){
                    $(this).find(".animate").removeClass('animate');
                })
              }     
        }else{
            console.log('pc');
            wrap.addClass('pc');
            section.removeAttr("style");
            $('.navi_btns>li').eq(0).addClass("active");
                if($('.main_page').length>0){
                    fullpage();
                }
        }

    }
    function activate(Elem){
        gnb.removeClass('active');
        Elem.addClass('active');
    }
    function inactivate(Elem){
        Elem.removeClass('active');
    }
    /* header */
    /* pc 일때 메뉴 */
    nav.on('mouseenter focusin',function(){
        if(winWidth>1221){
        subHieght=$(".gnb .sub_con").outerHeight();
        var total=headerHeight+subHieght;
        header.stop().animate({height:total+'px'},200)
        }
    })
    .on('mouseleave focusout', function(){
        if(winWidth>1221){
            header.stop().animate({height:headerHeight+'px'},200,function(){
                header.removeAttr('style')
            })}
    })
    gnb.on('mouseenter focusin',function(){
        if(winWidth>1221){
            activate($('header'));
            fam.add(lang).addClass('over');
            // subMenu.hide();
            $(this).find(".sub_con").show();
           }

    })
    .on('mouseleave focousout',function(){
        if(winWidth>1221){
            inactivate(header)
            fam.add(lang).removeClass('over');
                subMenu.hide();;
        }
    })
    fam.add(lang).on('focusin',function(){
        inactivate(header)
            fam.add(lang).removeClass('over');
                subMenu.hide();;       
    })


    /* 모바일 버전 메뉴 */
    $('.gnb>li>a').click(function(e){
        if(winWidth<1220){
            e.preventDefault();
                if($(this).hasClass('on')){
                    subMenu.stop().slideUp(function(){
                        $('.gnb>li>a').removeClass('on');
                    });
                }else{
                    $('.gnb>li>a').removeClass('on');
                    $(this).addClass('on');
                    subMenu.stop().slideUp();
                    $(this).parent('li').find('.sub_con').stop().slideDown();
                }
            

        }
        
    })
    $('.right_menu h2').click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().find('.list').stop().slideToggle();
    })
    fam.add(lang).on('mouseleave',function(){
        $(this).removeClass('active');
        $(this).find('.list').stop().slideUp();
    })
    


    trigger.click(function(){
       if(winWidth<=1220){
        $(this).add(nav).add('.right_menu').toggleClass('on');  
        if(!$(this).hasClass('on')){
            subMenu.stop().slideUp(100)
            $('.gnb>li>a').removeClass('on');
            $('body').removeClass("hidden");
        }else{
            $('body').addClass("hidden");
        }
       }else{
           //pc
           $(this).toggleClass('on');  
           if((nav).add('.right_menu').hasClass("on")){
            (nav).add('.right_menu').removeClass("on");
           }
           if(!$(this).hasClass('on')){
            $('body').removeClass("hidden");
           }else{
            $('body').addClass("hidden");
           }
           if(!$('.pc_trigger_menu').hasClass("open")){
            $('.pc_trigger_menu').addClass('open').removeClass('close');
           }else{
            $('.pc_trigger_menu').addClass('close').removeClass('open');
           }
            
       }
    })
    if($('.sub_pg').length>0){
        $('.sub_menu_list h3').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass("over")){
                $(this).removeClass("over").next('ul').stop().slideUp();
            }else{
                $(this).addClass("over").next('ul').stop().slideToggle();
                $(this).parent("div").siblings().find("h3").removeClass("over").next('ul').slideUp();
            }
        })
        $('.wrap').on('click',function(){
            $('.sub_menu_list h3').removeClass("over");
            $('.sub_menu_list h3').next('ul').slideUp(function(){
                excuted=false;
            });
            if(winWidth<1024){
                $(".sub_con_list>h3").removeClass("on").next('ul').hide();
                $(".sub_con_list>h3").next('ul').removeAttr("style")
                 //서브페이지 1024px 이하 company 계열사 메뉴 수정
                $(".company .subsidiary .subsidiary_tabs h2").removeClass("on").next('ul').stop().slideUp();
            }
        })

        //서브페이지 1024px 이하 서브 메뉴 수정
            $(".sub_con_list>h3").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                if($(this).hasClass("on")){
                    $(this).removeClass("on").next("ul").stop().slideUp(function(){
                        $(this).removeAttr('style')
                    });
                }else{
                    $(this).addClass("on").next("ul").stop().slideDown();
                }
            })
        //서브페이지 1024px 이하 company 계열사 메뉴 수정
            $(".company .subsidiary .subsidiary_tabs h2").click(function(e){
                e.preventDefault();
                e.stopPropagation();
               if(winWidth<1024){
                $(this).toggleClass("on").next('ul').stop().slideToggle()
               }
            })
              //서브페이지 1024px 이하 company 계열사 메뉴 수정
              $(".company .subsidiary .subsidiary_tabs ul>li").click(function(){
                var onText=$(this).find('a').text();
                $(".company .subsidiary .subsidiary_tabs h2").text(onText);
                if($(".company .subsidiary .subsidiary_tabs h2").hasClass('on')){
                    $(".company .subsidiary .subsidiary_tabs h2").removeClass('on')
                }
              })
        //서브페이지 셀렉트 메뉴
        $( ".category" ).selectmenu();
        //모바일에서 테이블 클릭시
        $(".content .tb_con .tb_bg").on('touchstart click',function(){
            $(this).fadeOut();
        })

        //서브페이지 IR 재무정보, HR 채용공고,business 영역 공통 탭메뉴
        if( !$('.common_tab>li').eq(0).hasClass('on')){
            $('.common_tab>li').eq(0).addClass("on")
        }
        var tabMenu=$('.content .tabs_menu');
        var commonTab=$('.common_tab>li');
        var subTab=$('.sub_tab_menu .sub_gnb>li');
        commonTab.add(subTab).click(function(e){
            e.preventDefault();
            var index=$(this).index();
            commonTab.add(subTab).removeClass("on");
            commonTab.eq(index).addClass('on');
            subTab.eq(index).addClass('on');
            tabMenu.hide().removeClass('active').eq(index).show().addClass('active');
            if(subTab.length>0){
                var subTxt=subTab.eq(index).text();
                $(".sub_tab_menu h3").find('a').text(subTxt);
                var contentOffset=$('.content').offset().top-headerHeight;
                $('body,html').animate({scrollTop:contentOffset})
            }
            if($('.sublist_tabs').length>0){
                $('.sublist_tab').hide().eq(0).show();
            }
            if($('.bs_tabs.fix_tabs').length>0){
                $('.bs_tabs.fix_tabs').removeClass('fix');
            }

        })
        var scrollState=false;
        $('.fix_tabs li').eq(0).addClass('on')
        $('.fix_tabs li').click(function(e){
            e.preventDefault();
            var idx=$(this).index();
            
            if($('.move_list').length>0){
                // if($('.fix_tabs').hasClass("fix")){
                //     var welOffset=$('.move_list').eq(idx).offset().top-$('.fix_tabs').outerHeight()-$('.sub_menu_list').outerHeight()+1;
                // }else{
                //     console.log("aaa")
                //     var welOffset=$('.move_list').eq(idx).offset().top+$('.sub_menu_list').outerHeight()+$('.fix_tabs').outerHeight();
                // }
                if(!scrollState){
                    var welOffset=$('.move_list').eq(idx).offset().top;-$('.sub_menu_list').outerHeight()+1;
                    scrollState=true;
                }else{
                    var welOffset=$('.move_list').eq(idx).offset().top-$('.fix_tabs').outerHeight()-$('.sub_menu_list').outerHeight()+1;
                }
                var self=$(this);
                $('html,body').stop().animate({scrollTop:welOffset},function(){
                    if(!self.hasClass("on")){
                        $('.fix_tabs li').removeClass("on")
                        self.addClass("on");
                    }
                });
            }else{
                $('.fix_tabs li').removeClass("on");
                $(this).addClass('on');
            }
        })
        // COMPNAY히스토리탭메뉴
        $('.sublist_tabs li').eq(0).addClass("on")
        $('.sublist_tabs li').click(function(e){
            e.preventDefault();
            var index=$(this).index();
            var subTab=$('.sublist_tab');
            // $('.history_list .history_tabs>li').removeClass("on");
            // $(this).addClass("on");
            subTab.hide().eq(index).show();
            if(!$(this).hasClass('on')){
                $('.sublist_tabs li').removeClass("on")
                $(this).addClass("on")
            }
            // var subOffset=$('.content').offset().top;
            // console.log(subOffset)
            // $('body,html').animate({scrollTop:subOffset})
    

        })
        
        //서브페이지 HR 직무소개 아코디언 메뉴
        $('.accodian_tab>h4').click(function(e){
            e.preventDefault();
            if($(this).hasClass("on")){
                $(this).removeClass("on");
            }else{
                $('.accodian_tab>h4').removeClass("on");
                $(this).addClass("on");
            }
            $(this).next('ul').stop().slideToggle().parent().parent().siblings('.accodian').find('ul').slideUp();
        })
        $('.accodian_tab>ul>li').click(function(e){
            e.preventDefault();
            var idx=$(this).index();
            $('.accodian_tab>ul>li').removeClass("on");
            $(this).addClass("on");
            $('.job_con>div').hide()
            $(this).parent().parent().siblings(".job_con").find('.main_con').eq(idx).show();
        })
        $('.accodian_tab>ul>li.on').trigger("click")

        if($('.companys').length>0){
            var swiper = new Swiper('.swiper-container.company_slide', {
                slidesPerView: 4,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                  },
                  breakpoints: {
                    640: {
                        slidesPerView: 4,
                      },
                    800: {
                      slidesPerView: 8,
                    },
                    1220: {
                      slidesPerView: 10,
                    },
                  }
              });
        }

    }//sub
    //서브페이지 스크롤시 헤더 고정
    var reascrll=false;
    function sectionTop(){

                $('.move_list').each(function(i){
                    var rel=winOffset;
   
                    if(! reascrll){
                        var sec=$('.move_list').eq(i).offset().top;
                        reascrll=true;
                    }else{
                        var sec=$('.move_list').eq(i).offset().top-$('.fix_tabs').outerHeight()-$('.sub_menu_list').outerHeight();
                    }
 
                    console.log("섹션의..",sec);
                    console.log("###############3",rel);
                    if(sec<=winOffset){
                        console.log("인덱스",i)
                        $('.fix_tabs li').removeClass("on")
                        $('.fix_tabs li').eq(i).addClass("on");
                    }
                })


    }
   
    function ElemFix(){
        sectionTop();
        if(winOffset > $('.sub_pg .content').offset().top){
            $(".header").addClass("fix");
        }else{
            $(".header").removeClass('fix');
        }

        if(winOffset>0){
            $(".sub_goTopBtn").addClass('fix');
        }else{
            $(".sub_goTopBtn").removeClass('fix');
        }

        if($('.fix_tabs').length>0){
            sectionTop();
            var welOffset= $('.fix_con').offset().top-$('.sub_menu_list').outerHeight();
            var realwinOffset=winOffset+$('.sub_menu_list').outerHeight();
            if( realwinOffset > welOffset){
                if(!$('.fix_tabs').hasClass("fix")){
                    $('.fix_tabs').addClass('fix')
                    console.log("픽스붙임")
                    sectionTop();
                }
            }else{
                if($('.fix_tabs').hasClass("fix")){
                    $('.fix_tabs').removeClass('fix')
             
                }
            }
        }

    }


  

    
    var pageUrl=window.location.href;
    var activeMenu;
    gnb.add($(".sub_gnb>li")).add($(".sub_con_list li")).add(".tabs>li").each(function(){
        var $this=$(this);
        var subUrl= $this.find('a').attr('href');
        var blankLink=pageUrl.indexOf('#'); 
        var activeUrl=pageUrl.indexOf(subUrl);
            if(activeUrl>-1 && blankLink == -1){
                activeMenu=$this;
                activeMenu.addClass('over')
            }  
    })   
    var topUrl=["COMPANY","BUSINESS","IR","PR","HR","MANAGE"];
    var subUrl=["gallery","refer"]
    var menuOver=$(".sub_con_list li");
    var topmenuOver=$(".sub_menu_list>div:nth-of-type(2) .sub_gnb>li");
    function subUrlCk(subUrl,El){
        if(pageUrl.indexOf(subUrl)>-1){
            El.each(function(){
                var url =$(this).find('a').attr('href');
                if(url.includes(subUrl)){
                    if(!$(this).hasClass("over")){
                        $(this).addClass('over');
                    }
                }
            })
        }
    }

    topUrl.forEach(function(v,i){
        if(pageUrl.indexOf(v)>-1){
            var gnbOver=gnb.eq(i);
            var subOver=$(".sub_gnb>li").eq(i);
           if(!gnbOver.hasClass("over")){
               gnbOver.addClass("over");
           }
           if(!subOver.hasClass("over")){
              subOver.addClass("over");
           }
           subUrl.forEach(function(v){
            subUrlCk(v,menuOver);
            subUrlCk(v,topmenuOver);
           })
        }
    
    })




        

    

    if($('.main_page').length>0){
         /*banner 슬라이드 */
    var loading=$('.banner .loading>li');
    var playBtn=$('.banner .play-btn>a');
    var swiper = new Swiper('.banner .swiper-container', {
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
          },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        slidesPerView:'auto',
        loop:true,
        loopedSlides:'4',
        pagination: {
          el: '.pager',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.banner .arrows .next',
          prevEl: '.banner .arrows .prev',
        },
        // breakpoints: {
        //     1240: {
        //       slidesPerView: 1,
        //       fadeEffect: {
        //         crossFade: true
        //       },
        //     },
        // },
        on: {
            init: function () {
                loading.eq(0).addClass('active');
            },
            
        }
      })

      swiper.on('slideChange', function() {
          var index=swiper.realIndex;
          loading.removeClass('active');
          loading.eq(index).addClass('active');
      });


      
      

      loading.on('click focus',function(){
          var index=$(this).index();
          swiper.slideTo(index+1);
          console.log(swiper.realIndex);
          $(this).addClass('active').siblings('li').removeClass('active');
      })
      playBtn.on('click focus',function(e){
          e.preventDefault();
        $(this).toggleClass('on');
        var icon=$(this).find('i');
        if($(this).hasClass('on')){
            swiper.autoplay.stop();
            icon.attr('class','fas fa-play');
        }else{
            console.log('시작');
            swiper.autoplay.start();
            icon.attr('class','fas fa-pause');
        }
      })
      //golbal 슬라이드
      var globalSwiper = new Swiper('.global_slide', {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView:'1',
        loop:true,
        loopedSlides:4,
        
      });
      //public 슬라이드
      var publicBtn=$(".public .controls .play-btn");
      var publicSwiper = new Swiper('.swiper-container.news_slides', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          slidesPerView:1.5,
          spaceBetween: 20,
        autoHeight:true,
        loop:true,
        pagination: {
            el: '.public .pager',
            type: 'fraction',
          },
          navigation: {
            nextEl: '.public .arrows .next',
            prevEl: '.public .arrows .prev',
          },
          breakpoints: {
            1330: {
                slidesPerView: 3.5,
                spaceBetween: 50,
            },
            1000: {
                slidesPerView:3,
                spaceBetween: 20,
            },
            800: {
                slidesPerView:2,
                spaceBetween: 20,
            },
            600: {
                slidesPerView:3,
                spaceBetween: 20,
            },
            480: {
                slidesPerView:1.5,
                spaceBetween: 20,
            },


          }
       
      });

      
      publicBtn.on('click focus',function(e){
        e.preventDefault();
      $(this).toggleClass('on');
      var publiIcon=$(this).find('i');
      if($(this).hasClass('on')){
          publicSwiper.autoplay.stop();
          publiIcon.attr('class','fas fa-play');
      }else{
          console.log('시작');
          publicSwiper.autoplay.start();
          publiIcon.attr('class','fas fa-pause');
      }
    })


    }//index
      //메뉴 리사이즈될때 메뉴 수정
      function MenuResize(){
          if(winWidth>800){
            $('.pc_trigger_menu').removeClass('open');
            trigger.add(lang).add(fam).removeClass("on");
            $(this).add(nav).add('.right_menu').removeClass('on'); 
            $('body').removeClass('hidden');
          }
          if(winWidth>1000){
            subMenu.hide();
            $('.gnb>li>a').removeClass('on');
            subMenu.removeAttr('style')
          }
          //800px 이하일때는 애니메이션 주지 않음
          if(winWidth<800){
            section.each(function(){
                $(this).find(".animate").removeClass('animate');
            })
          }
          if(winWidth>1024){
            $('.company .subsidiary .fix_tabs ul').removeAttr('style');
          }
          
      }
      function mobileHeight(){
             var sec=$('.section.header');
             sec.css({height:$(window).height()+'px'});
             console.log('높이수정');
             console.log('aaaaaa')
      }

        //infrom  숫자 애니메이션
        var numCountState=false;
    function numCount(){
        var count=$('.animate.count');
        if($('.inform .animate').hasClass("motion")){
            if(!numCountState){
                count.each(function(){
                    var target=$(this);
                    var targetNum=target.attr('data-rate')
                    $({rate:0}).animate({rate:targetNum},{
                        duration:1200,
                        progress:function(){
                            var now=this.rate;
                            var nowText=Math.ceil(now);
                            if(target.hasClass('number')){
                                var numnowText=nowText.toLocaleString();
                                target.text(numnowText);
                            }else{
                                target.text(nowText);
                            }
                            
                        }
                    })
                })
            }
            numCountState=true;
            console.log('numCount')
        }

        }
    
      
      //모바일에서(800px 이상 1240px 이하) 스크롤될때 애니메이션
      var winOffset;
      var sectionOffset;
      var aniMotion;
      function mobileOffset(Elem){
          if(Elem.length>0){
            sectionOffset=Elem.offset().top-$(window).outerHeight()*0.6;
            aniMotion=Elem.find('.animate');
    
            if(sectionOffset<winOffset){
                if(!aniMotion.hasClass("motion")){
                    aniMotion.addClass("motion")
                }
            }
          }
 
      }

      function Motion(){
       if(winWidth>800){
            mobileOffset($('.global'))
            mobileOffset($('.inform'))
            mobileOffset($('.public'))
            mobileOffset($('.who'))
            numCount();
        }else{
            return
        }
      }
    
      $(".goTopBtn, .sub_goTopBtn").click(function(e){
          e.preventDefault();
          $("html, body").stop().animate({scrollTop:0})
      })
       
    
    $(window).on('resize',function(){
        winWidth=$(window).width();
        MenuResize();
        init();   
    })
    $(window).scroll(function(){
        winOffset=$(window).scrollTop();
        Motion();
        console.log($('.sub').length);
        if($('.sub_pg').length>0){
            ElemFix();

        }
    })
    
    init();

    // window.addEventListener('resize',function(){
    //     console.log('풀스크린')
    // })
    if(winWidth<1240){
        mobileHeight();
    }





    

})//end
