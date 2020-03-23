<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<!-- css files -->
	<link href="css/menu.css" rel="stylesheet" type="text/css"/>
	<link href="css/font-awesome.css" rel="stylesheet" type="text/css"/>
	<!-- js files -->
	<script src="js/jquery.js"></script>
	<script src="js/menu.js"></script>
</head>
<body>
<nav id="simple_menu"></nav>
</body>
<script>
<?php
	$data = array(
		array(
			"link" => "item1 link",
			"title" => "item1", 
			"children" => array(
				array(
					"link" => "item1-1 link", 
					"title" => "item1-1", 
					"children" => array()
				),
				array(
					"link" => "item1-2 link", 
					"title" => "item1-2", 
					"children" => array(
						array(
							"link" => "item1-2-1 link", 
							"title" => "item1-2-1", 
							"children" => array()
						)
					)				
				)
			)
		),
		array(
			"link" => "item2 link",
			"title" => "item2", 
			"children" => array(
				array(
					"link" => "item2-1 link", 
					"title" => "item2-1", 
					"children" => array()
				),
				array(
					"link" => "item2-2 link", 
					"title" => "item2-2", 
					"children" => array()				
				)
			)
		),
		array(
			"link" => "item3 link",
			"title" => "item3", 
			"children" => array()
		)			
	);
?>

	$('#simple_menu').simpleMenu({
		data: <?php echo json_encode($data); ?>,
		menuSign: {
			sign: 'custom',
			itemSignClass : {
				mainMenuSign: 'fa fa-caret-down',
				ltrSubMenuSign: 'fa fa-caret-right',
				rtlSubMenuSign: 'fa fa-caret-left'
			}
		},
		showingMethod : 'slide',
		theme : 'dark',
		menuType: 'click',
		direction: 'ltr',
		separator: 'no'
	});
</script>
</html>