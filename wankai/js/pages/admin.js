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


//（产品、行业 ）分类菜单
$.classifyMenu={
  activate:function () {
    var _this=this;
    
    //菜单收缩
    //产品分类，行业分类一级菜单点击显示二级菜单
    $('.product-list-group').on('click','.card-cata-title',function(e) {
        $(this).siblings().children('.card-show-body').fadeToggle();
        return false;
    });


    $(window).resize(function () {
      _this.checkStatuForResize();
    });
  },
  checkStatuForResize:function () {
    var $body = $('body');
    var width = $body.outerWidth();
    var $target1=$('.product-list-group .card-show-body');

    if (width > 767) {
        $target1.fadeIn();
    }else{
        $target1.fadeOut();
    }

  }
}


//==========================================================================================================================

$(function () {

    $.AdminBSB.rightSideBarM.activate();
    $.classifyMenu.activate();
    
    highlightPage();
    function highlightPage() {
        /**
         * highlightPage():顶部导航高亮
         */
        var nav=$('.nav-list');
        var links=$('.nav-list li');
        console.log('test');

        for (var i = 0; i < links.length; i++) {
            var link_url=links.eq(i).children().attr('href');
            var cur_url =window.location.href;
            // console.log(cur_url);
            // console.log(link_url);
            if (cur_url.indexOf(link_url)!=-1) {
                links.eq(i).children().addClass('active')
            }

        }
    } 
    


});