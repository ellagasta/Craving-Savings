
	// $('#myTab a').click(function (e) {
	// 	 e.preventDefault();
	// 	 $(this).tab('show');
	// });

	$(function () {
		$('#myTabs a:first').tab('show') // Select first tab

	})
		$('#myTabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})