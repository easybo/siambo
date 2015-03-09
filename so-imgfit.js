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
	var SPACE = " ";
	var NOTSET = "notset";
	var width = document.body.clientWidth;
	var className = "";
	var start = 0;
	var end = 0;
	// rep
	var rep = "";
	var REP_LENGTH = 5;
	var REPS = "reps-";
	var REPM = "repm-";
	var REPL = "repl-";
	var SRC_OLD = "src-old";
	var imageFile = "";
	// zoo
	var zoo = "";
	var ZOO_LENGTH = 5;
	var ZOOS = "zoos-";
	var ZOOM = "zoom-";
	var ZOOL = "zool-";
	var WIDTH_OLD = "width-old";
	var percent = 0;
	var zoowidth = 0;
	// cro
	var cro = "";
	var CRO_LENGTH = 5;
	var CROS = "cros-";
	var CROM = "crom-";
	var CROL = "crol-";
	var MARGIN_TOP_OLD = "margin-top-old";
	var MARGIN_LEFT_OLD = "margin-left-old";
	var tlwh = "";
	var tlwharray;
	
	//alert("width:" + width);
	if(width <= 480) {
		rep = REPS;
		zoo = ZOOS;
		cro = CROS;
	} else if (width > 480 && width <= 768) {
		rep = REPM;
		zoo = ZOOM;
		cro = CROM;
	} else {
		rep = REPL;
		zoo = ZOOL;
		cro = CROL
	}
	
	$('.so-imgfit').each(function() { 
		className = $(this).attr('class');
		//alert(className);
		
		// rep
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
			// if not find proper image file setting, use the backup one.
			if($(this).attr(SRC_OLD) != undefined) {
				$(this).attr("src", $(this).attr(SRC_OLD));
			}
		}
		
		// zoo
		start = className.indexOf(zoo);
		if(start != -1) {
			end = className.indexOf(SPACE, start);
			start += ZOO_LENGTH;
			if(end == -1)
				end = className.length;
			percent = className.substring(start, end) 
			//alert("[" + percent + "]");
			if($(this).attr(WIDTH_OLD) == undefined) {
				if($(this).attr("width") == undefined) 
					$(this).attr(WIDTH_OLD, NOTSET);
				else
					$(this).attr(WIDTH_OLD, $(this).attr("width"));
			}
			if(percent>=0 || percent <=100){
				zoowidth = width * percent / 100; 
				$(this).attr("width", zoowidth + "px");
			}
		} else {
			// if not find proper zoo setting, use the backup one.
			if($(this).attr(WIDTH_OLD) != undefined) {
				if($(this).attr(WIDTH_OLD) != NOTSET)
					$(this).attr("width", $(this).attr(WIDTH_OLD));
				else
					$(this).removeAttr("width");
			}
		}
		
		// crop
		start = className.indexOf(cro);
		if(start != -1) {
			end = className.indexOf(SPACE, start);
			start += CRO_LENGTH;
			if(end == -1)
				end = className.length;
			tlwh = className.substring(start, end);
			//alert("[" + tlwh + "]");
			tlwharray = tlwh.split('-');
			try {
				if(tlwharray[0]>=0 && tlwharray[1]>=0 && tlwharray[2]>=0 && tlwharray[3]>=0){
					// width, height
					if($(this).parent().attr('class') == "so-img-frame")
						$(this).unwrap();
					$(this).wrap('<div class="so-img-frame" style="width:' 
							+ tlwharray[2] + 'px;height:' + tlwharray[3] + 'px;overflow:hidden"></div>');
							
					// top
					if($(this).attr(MARGIN_TOP_OLD) == undefined) 
						$(this).attr(MARGIN_TOP_OLD, $(this).css("margin-top"));
					$(this).css("margin-top", "-" + tlwharray[0] + "px");
					
					// left
					if($(this).attr(MARGIN_LEFT_OLD) == undefined) 
						$(this).attr(MARGIN_LEFT_OLD, $(this).css("margin-left"));
					$(this).css("margin-left", "-" + tlwharray[1] + "px");
				}
			} catch(err) {}
		} else {
			// if not find proper crop setting, unwrap the frame div and use back margin-top, margin-left.
			if($(this).parent().attr('class') == "so-img-frame")
				$(this).unwrap();
			$(this).css("margin-top", $(this).attr(MARGIN_TOP_OLD));
			$(this).css("margin-left", $(this).attr(MARGIN_LEFT_OLD));
				
		}
	})
}
