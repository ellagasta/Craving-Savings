
	// $('#myTab a').click(function (e) {
	// 	 e.preventDefault();
	// 	 $(this).tab('show');
	// });

	// $(function () {
	// 	$('#myTabs a:first').tab('show'); // Select first tab


	// 	$('#myTabs a').click(function (e) {
	// 	  		  console.log("hi");
	// 		e.preventDefault();
	// 	  $(this).tab('show');
	// 	});
	// })



$(function () {
	$('#myTab a:first').tab('show');

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.goal').hover(function(){
		$('.hover-add').fadeTo("fast", 1);
		$('.goal-non-hover').fadeTo("fast", .5);
	}, function()
	{ 
	    $('.hover-add').fadeTo("fast", 0);
	    $('.goal-non-hover').fadeTo("fast", 1);
	});

})