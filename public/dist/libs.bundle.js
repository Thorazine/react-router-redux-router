// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
if(location.host == 'localhost') { document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>') }


var oldStates = [];
var initState = {
	text: 'blaaat',
}

function setGlobalState(state) {
	// save the old state
	oldStates.push(initState);
	initState = state;
}







// Request to api with fallback to other clusters

// prepare the call

var request = function(url, type, data) {
	return Q.Promise(function(response, error) {
		url = (typeof url === "undefined") ? 'test' : url;
		type = (typeof type === "undefined") ? 'GET' : type;
		data = (typeof data === "undefined") ? {} : data;

		runRequest(baseUrlApi + url, type, data).then(function(successReq) {
			response(successReq);
		}, function(errorReq) {
			error(errorReq);
		});
	});
}


// run the requests
var runRequest = function(connectUrl, type, data) {
	return Q.Promise(function(successReq, errorReq) {

		jQuery.ajax({
	        url: connectUrl,
	        type: type,
	        cache: false,
	    	data: data,
			success: function(data){
		        successReq({
					success: true,
					error: false,
					data: data
				});
		    },
		    statusCode: {
			    404: function() {
			      	errorReq({ success: false, error: '404: Not found', data: null });
			    },
			    403: function() {
			      	successReq({ success: false, error: 'You are not logged in. Redirecting', data: null });
			    },
			    401: function() {
			      	errorReq({ success: false, error: '401: Credentials incorrect', data: null });
			    },
			    400: function() {
			       console.log('bad request');
			    },
			    500: function() {
			    	errorReq({ success: false, error: '500: Internal server error', data: null });
			    },
			    501: function() {
			    	errorReq({ success: false, error: '501: Gateway Timeout', data: null });
			    },
			    503: function() {
			    	errorReq({ success: false, error: '503: Not availible', data: null });
			    },
			    504: function() {
			    	errorReq({ success: false, error: '504: Gateway Timeout', data: null });
			    }
		  	},
		  	error: function() {
		  		errorReq({ success: false, error: 'something went wrong', data: null });
			}
	  	});
	});
}


//# sourceMappingURL=libs.bundle.js.map
