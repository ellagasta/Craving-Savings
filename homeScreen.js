function getHtmlForNewGoal(name, amount) {
    var html ='<div class="col-md-3"><div id="new-goal-1" class="panel panel-default goal"><div class="goal-non-hover"><h4 class="text-center">';
    html += name;
    html += '</h4><img src="http://placehold.it/350X350" class="goal-icon center-block"><div class="progress"><div class="progress-bar" style="width: 60%;"></div></div><h4 class="text-center progress-amount">$6.00/$10.00</h4></div><div class="hover-add"><button class="btn btn-default hover-btn-top">Open Goal</button><button class="btn btn-default hover-btn-bottom">Add $ to Savings</button></div></div></div>';
    return html;
}

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

	$('.new-goal').click(function() {
		$(getHtmlForNewGoal("Test", 5.00)).insertBefore('.add-new-goal-col');
	});

})