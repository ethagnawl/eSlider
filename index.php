<!DOCTYPE HTML>
<html lang='ru-RU'>
<head>
	<title>eSlider is a jQuery plugin</title>
	<meta charset='UTF-8'>
	<meta name='description' content='eSlider is a jQuery plugin' />
	<meta name='keywords' content='eSlider is a jQuery plugin' />
	<link rel='stylesheet' href='http://ethagnawl.com/pub/css/ethagnawl.css' />
	<style type='text/css'>
    h1-wrapper { margin-bottom:20px; }
	h1 { font-size:24px; margin-bottom:10px; }
    code { background-color:#000; color:green; float:left; font-size:12px; margin:0 auto; padding:10px 20px; }
    code p { color:green; padding-left:20px; }
	</style>
    <link rel='stylesheet' href='eSlider.css' />
</head>

<body>

    <div class='nav'>
	    <a href='/'>ethagnawl.com</a>
    </div>

	<div class='h1-wrapper'>
		<h1>eSlider jQuery Plugin Demo</h1>
	</div>

    <div id='slideshow'></div>	

<?/*
    <code>
    $('#slideshow').eSlider({
        <p>api_key:'dd557c079ba39b8d62c2f6b0f299b89e',</p>
        <p>fade_speed: 'slow',</p>
        <p>left_arrow:'prev',</p>
        <p>per_page: 7,</p>
        <p>right_arrow:'next',</p>
        <p>set_id: '72157601848439095',</p>
        <p>size: 'm',</p>
        <p>slide_speed: 'fast'</p>
    });
    </code>
*/?>

    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js'></script>	
    <script src='http://ethagnawl.com/pub/js/ethagnawl.js'></script>	
    <script src='jquery.eSlider.js'></script>	
    <script>
    $('#slideshow').eSlider({
        api_key: '177163555689a3d53165d503a190391f',
        fade_speed: 'slow',
//        key_nav: true,
        left_arrow: 'previous',
        per_page: 7,
        reset: false,
        right_arrow: 'next',
        set_id: '72157625628419254',
        size: 'm',
        slide_speed: 'fast'
    });
    </script>

</body>
</html>
