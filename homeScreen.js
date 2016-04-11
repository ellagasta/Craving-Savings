function getHtmlForNewGoal(name, amount) {
	var html = '<div class="col-md-3"><div class="panel panel-default goal hoverable-panel"><div class="non-hover non-hover-div"><h4 class="text-center">';
	html += name;
	html += '</h4><img src="http://placehold.it/350X350" class="goal-icon center-block"><div class="progress"><div class="progress-bar" style="width: 0%;"></div></div><h4 class="text-center progress-amount">';
	html += '$0.00/$' + amount;
	html += '</h4></div><div class="hover-add hover-div"><button class="btn btn-default hover-btn-top">Open Goal</button><button class="btn btn-default hover-btn-bottom">Add $ to Goal</button></div></div></div>';
	return html;
}

$(function () {
	$('#myTab a:first').tab('show');

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.hoverable-panel').hover(function() {
		console.log("hovering!" + this);
		$(this).find('.hover-div').fadeTo("fast", 1);
		$(this).find('.non-hover-div').fadeTo("fast", .5);
	}, function() { 
	    $(this).find('.hover-div').fadeTo("fast", 0);
	    $(this).find('.non-hover-div').fadeTo("fast", 1);
	});

	$('.new-goal').click(function() {
		$(getHtmlForNewGoal("Test", '5.00')).insertBefore('.add-new-goal-col');
	});

	$('#openBtn').click(function(){
		$('#myModal').modal({show:true});
	});
})