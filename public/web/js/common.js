$(document).ready(function () {
    //nav
    $("#mnavh").click(function () {
        $("#starlist").toggle();
        $("#mnavh").toggleClass("open");
    });

    var obj = null;
    var As = document.getElementById('starlist').getElementsByTagName('a');
    obj = As[0];
    for (i = 1; i < As.length; i++) {
        if (window.location.href.indexOf(As[i].href) >= 0)
            obj = As[i];
    }
    obj.id = 'selected';

    var new_scroll_position = 0;
    var last_scroll_position;
    var header = document.getElementById("header");

    window.addEventListener('scroll', function (e) {
        last_scroll_position = window.scrollY;

        // Scrolling down
        if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
            // header.removeClass('slideDown').addClass('slideUp');
            header.classList.remove("slideDown");
            header.classList.add("slideUp");

            // Scrolling up
        } else if (new_scroll_position > last_scroll_position) {
            // header.removeClass('slideUp').addClass('slideDown');
            header.classList.remove("slideUp");
            header.classList.add("slideDown");
        }

        new_scroll_position = last_scroll_position;
    });


    //�ص�����
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
        );
    });

    //like article function
    likeArticle = function (url, art_id) {
        var formData = {'art_id': art_id};
        ajaxElement(url, formData);
    };

    //AJAX �ύ
    ajaxElement = function (url, data) {
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            beforeSend: function(request) {
                request.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));
            },
            success: function (res) {
                if (res.status == 1) {
                    window.location.reload();
                } else {
                    alert(res.message);
                    return false;
                }
            },
            error: function () {
                alert('��������æ');
                return false;
            }
        });
    };



    //�����̶�
    // //aside
    // var Sticky = new hcSticky('aside', {
    //   stickTo: 'main',
    //   innerTop: 200,
    //   followScroll: false,
    //   queries: {
    //     480: {
    //       disable: true,
    //       stickTo: 'body'
    //     }
    //   }
    // });

});