if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.AdminBSB = {};

/* Browser - Function ======================================================================================================
*  You can manage browser
*  
*/
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}


/*仿写*/
$.AdminBSB.rightSideBarM = {
    activate: function () {
        var _this = this;
        var $sidebar = $('.my-right-sidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $overlay.click(function(event) {
            $overlay.fadeOut();
            $sidebar.removeClass('open');
        });
        $sidebar.find('.nav li').click(function(event) {
            $overlay.fadeOut();
            $sidebar.removeClass('open');
        });

        $sidebar.find('.nav-wrap').click(function(event) {
            $overlay.fadeOut();
            $sidebar.removeClass('open');
        });

        $sidebar.find('.shop-class h3').click(function(event) {
            $(this).toggleClass('active').parents('.my-right-sidebar').find('.dropdown-menu').toggleClass('active');
            return false;
        });

        $sidebar.find('.dropdown-menu li').click(function(event) {
            $(this).addClass('current').siblings().removeClass('current');
            $overlay.fadeOut();
            $sidebar.removeClass('open');
        });

        $('.open-sidebar-btn').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });

        
        /*_this.setMenuHeight();*/
        $(window).resize(function () {
            _this.checkStatuForResize();
            /*_this.setMenuHeight();*/
        });
    },
    setMenuHeight: function () {
        if (typeof $.fn.slimScroll != 'undefined') {
            var height=$(window).height();
            var $el = $('.my-right-sidebar .nav-wrap');
            console.log(height);
            $el.slimscroll({
                height: height+"px"
            });
        }
    },
    checkStatuForResize: function () {
        var $body = $('body');
        var $sidebar = $('.my-right-sidebar');
        var width = $body.width();
        var $overlay = $('.overlay');

        if (width > 767) {
            $sidebar.removeClass('open');
            $overlay.fadeOut();
        }
    },
    isOpen: function () {
        return $('.my-right-sidebar').hasClass('open');
    }
}

//==========================================================================================================================
//（产品、行业 ）分类菜单
$.classifyMenu={
  activate:function () {
    var _this=this;
    var $object=$('.product-show .product-classify .item-title');
    var $target=$('.product-show .product-classify .item-body');

    //_this.clickHide();
    //debugger;
    
    //菜单收缩
    //产品分类，行业分类一级菜单点击显示二级菜单
    $('.product-show .product-classify').on('click mouseenter','.item-title',function(e) {
      /*$(this).toggleClass('current').siblings('.item-body').fadeToggle().parents('.product-show').find('.item-title').not($(this)).removeClass('current').parents('.product-show').find('.item-body').not($(this).siblings('.item-body')).fadeOut();*/
        $(this).addClass('current').siblings('.item-body').fadeIn().parent().siblings().find('.item-title').not($(this)).removeClass('current').parent().siblings().find('.item-body').not($(this).siblings('.item-body')).fadeOut();
        return false;
    });

    $('.product-show .product-classify .list-group-wrap').mouseleave(function (e) {
        $('.product-show .product-classify .item-title').removeClass('current').siblings('.item-body').fadeOut();
    })

    // $(window).resize(function () {
    //   _this.checkStatuForResize();
    // });
  },
  clickHide:function () {
    var $object=$('.product-show .item-title');
    var $target=$('.product-show .item-body');
    $target.on('click',function (e) {
       $object.removeClass('current');
       $target.hide();
       return false;
    });
  },
  checkStatuForResize:function () {
    var $body = $('body');
    var width = $body.width();
    var $object=$('.product-show .product-classify .item-title');
    var $target1=$('.product-show .product-classify .item-body');
    var $target2=$('.product-show .product-classify .list-group');

    if (width > 767) {
        $target1.fadeIn();
        $target2.fadeIn();
    }else{
        $object.removeClass('current');
        $target1.fadeOut();
        $target2.fadeOut();
    }

  }
}


//==========================================================================================================================

$(function () {
    /*顶部导航栏 的 手机网站、官方微信 hover click 弹出二维码*/  
    $('.hover-img').mouseover(function(event) {
      $(this).addClass('current');
    }).mouseout(function(event) {
      $(this).removeClass('current');
    }).click(function () {
      $(this).toggleClass('current');
    });  
    
    
    
    $.AdminBSB.rightSideBarM.activate();
    $.classifyMenu.activate();



});