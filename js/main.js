$(function () {

    // 当屏幕发生变化
    function resize() {

            // 获取屏幕宽度
            var screenWidth = $(window).width();

            // 判断当前屏幕是否小于768
            var isSmallImage = screenWidth < 768 ;

            $('#content > .carousel > #carousel-example-generic > .carousel-inner >.item').each(function (i, item) {
                // 将item转换为jquery对象
                $item = $(item);

                var imgSrc = isSmallImage ? $item.data('small-image') : $item.data('large-imge');

                $item.css('backgroundImage','url("'+ imgSrc +'")');

                // 判断当成为小屏幕时,不使用backgroundimage,使用img标签的形式,因为需要等比例缩小
                if (isSmallImage) {
                    $(item).html('<img src="' + imgSrc + '" alt="">');
                }else  {
                    $(item).html('');
                }
            });

            // 根据产品推荐菜单的个数,算出总宽度
            var totalWidth = 20;      // 因为.nav-tabs有一个padding 10px,所以要将padding的值也算在内
            $('.ul-wapper > .nav-tabs').children().each(function (index, element) {
                totalWidth += element.clientWidth;
             });

             if (totalWidth > $(window).width()) {
                 $('.nav-tabs').css('width',totalWidth);
             }

    };

    // trigger() 自动触发window的resize事件
    $(window).on('resize',resize).trigger('resize');


    // 让tooltip显示
    $('.tooltip-one').tooltip();
    $('.tooltip-two').tooltip();

    //新闻资讯板块中,点击按钮,更换标题
    $('#content > .news .news-logo ul li').on('click',function () {
        var title = $(this).data('news-title');
        $('#content > .news .news-title').html(title);
    });

    //监听屏幕滚动,固定导航条
    $(window).scroll(function () {

        // 判断class中是否包含affix-top字符
        if ($('#header > div').eq(1).attr('class').indexOf('affix-top') == -1) {

            //获取导航条高度
            var navHeight = $('#header > div').eq(1).height();
            $('#content > .carousel').css('margin-top',navHeight);
        }else {
            $('#content > .carousel').css('margin-top',0);
        }
    });

    //在移动端根据手指的滑动方向,滚动轮播图
    $carousel = $('#carousel-example-generic');

    //起始坐标与结束坐标
    var startX,endX;

    $carousel.on("touchstart",function (e) {
        // console.log(e.originalEvent.targetTouches[0].clientX);
        startX = e.originalEvent.targetTouches[0].clientX;
    });

    $carousel.on("touchmove",function (e) {
        // console.log(e.originalEvent.targetTouches[0].clientX);
        endX = e.originalEvent.targetTouches[0].clientX;
    });

    $carousel.on("touchend",function (e) {
        var distance = Math.abs(startX - endX);
        if (distance > 10) {
            if (startX > endX) {
                $(this).carousel('next');     // bootstrap提供的方法
            }else
            {
                $(this).carousel('prev');
            }
        }

    });


});

