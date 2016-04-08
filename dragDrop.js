$(document).ready(function(){
	var dividedCount = divideDenomination(balance);
    for (var denomination in dividedCount){
    	if (dividedCount[denomination] !== 0){
    		addMoney(denomination,dividedCount[denomination]);
    	}
    }
    $("#left-balance").text("$"+left_balance.toFixed(2));

	$("#left-window").droppable({
		drop: function(event,ui){
			var source = ui.draggable.attr('src').split('/');
			var value = monetaryValue(source[source.length - 1].split('.')[0]);
			left_balance += value;
			$("#left-balance").text("$"+left_balance.toFixed(2));
		},
		tolerance: "pointer"
	});
	$("#right-window").droppable();
})

left_balance = 0;
left_items = [];
right_balance = 0;
balance = 23.50;
startX = 20;
startY = 90;
idNum = 0;

function addMoney(denomination, num){
	console.log(denomination);
	for (var i = 0; i < num; i++){
		$("#window-wrapper").append('<img id='+idNum+' class="money" src="images/'+denomination+'.png" height='+imgHeight(denomination)+'/>');
		$("#"+idNum).css("top",startY+"px");
		$("#"+idNum).css("left",startX+"px");
		$("#"+idNum).draggable();
		idNum += 1;
		left_items.push(idNum);
   		left_balance += monetaryValue(denomination);

		startY += 20;
    	startX += 20;
	}
	startX = 30;
	startY += 50;

 //    if (denomination !="quarter"){
 //    	ctx.drawImage(image,startX,startY,200,200*image.height/image.width);
	// }else{
	// 	ctx.drawImage(image,startX,startY,50,50*image.height/image.width);
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
		pennie:pennies
	}
}

function imgHeight(denomination){
	switch(denomination){
		case "quarter":
			return "25px";
		case "dime":
			return "";
		case "nickel":
			return "";
		case "penny":
			return "";
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