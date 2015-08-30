var hideoptions = { "direction" : "left", "mode" : "hide"};
var Hide = '#Week1';
var showoptions = { "direction" : "right", "mode" : "show"};
var Show = '#Week2';
var Subjects = ['Math','Science',"English","PDH","History","Geography","IST","Commerce","Drama","Music","PE","Study","Assembly","Cycle Test"]
var Classes = [];
var TempClass = {
	Subject: $( "#ClassSelect" ).val(),
	Grade: $( "#Grade" ).val(),
	Num: $( "#ClassNum" ).val(),
};
var Test;
$(document).ready(function() {
	launch();
	// for (var i = 0; i < Data.length; i++) {
	// 	Classes.push({
	// 	id: Data[i].ID,
	// 	Subject: Data[i].Subject,
	// 	Grade: Data[i].Grade,
	// 	Num: Data[i].Number,
	// 	Text: 'black',
	// 	Color: "rgb(120, 255, 255)",
	// 	DefaultRoom: "1",
	// 	Slots: JSON.parse(Data[i].Slots)
	// 	});
	// };
	// launch();
	$("#Edit").hide();
	$(".EditIcon").hide();
	$("#Week2").hide();
	$("#SubjectCreator").hide();
	$("#ClassSelect").autocomplete({source: Subjects});
	$( ".WeekView" ).children().children().addClass("Box");
	$( ".WeekView" ).children().children().css({'background-color': 'Grey', 'position': 'relative', 'width': '100%'});
	// $( ".WeekView" ).children().css({'float': 'left', 'position': 'relative', 'width': '150px', 'height': '100%'});
	$( ".WeekView" ).children().children().droppable({
		hoverClass: "Hover",
		drop: function(event, ui) {	
		if ($(this).children().length == 0) {
			if ($(ui.draggable[0]).hasClass('Subject')) {
				$(this).append("<div class='SetSubject Box'></div>");
				$(ui.draggable[0]).children("p").clone().appendTo($(this).children());
				for (var i in Classes) {
					if (Classes[i].id == $(ui.draggable[0]).attr("data")) {
						$(this).children().attr('data', Classes[i].id);
						Classes[i].Slots.push({
							Week: $(this).parent().parent().attr('id'),
							Day: $(this).parent().attr('class'),
							Period: $(this).attr('id')
						});
					}
				};
				$(".SetSubject").draggable({
					revert: function( event, ui ) {
						var Distance = Math.sqrt(Math.pow(($(this).position().top),2) + Math.pow(($(this).position().left),2));
						if (Distance > 50) {
							var Oldpos = {
								Week: $(this).parent().parent().parent().attr('id'),
								Day: $(this).parent().parent().attr('class'),
								Period: $(this).parent().attr('id')
							}
							for (var i in Classes) {
								for (var e in Classes[i].Slots) {
									if (JSON.stringify(Oldpos) == JSON.stringify(Classes[i].Slots[e])) {
									Classes[i].Slots.splice(e, 1);
									}
								}
							}
							$(this).remove();
						}
					return 'true';
					}
				});
				$(ui.draggable[0]).css({'left': '0px', 'top': '0px'});
				$(this).children().css("color", $(ui.draggable[0]).css('color'));
				$(this).children().css('background-color', $(ui.draggable[0]).css('background-color'));
			}
			else {
				var Oldpos = {
					Week: $(ui.draggable[0]).parent().parent().parent().attr('id'),
					Day: $(ui.draggable[0]).parent().parent().attr('class'),
					Period: $(ui.draggable[0]).parent().attr('id')
				}
				for (var i in Classes) {
					for (var e in Classes[i].Slots) {
						if (JSON.stringify(Oldpos) == JSON.stringify(Classes[i].Slots[e])) {
						Classes[i].Slots.splice(e, 1);
						Classes[i].Slots.push({
								Week: $(this).parent().parent().attr('id'),
								Day: $(this).parent().attr('class'),
								Period: $(this).attr('id')
						});
						}
					}
				}
				$(ui.draggable[0]).appendTo($(this));
				$(ui.draggable[0]).css({'left': '0px', 'top': '0px'});
			}
		}
		}
	});
});

function CreateSubject() {
if (!($("#ClassSelect").val() == "" || $( "#Grade" ).val() == ""|| $( "#ClassNum" ).val() == "" || $( ".color" ).val() == '' || $( "#Room" ).val() == '')) {
	TempClass = {
		id: Math.floor((Math.random()*8999)+1000),
		Subject: $( "#ClassSelect" ).val(),
		Grade: $( "#Grade" ).val(),
		Num: $( "#ClassNum" ).val(),
		Color: $(".color").css('background-color'),
		Text: $(".color").css('color'),
		DefaultRoom: $("#Room").val(),
		Slots: []
	};
	for (var i in Classes) {
		if (JSON.stringify(Classes[i].Subject) == JSON.stringify(TempClass.Subject) && JSON.stringify(Classes[i].Grade) == JSON.stringify(TempClass.Grade) && JSON.stringify(Classes[i].Num) == JSON.stringify(TempClass.Num)) {
			document.getElementById("Message").innerHTML= "Subject Already Created";
			setTimeout (function(){
				document.getElementById("Message").innerHTML= "";
			},2000); 
			return;
		}
	}
	Classes.push(TempClass);
	$('#SubjectBox').append("<div onmouseover='IconToggle(this)' onmouseout='IconToggle(this)' class='Subject Box'><p class = '1' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '2' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '3' style = 'float:left'></p><img class='EditIcon' src='EditIcon.png' onclick='ShowEdit($(this).parent())'></div>");
	$(".Subject").last().attr('data', TempClass.id);
	$(".Subject").last().children(".1").text(TempClass.Subject);
	$(".Subject").last().children(".2").text(TempClass.Grade);
	$(".Subject").last().children(".3").text(TempClass.Num);
	$(".Subject").last().css('color', TempClass.Text);
	$(".Subject").last().css('background-color', TempClass.Color);
	$( "#SubjectCreator" ).hide( "blind", 500 );
	$(".EditIcon").hide();
	$(".Subject").draggable({
		helper: function () {
			return $(this).clone().appendTo('body').show();
		},
		start: function() {
			IconToggle($(this));
		},
		stop: function() {
			IconToggle($(this));
		},
	    scroll: false
	});
}
else{
	$("#Message").text("Please fill out all the Sections");
	setTimeout (function(){
		$("#Message").text("");
	},2000); 
}
}

function Slide() {
	$("#NextWeek").hide();
	$(Hide).effect( "slide", hideoptions, 1000);
	$(Show).effect( "slide", showoptions, 1000);
	Hide = [Show, Show = Hide][0];
	setTimeout (function(){
		$("#NextWeek").show();
	},1000); 
}

function IconToggle(e) {
	$(e).children('.EditIcon').stop();
	$(e).children('.EditIcon').fadeToggle("fast");
}

function ShowEdit(e) {
	$('#Create').hide();
	$('#Edit').show();
	$('#Delete').show();
	$('#SubjectCreator').show( 'blind', 500 );
	$('#ClassSelect').val($(e).children('.1').text());
	$('#Grade').val($(e).children('.2').text());
	$('#ClassNum').val($(e).children('.3').text());
	for (var i = 0; i < Classes.length; i++) {if (Classes[i].id == $(e).attr('data')) $('#Room').val(Classes[i].DefaultRoom)};
	$('.color').css({'background-color':$(e).css("background-color"), 'color': $(e).css("color")});
	$('.color').val(colorToHex($(e).css("background-color")));
	$("#Edit, #Delete").unbind("click");
	$('#Edit').click(function(event) {
		$('#SubjectCreator').hide( 'blind', 500 );
		for (var i = 0; i < Classes.length; i++) {
			if (Classes[i].id == $(e).attr('data')) {
				Classes[i].Subject = $( "#ClassSelect" ).val();
				Classes[i].Color = '#' + $( ".color" ).val();
				Classes[i].Text = $(".color").css('color');
				Classes[i].Grade = $( "#Grade" ).val();
				Classes[i].Num = $( "#ClassNum" ).val();

			}
		};
		$('.Subject, .SetSubject').each(function(){
			if ($(this).attr("data") == $(e).attr('data')) {
				$(this).children(".1").text($( "#ClassSelect" ).val());
				$(this).children(".2").text($( "#Grade" ).val());
				$(this).children(".3").text($( "#ClassNum" ).val());
				$(this).css('background-color', '#' + $( ".color" ).val());
				$(this).css('color', $(".color").css('color'));

			}
		});
	});
	$('#Delete').click(function(event) {
		$('#SubjectCreator').hide( 'blind', 500 );
		for (var i = 0; i < Classes.length; i++) {
			if (Classes[i].id == $(e).attr('data')) {
				Classes.splice(i,1);
			}
		};
		$('.Subject, .SetSubject').each(function(){
			if ($(this).attr("data") == $(e).attr('data')) {
				$(this).remove();
			}
		});	
	});
}

var day = new Date().getDay;

function colorToHex(color) {
	if (color.substr(0, 1) === '#') {
		return color;
	}
	var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
	var red = parseInt(digits[2]);
	var green = parseInt(digits[3]);
	var blue = parseInt(digits[4]);
	var rgb = blue | (green << 8) | (red << 16);
	var temp = digits[1] + rgb.toString(16);
	while (temp.length < 6) {
		temp = "0" + temp;
	}
	return temp;
	};