$(document).ready(function(){
	left_balance = balance;
	right_balance = 0;
	refreshDisplay();

	$("#left-window").droppable({
		drop: function(event,ui){
			if (item_locations[ui.draggable.attr('id')] === 'right' ){
				var source = ui.draggable.attr('src').split('/');
				var value = monetaryValue(source[source.length - 1].split('.')[0]);
				left_balance += value;
				right_balance -= value;
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				item_locations[ui.draggable.attr('id')] = 'left';
				var prevTransferValue = Number($("#transfer").val());
				var newValue = prevTransferValue - value;
				$("#transfer").val(newValue.toFixed(2));
			}
		},
		tolerance: "intersect"
	});
	
	$("#right-window").droppable({		
		drop: function(event,ui){
			if (item_locations[ui.draggable.attr('id')] === 'left'){
				var source = ui.draggable.attr('src').split('/');
				var value = monetaryValue(source[source.length - 1].split('.')[0]);
				right_balance += value;
				left_balance -= value;
				$("#left-balance").text("$"+left_balance.toFixed(2));
				$("#right-balance").text("$"+right_balance.toFixed(2));
				item_locations[ui.draggable.attr('id')] = 'right';
				var prevTransferValue = Number($("#transfer").val());
				var newValue = prevTransferValue + value;
				$("#transfer").val(newValue.toFixed(2)); //use val instead of .spinner('value') to not trigger 'change'
			}
		},
		tolerance: "intersect"
	});

	$("#transfer").spinner({
		min:0,
		max:balance,
		step:.01,
		culture:'en-US',
		numberFormat: "n",
		change: function(event,ui){
			var val;
			if ($(this).val() < 0){
				val = 0;
			}else{
				var val = Math.min(Number($(this).val()), balance);
			}
			$(this).val(val.toFixed(2));
			var total = left_balance + right_balance; 
			right_balance = val;
			left_balance = total - right_balance;

			$("#left-balance").text("$"+left_balance.toFixed(2));
			$("#right-balance").text("$"+right_balance.toFixed(2));
			refreshDisplay();
			console.log("CHANGE");
		}
	});

	$("#organize-button").click(refreshDisplay);


//	$("#transfer").spinner('option','culture','en-US');
})

balance = 23.50;

function addMoney(denomination, num, side){
	if (side =='left'){
		for (var i = 0; i < num; i++){
			$("#window-wrapper").append('<img id='+idNum+' class="money" src="images/'+denomination+'.png" height='+imgHeight(denomination)+'/>');
			$("#"+idNum).css("top",startYLeft+"px");
			$("#"+idNum).css("left",startXLeft+"px");
			$("#"+idNum).draggable({'containment':"parent"});
			item_locations[idNum] = 'left';
			idNum += 1;

			startYLeft += 20;
	    	startXLeft += 20;
		}
		startXLeft = 30;
		startYLeft += 50;
	}else if (side =='right'){
		for (var i = 0; i < num; i++){
			$("#window-wrapper").append('<img id='+idNum+' class="money" src="images/'+denomination+'.png" height='+imgHeight(denomination)+'/>');
			$("#"+idNum).css("top",startYRight+"px");
			$("#"+idNum).css("left",startXRight+"px");
			$("#"+idNum).draggable({'containment':"parent"});
			item_locations[idNum] = 'right';
			idNum += 1;

			startYRight += 20;
	    	startXRight += 20;
		}
		startXRight = 470;
		startYRight += 50;		
	}else{
		alert('add money side error')
	}

 //    if (denomination !="quarter"){
 //    	ctx.drawImage(image,startXLeft,startYLeft,200,200*image.height/image.width);
	// }else{
	// 	ctx.drawImage(image,startXLeft,startYLeft,50,50*image.height/image.width);
	// }
 //    console.log(image.height,image.width);
    
}

function divideDenomination(balance){
	var hundreds = Math.floor(balance/100);
	balance -= hundreds*100

	var fifties = Math.floor(balance/50);
	balance -= fifties*50

	var twenties = Math.floor(balance/20);
	balance -= twenties*20

	var tens = Math.floor(balance/10);
	balance -= tens*10

	var fives = Math.floor(balance/5);
	balance -= fives*5

	var ones = Math.floor(balance);
	balance -= ones

	var quarters = Math.floor(balance*4);
	balance -= quarters*.25
	
	var dimes = Math.floor(balance*10);
	balance -= dimes*.10

	var nickels = Math.floor(balance*20);
	balance -= nickels*.05
	
	var pennies = Math.floor(balance*100);
	balance -= pennies*.01

	return {
		hundred:hundreds,
		fifty:fifties,
		twenty:twenties,
		ten:tens,
		five:fives,
		one:ones,
		quarter:quarters,
		dime:dimes,
		nickel:nickels,
		penny:pennies
	}
}

function imgHeight(denomination){
	switch(denomination){
		case "quarter":
			return "50px";
		case "dime": 
			return "30px";
		case "nickel":
			return "40px";
		case "penny":
			return "30x";
		default:
			return "50px";
	}
}

function monetaryValue(denomination){
	switch(denomination){
		case "hundred":
			return 100;
		case "fifty":
			return 50;
		case "twenty":
			return 20;
		case "ten":
			return 10;
		case "five":
			return 5;
		case "one":
			return 1;
		case "quarter":
			return 0.25;
		case "dime":
			return 0.1;
		case "nickel":
			return 0.05;
		case "penny":
			return 0.01;
		default:
			return undefined;
	}	
}

function refreshDisplay(){
	item_locations={};
	startXLeft = 20;
	startYLeft = 50;
	startXRight = 470;
	startYRight = 50;
	idNum=0;

	$('.money').remove();
	var dividedCount = divideDenomination(left_balance);
    for (var denomination in dividedCount){
    	if (dividedCount[denomination] !== 0){
    		addMoney(denomination,dividedCount[denomination],'left');
    	}
    }
    dividedCount = divideDenomination(right_balance);
    for (var denomination in dividedCount){
    	if (dividedCount[denomination] !== 0){
    		addMoney(denomination,dividedCount[denomination],'right');
    	}
    }
    $("#left-balance").text("$"+left_balance.toFixed(2));
    $("#right-balance").text("$"+right_balance.toFixed(2));
}