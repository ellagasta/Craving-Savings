goalID = 1;
function getHtmlForNewGoal(name, amount) {
	var html = '<div class="col-md-3" id="goal'+goalID+'"><div class="panel panel-default goal hoverable-panel"><div class="non-hover non-hover-div"><h4 class="text-center">';
	goalID+=1;
	html += name;
	html += '</h4><img src="http://placehold.it/350X350" class="goal-icon center-block"><div class="progress"><div class="progress-bar" style="width: 0%;"></div></div><h4 class="text-center progress-amount">';
	html += '$0.00/$' + amount;
	html += '</h4></div><div class="hover-add hover-div"><button class="btn btn-default hover-btn-top">Open Goal</button><button class="btn btn-default hover-btn-bottom">Add $ to Goal</button></div></div></div>';
	return html;
}

var hoverFunc = function() {
	$(this).find('.hover-div').fadeTo("fast", 1);
	$(this).find('.non-hover-div').fadeTo("fast", .5);
}

var unhoverFunc = function() {
    $(this).find('.hover-div').fadeTo("fast", 0);
    $(this).find('.non-hover-div').fadeTo("fast", 1);
}

var newGoalClick = function(){
	$(getHtmlForNewGoal("Test", '5.00')).insertBefore('.add-new-goal-col');
	$(".btn.btn-default.hover-btn-top").click(openGoalClick);
	$(".btn.btn-default.hover-btn-bottom").click(addMoneyClick);
	$('.hoverable-panel').hover(hoverFunc, unhoverFunc);
}

var uploadLightsaber = function(){
	console.log("upload the lightsaber");
	$("#uploadPhotoBox").hide();
	$("#lightsaber").show();
}

var replacePhotoWithLightSaber = function(){
	$("#goal-img").attr("src", "images/lightsaber.png");
	$("#goal-img").css("border", "1px solid black");
	$("#goal-img").css("border-radius", "4px");
}

$(function () {
	$('#myTab a:first').tab('show');

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.hoverable-panel').hover(hoverFunc, unhoverFunc);

	$('.new-goal').click(newGoalClick);

	$('#openBtn').click(function(){
		$('#myModal').modal({show:true});
	});

	$('#photoBtn').click(function(){
		$('#photoModal').modal({show:true});
	})

	$('#uploadPhotoBox').click(function(){
		uploadLightsaber();
	})

	$('#submitPhoto').click(function(){
		replacePhotoWithLightSaber();
	})
})
