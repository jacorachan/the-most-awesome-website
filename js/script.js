/* Author: Jose A. Corachan

*/
SETTINGS_UPDATED = false;

//Tooltips
$('.ttip').find('a').tooltip();


//This will load the file "top-signed-in.html"
function signedInLoad(){
	//We update the Login info
	$('.header-login').off().fadeOut('fast',signedInAjaxLoad());
	
	//Load signed in panel on top
	function signedInAjaxLoad(){
		//Put the spinner!
		//<div class="loading"><p>Loading, please wait...</p></div>
		
		//Ajax call
		TMAWajax({
			url: "include/top-signedin.html", 
			success: function(data) {
				console.log("success!")
				$('.loading')
					.stop()
					.activity(false)
					.hide()
					.promise()
					.done(ajaxLoaded(data));
			}
		});
		
		//Load the content into the DOM
		function ajaxLoaded(data){
			$('.header-login').fadeIn('slow').html(data);
		}
	}
};

//This will load the file "email-sent.html"
function logedHomeLoad(){
	//We update the Login info
	$('#pageContent').off().fadeOut('fast',logedHomeAjaxLoad());
	
	//Load signed in panel on top
	function logedHomeAjaxLoad(){
		//Put the spinner!
		//<div class="loading"><p>Loading, please wait...</p></div>
		
		//Ajax call
		TMAWajax({
			url: "include/loged-home.html", 
			success: function(data) {
				$('.loading')
					.stop()
					.activity(false)
					.hide()
					.promise()
					.done(ajaxLoaded(data));
			}
		});
		
		//Load the content into the DOM
		function ajaxLoaded(data){
			$('#pageContent').fadeIn('slow').html(data);
		}
	}
};


function TMAWajax(params) {

	var settings = $.extend({
		url: "",
		dataType: "html",
		type: "GET",
		timeout: (5 * 10000),
		cache:    false,
		data: "",
		success: function(data) {
			$('.loading')
				.stop()
				.activity(false)
				.hide()
				.promise()
				.done($('#pageContent').fadeIn('slow').html(data));
		},
		complete: function() {}, 
		beforeSend: function() {
			$('.loading').show().activity({segments: 8, width:2, space: 0, length: 3, color: '#002c73', speed: 1.5});
		},
		errorMsgTimeout: "Timeout problem",
		errorPosition: '#pageContent'
	}, params),
	retries = 0;

	function ajaxRequest(){
		//$('#topBar .debug').text(settings.url);
		$.ajax({
			beforeSend: settings.beforeSend,
			url: settings.url,
			type: settings.type,
			data: settings.data,
			timeout: settings.timeout,
			dataType: settings.dataType,
			success: settings.success,
			complete: settings.complete,
			error: function( xhr, tStatus, err ) {
				if (xhr.readyState !== 4) {
					ajaxError("", settings.errorMsgTimeout, "", settings.errorPosition);
				} else {
					ajaxError( xhr.status, xhr.statusText, xhr.responseText, settings.errorPosition);
				}
				} // end error handler
		}); // end $.ajax()
	}; // end ajaxRequest()

	function ajaxError(status, statusText, responseText, where){
		if ($(where + ' .internalServerError').length) {
			$(where + ' .internalServerError').slideToggle(250).delay(6200).slideToggle(250);
		} else {
			$('#pageContent').show();
			var errorText = $(responseText).find('#errorPage').html();
			$(where).prepend(
					'<div class="internalServerError">' +
						'<div style="padding: 1.0em;" class="ui-state-error ui-corner-all">' +
						'<a href="#" class="btn close">Close this message</a>' + 
						errorText + 
						'</div>' +
					'</div>'
			);
		}

		//Close button
		$('.internalServerError .close').click(function(){
			$('.internalServerError').slideToggle(); 
		});
		return false;
	}

	// Call ajaxRequest function
	ajaxRequest();

	
};
