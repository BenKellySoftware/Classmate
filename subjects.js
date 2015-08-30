var ClassesOld = [
	{
		id: 1,
		Subject: "Math",
		Grade: "12",
		Num: "E",
		Text: 'black',
		Color: "rgb(120, 255, 255)",
		DefaultRoom: "1",
		Slots: []
	},
	{
		id: 2,
		Subject: "English",
		Grade: "10",
		Num: "D",
		Text: 'black',
		DefaultRoom: "2",
		Color: "rgb(255, 200, 0)",
		Slots: []	
	},
	{
		id: 3,
		Subject: "Ist",
		Grade: "10",
		Num: "1",
		Text: 'black',
		Color: "rgb(200, 200, 200)",
		DefaultRoom: "2",
		Slots: []	
	},
	{
		id: 4,
		Subject: "Science",
		Text: 'black',
		Color: "rgb(85, 200, 70)",
		Grade: "10",
		Num: "E",
		DefaultRoom: "2",
		Slots: []
	},
	{
		id: 5,
		Subject: "Commerce",
		Text: 'black',
		Color: "rgb(197, 97, 255)",
		Grade: "10",
		Num: "2",
		DefaultRoom: "2",
		Slots: []
	},
	{
		id: 6,
		Subject: "History",
		Text: 'black',
		Color: "rgb(235, 250, 5)",
		Grade: "10",
		Num: "D",
		DefaultRoom: "2",
		Slots: []
	},
	{
		id: 7,
		Subject: "Geography",
		Text: 'black',
		Color: "rgb(250, 65, 65)",
		Grade: "10",
		Num: "D",
		DefaultRoom: "2",
		Slots: []
	},
	{
		id: 8,
		Subject: "PDH",
		Text: 'white',
		Color: "rgb(90, 90, 220)",
		Grade: "10",
		Num: "D",
		DefaultRoom: "2",
		Slots: []
	}
];

function launch() {
	for (var i in ClassesOld) {
		Classes.push(ClassesOld[i]);
		$('#SubjectBox').append("<div onmouseover='IconToggle(this)' onmouseout='IconToggle(this)' class='Subject Box'><p class = '1' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '2' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '3' style = 'float:left'></p><img onclick='ShowEdit($(this).parent())'class='EditIcon' src='EditIcon.png'></div>");
		$(".Subject").last().attr('data', ClassesOld[i].id);
		$(".Subject").last().children(".1").text(ClassesOld[i].Subject);
		$(".Subject").last().children(".2").text(ClassesOld[i].Grade);
		$(".Subject").last().children(".3").text(ClassesOld[i].Num);
		$(".Subject").last().css('color', ClassesOld[i].Text);
		$(".Subject").last().css('background-color', ClassesOld[i].Color);
		$(".Subject").draggable({
			start: function() {
				$(this).children(".EditIcon").hide();
				IconToggle($(this));
			},
			helper: function () {
	        return $(this).clone().appendTo('body').show();
		    }, 
		    scroll: false
		});
		for (var e in ClassesOld[i].Slots) {
			temp = $('#' + ClassesOld[i].Slots[e].Week).children('.' + ClassesOld[i].Slots[e].Day).children('#' + ClassesOld[i].Slots[e].Period);
			temp.append("<div class='SetSubject Box'><p class = '1' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '2' style = 'float:left'></p> <p style = 'float:left'>, </p> <p class = '3' style = 'float:left'></p></div>");
			temp.children().css('background-color', ClassesOld[i].Color);
			temp.children().children('.1').text(ClassesOld[i].Subject);
			temp.children().children('.2').text(ClassesOld[i].Grade);
			temp.children().children('.3').text(ClassesOld[i].Num);
			temp.children().css('color', ClassesOld[i].Text);
			temp.children().attr('data', ClassesOld[i].id);
		}
	}
	$(".SetSubject").draggable({
		revert: function( event, ui ) {
			var Distance = Math.sqrt(Math.pow(($(this).position().top),2) + Math.pow(($(this).position().left),2));
			if (Distance > 150) {
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
	$(".EditIcon").hide();
} 