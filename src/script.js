$(document).ready(function () {
    $(document).foundation();

    function showLoading(show) {
        if (show) {
            $('#loading').removeClass('hidden');
        } else {
            $('#loading').addClass('hidden');
        }
    }

    $('input').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("form").submit();
        }
    });

    $('form').submit(function (event) {
        event.preventDefault();
        var inputFields = $('form :input').filter(function (index, element) {
            return element.name
        });
        var data = {};
        for (var i = 0; i < inputFields.length; ++i) {
            data[inputFields[i].name] = inputFields[i].value;
        }
        showLoading(true);
        $.ajax({
            url: "https://docs.google.com/forms/d/1xo34_2ipSfn-KMRrCzdTUSdFprYw1--GIGbjlQPGP6w/formResponse",
            data: data,
            type: "POST",
            dataType: "xml"
        }).always(function () {
            // not the best way to handle this... Better can be found here: http://stackoverflow.com/a/6169703/1035552
            console.log('always');
            //showLoading(false);
            $('#thanks').removeClass('hidden');
        });
    });

    $('#thanks button').on('click', function (event) {
        event.preventDefault();
        $('form').find('input, text').val('');
        $('#thanks').addClass('hidden');
        $('#loading').addClass('hidden');
    });

    $('#clearing').on('click', function (event) {
        var firstElement = $('[data-clearing] li a').first()[0];
        if (!firstElement) {
            var html = '<ul data-clearing="" class="clearing-thumbs"><li><a href="./static/img/01.jpg"><img src="./static/img/01.jpg"></a></li><li><a href="./static/img/02.jpg"><img src="./static/img/02.jpg"></a></li><li><a href="./static/img/03.jpg"><img src="./static/img/03.jpg"></a></li><li><a href="./static/img/04.jpg"><img src="./static/img/04.jpg"></a></li><li><a href="./static/img/05.jpg"><img src="./static/img/05.jpg"></a></li></ul>';
            $('body').append(html);
            $(document).foundation('clearing', 'reflow');
        }
        $('[data-clearing] li a').first().trigger('click');
    });


    (function googleAnalytics() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-60029641-1', 'auto');
        ga('send', 'pageview');
    })();
});