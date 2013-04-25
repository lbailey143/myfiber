$(document).ready(function() {
	function getFiber() {
		$.ajax({
       type: "GET",
       url: "php/get-fiber.php",
       datatype: "json",
       async: false
      }).done(function(data) {
		   fiberdata = $.parseJSON(data);
	  });
	  return fiberdata;
	};
	
	function showFiberArtists() {
		var content = '<div id="fiberartistdisplay" class="tabbable">'; 
        content += '<ul class="nav nav-tabs">';
		$.each(fiberdata, function (index,value) {
			content += '<li><a href="#fiberartistname'+fiberdata[index].idfiberartist+'" data-toggle="tab">'+fiberdata[index].fiberartistname+'</a></li>';
		});  
        content += '</ul>';       
		content += '</div>';
		$("#fiberartist").html(content);
		$("#fiberartistdisplay ul li:first").addClass("active");
		showFiberGalleries();
		
		//**************************
		$('ul.nav-tabs a[data-toggle="tab"]').on('shown', function (e) {
 			$("#fiberartwork").html("");
		})
		//***************************************
	}
	
	
	function showFiberGalleries() {
		var content = '<div class="tab-content">';
		$.each(fiberdata, function (index, value) {
			 content += '<div class="tab-pane row" id="fiberartistname'+fiberdata[index].idfiberartist+'">';
			 if (fiberdata[index].fibergalleries) {
			 $.each(fiberdata[index].fibergalleries, function (index2, value2) { 
			      content += '<article class="span2 hero-unit">';
				  content += '<h4>'+fiberdata[index].fibergalleries[index2].galleryname+'</h4>';
				  content += '</article>';
				  
			 });
			 }
    	     content += '</div>';
		});
  		content += '</div>';
		$("#fiberartistdisplay").append(content);
		$("#fiberartistdisplay div.tab-content div.tab-pane:first").addClass("active");
		
		//***********************************
		$("article.galleryname").unbind('click');
		$("article.galleryname").click(function(e) {
			showFiberArtWorks($(this).attr('data-idfiberartist'),$(this).attr('data-idfibergallery'));
		});
		//*********************************
	}
	
	//***************************************************
	function showFiberArtWorks(idfiberartist,idfibergallery) {
		if (fiberdata[idfiberartist].fibergalleries[idfibergallery].fiberartworks) {
			var content = '<section data-idfiberartist='+idfiberartist+' data-idfibergallery='+idfibergallery+' class="tracks span12">';
			$.each(fiberdata[idfiberartist].fibergalleries[idfibergallery].fiberartworks,function(index,value) {
				content += '<article data-idfiberartwork='+index+'>'+value.fibertitle+'</article>';
			});
			
			$("#fiberartwork").html(content);
			content += "</section>";
		}};
//************************************	
	
		
	var fiberdata = getFiber();
	console.log(fiberdata);	
	showFiberArtists()  
});