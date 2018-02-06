var service = angular.module('starter.services', ['ngResource']);
service.factory('ListShops', function ($resource) {
      return $resource('https://powerful-waters-2088.herokuapp.com/ShopQuery/shops/:custId/:lat/:lon/:beginIndex/:numRes');
	//return $resource('http://127.0.0.1:8080/DigiCashBackend/ShopQuery/shops/:custId/:lat/:lon/:beginIndex/:numRes');
})

service.factory('ListPlaces', function ($resource) {
	  return $resource('https://powerful-waters-2088.herokuapp.com/OfferQuery/offers/:custId/:type/:lat/:lon/:beginIndex/:numRes');
//	return $resource('http://127.0.0.1:8080/DigiCashBackend/OfferQuery/offers/:custId/:type/:lat/:lon/:beginIndex/:numRes');
})

service.factory('ListOffers', function ($resource) {
    return $resource('https://powerful-waters-2088.herokuapp.com/OfferQuery/offers/:custId/:lat/:lon/:beginIndex/:numRes');
//	return $resource('http://127.0.0.1:8080/DigiCashBackend/OfferQuery/offers/:custId/:lat/:lon/:beginIndex/:numRes');
})

service.factory("UserService", function ($resource) {
	  return $resource('https://powerful-waters-2088.herokuapp.com/UserService/users/:phoneNumber/:password', {}, {
//		return $resource('http://127.0.0.1:8080/DigiCashBackend/UserService/users/:phoneNumber/:password', {}, {
	  		create: { method: 'POST', params: {phoneNumber: '@phoneNumber', password: '@password'}}	
	  });
})

service.factory("ReferService", function ($resource) {
	  return $resource('https://powerful-waters-2088.herokuapp.com/UserService/referrals/:custId/:phoneNumber/:name', {}, {
//		return $resource('http://127.0.0.1:8080/DigiCashBackend/UserService/referrals/:custId/:phoneNumber/:name', {}, {
	  		create: { method: 'POST', params: {custId: '@source', phoneNumber: '@phoneNumber', name: '@name'}}	
	  });
})

service.factory("UserAccountService", function ($resource) {
	  return $resource('https://powerful-waters-2088.herokuapp.com/UserService/userAccount/:custId/:account', {}, {
//		return $resource('http://127.0.0.1:8080/DigiCashBackend/UserService/userAccount/:custId/:account', {}, {
	  		create: { method: 'POST', params: {custId: '@custId', account: '@account'}}	
	  });
})

service.factory("CashBackService", function ($resource) {
	  return $resource('https://powerful-waters-2088.herokuapp.com/UserService/accountHistory/:custId', {}, {
//		return $resource('http://127.0.0.1:8080/DigiCashBackend/UserService/accountHistory/:custId');
	  });
})

service.factory('localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

service.factory('CustomerService', function() {
	
	return {
            isLoggedIn: function() {
                if(window.localStorage.getItem('loggedIn'))
				{
					return true;
				}
				else
				{
					return false;
				}
            }
        };
});

service.factory('cordova', function () {
  return {
	  test: function(){
		  	document.addEventListener("deviceready", onDeviceReady, false);
	  },
	  ready: function(){
		  //Save the world!
	  }
  }
});

function onSuccess(position) {
			var lat1 = position.coords.latitude;
			var lon1 = position.coords.longitude;

			window.localStorage.setItem('lat1', lat1);
			window.localStorage.setItem('lon1', lon1);

			alert("service latitude : "+lat1);
			alert("service longitude : "+lon1);

}

function onError(error) {

}

function onDeviceReady() {
    console.log("navigator.geolocation works well");
}

service.factory('LocationService', function($q) {
    
    var latLong = null;
    
    var getLatLong = function(refresh) {
        
        var deferred = $q.defer();
        
        if( latLong === null || refresh ) {
        
            console.log('Getting lat long');
            navigator.geolocation.getCurrentPosition(function(pos) {
                console.log('Position=')
                console.log(pos);
                latLong =  { 'lat' : pos.coords.latitude, 'long' : pos.coords.longitude } 
                window.localStorage.setItem('lat1', pos.coords.latitude);
				window.localStorage.setItem('lon1', pos.coords.longitude);
				deferred.resolve(latLong);

            }, function(error) {
                console.log('Got error!');
                console.log(error);
                
				if(window.localStorage.getItem('lat1') == null)
				{
					deferred.reject('Unable to get yout location');
				}
				else
				{
					//read from local storage
					latLong =  { 'lat' : window.localStorage.getItem('lat1'), 'long' : window.localStorage.getItem('lon1')} 
                	console.log(latLong);
					deferred.resolve(latLong);
				}
				
				//deferred.reject('Unable to get yout location')

            }, {enableHighAccuracy: true, maximumAge:60000, timeout:5000});
            
        }  else {
            deferred.resolve(latLong);
        }
        
        return deferred.promise;

    };      
    
    return {
        
        getLatLong : getLatLong
        
    }
})

function getFaq() {
    var textToDisplay = "<div class=\"row\"><div class=\"col item-text-wrap\" align=\"left\">Step 1: Sign in to the app and browse through the latest amazing deals from the our partner merchants in your locality</div></div><div class=\"row\"><div class=\"col item-text-wrap\" align=\"left\">Step 2: Visit our partner merchant and do the transaction. </div></div><div class=\"row\"><div class=\"col item-text-wrap\" align=\"left\">Step 3: Share your bill within 12 hours of bill generation either by using upload option or on whatsApp. That's it.</div></div>";
var x = createAnswer(textToDisplay);
	return [{

		"Question": "How do I use the app ? What do I do with XXX app?",
        "Answer": x,
	},
    {
        "Question": "Baby",
        "Answer": "A",
    },
//    {
//        "Question": "Apparel",
//        "Answer": "A",
//    },
//    {
//        "Question": "Retail",
//        "Answer": "A",
//    },
//    {
//        "Question": "Retail",
//        "Answer": "A",
//    },
]};


function createAnswer(textToDisplay) {
	var d = document.createElement('div');
		d.innerHTML = textToDisplay;
		return d.innerHTML;	
}

function getDummyData() {
    return [{
        "Category": "Retail",
        "Store": "A",
        "Cash": "20",
        "Id" : "1",
        "Method" : "0-200 => 0, 201 - 500 => 1%, 501 - 1000 => 2%, 1001 - 1500 => 3%, 1501 - 2000 => 4%, 2001 - 3000 => 5%, 3000+ => 6%",
        "Offers" : "1. Buy 1 Mammy Pogo Pants in 499/-. Market Price 699/-.; 2. Buy Ashirwad Atta (10 kg.) in 280/-. Market Price 350/-."
    },
    {
        "Category": "Pub & Bar",
        "Store": "B",
        "Cash": "220",
        "Id" : "2",
        "Method" : "0-200 => 0, 201 - 500 => 1%, 501 - 1000 => 2%, 1001 - 1500 => 3%, 1501 - 2000 => 4%, 2001 - 3000 => 5%, 3000+ => 6%",
        "Offers" : "1. Buy 2 Mammy Pogo Pants in 499/-. Market Price 699/-.; 2. Buy Ashirwad Atta (10 kg.) in 280/-. Market Price 350/-."
    },
    {
        "Category": "Retail",
        "Store": "C",
        "Cash": "210",
        "Id" : "3",
        "Method" : "0-200 => 0, 201 - 500 => 1%, 501 - 1000 => 2%, 1001 - 1500 => 3%, 1501 - 2000 => 4%, 2001 - 3000 => 5%, 3000+ => 6%",
        "Offers" : "1. Buy 3 Mammy Pogo Pants in 499/-. Market Price 699/-.; 2. Buy Ashirwad Atta (10 kg.) in 280/-. Market Price 350/-."
    },
    {
        "Category": "Fast Food Joints",
        "Store": "Y",
        "Cash": "120",
        "Id" : "4",
        "Method" : "0-200 => 0, 201 - 500 => 1%, 501 - 1000 => 2%, 1001 - 1500 => 3%, 1501 - 2000 => 4%, 2001 - 3000 => 5%, 3000+ => 6%",
        "Offers" : "1. Buy 4 Mammy Pogo Pants in 499/-. Market Price 699/-.; 2. Buy Ashirwad Atta (10 kg.) in 280/-. Market Price 350/-."
    },
    {
        
        "Category": "Baby Shop",
        "Store": "A21",
        "Cash": "70",
        "Id" : "5",
        "Method" : "0-200 => 0, 201 - 500 => 1%, 501 - 1000 => 2%, 1001 - 1500 => 3%, 1501 - 2000 => 4%, 2001 - 3000 => 5%, 3000+ => 6%",
        "Offers" : "1. Buy 5 Mammy Pogo Pants in 499/-. Market Price 699/-.; 2. Buy Ashirwad Atta (10 kg.) in 280/-. Market Price 350/-."
    },
]};