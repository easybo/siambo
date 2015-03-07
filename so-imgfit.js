/*------------------------------------------------------------------------
  so-imgfit - Response image fit solution
  ------------------------------------------------------------------------
  @Version	 0.0.1
  @Required	 jQuery library
  @Author    Siambo Team
  @Website   http://www.siambo.com
  @Copyright Copyright (C) 2014 - 2015 Siambo. All Rights Reserved.
  @License   GNU General Public License version 3, or later
------------------------------------------------------------------------*/
$(document).ready(function(){
	imageResizeChange();
});

$(window).resize(function(){
	imageResizeChange();
});

function imageResizeChange() {
	var rep = "";
	var REP_LENGTH = 5;
	var REPS = "reps-";
	var REPM = "repm-";
	var REPL = "repl-";
	var SPACE = " ";
	var SRC_OLD = "src-old";
	var width = document.body.clientWidth;
	var className = "";
	var start = 0;
	var end = 0;
	var imageFile = "";
	//alert("width:" + width);
	if(width <= 480) {
		rep = REPS;
	} else if (width > 480 && width <= 768) {
		rep = REPM;
	} else {
		rep = REPL;
	}
	
	$('.so-imgfit').each(function() { 
		className = $(this).attr('class');
		//alert(className);
		start = className.indexOf(rep);
		if(start != -1) {
			end = className.indexOf(SPACE, start);
			start += REP_LENGTH;
			if(end == -1)
				end = className.length;
			imageFile = className.substring(start, end) 
			//alert("[" + imageFile + "]");
			if($(this).attr(SRC_OLD) == undefined)
				$(this).attr(SRC_OLD, $(this).attr("src"));
			$(this).attr("src", imageFile);
		} else {
			if($(this).attr(SRC_OLD) != undefined) {
				$(this).attr("src") = $(this).attr(SRC_OLD);
			}
		}
	})
}
