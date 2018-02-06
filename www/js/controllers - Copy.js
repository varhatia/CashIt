angular.module('starter.controllers', ['starter.services'])
.controller('HomeCtrl', function($scope, $ionicModal, $stateParams, $rootScope, $ionicLoading, $state, ListShops, ListOffers, CustomerService, $timeout) {
    console.log('HomeCtrl');
    
	//get the current coordinates of user 
	var maxAge = 3000, timeout = 5000;

	var onSuccess = function(position) {
		var lat1 = position.coords.latitude;
		var lon1 = position.coords.longitude;

		window.localStorage.setItem('lat1', lat1);
		window.localStorage.setItem('lon1', lon1);

		console.log("latitude : "+lat1);
		console.log("longitude : "+lon1);

	};

	function onError(error) {
	}

	navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: false });

	$scope.offersList = [];
	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
	
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var additionalOffersList = ListOffers.query({lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			additionalOffersList.$promise.then(function(additionalOffersList) {

				if(additionalOffersList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(additionalOffersList.length != 0)
				{
					for(var i=0, size = additionalOffersList.length; i< size; i++){
						var tOffer = additionalOffersList[i];

						if(tOffer.category == "Baby Clothing")
						{
							tOffer.category = "Baby";
						}

						$scope.offersList.push(angular.fromJson(tOffer));
					}
					console.log("loadMore : initial index :"+initialIndex);	
					initialIndex = initialIndex+5;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			});
		}
		else
		{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
	}	
	
	var phoneNum = window.localStorage.getItem('mobile');
	if(phoneNum != null)
	{
		window.localStorage.setItem('digiCash', 100);
	}
	
    $scope.createOffer = function (offer, val) {
        var textToDisplay = "";
        var rows = offer.offers.split(";");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];

            var a = "<div class=\"row\"> <div class=\"col text-center\">";
            var b = row;
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;
        }

        document.getElementById(val).innerHTML=textToDisplay; 
    }

	$scope.goToShopOfOffer = function (offer) {
		window.localStorage.setItem('offerStoreName', offer.storeName);
		window.localStorage.setItem('offerMethod', offer.method);
		window.localStorage.setItem('offerAddress', offer.address);
		window.localStorage.setItem('offerOffers', offer.offers);
		$state.go('app.offer');
	}

	$scope.goToShop = function (shop) {
		window.localStorage.setItem('myplaceMethod', shop.method);
		window.localStorage.setItem('myplaceOffers', shop.offers);
		window.localStorage.setItem('myplaceStoreName', shop.storeName);
		window.localStorage.setItem('myplaceAddress', shop.address);
		$state.go('app.shop');
	}

	$scope.showAllBC = function (shop) {
		$state.go('app.bc');
	}

	$scope.showAllGroceries = function (shop) {
		$state.go('app.groceries');
	}

	$scope.showAllMedicine = function (shop) {
		$state.go('app.medicine');
	}

	$scope.showAllApparael = function (shop) {
		$state.go('app.apparael');
	}

	$scope.goToDigiCash = function (shop) {
		$state.go('app.digicash');
	}

	$scope.goToMyPlace = function (shop) {
		$state.go('app.myplace');
	}
})

.controller('MyPlaceCtrl', function($scope, $ionicModal, $state, ListShops, $ionicLoading) {
	var phoneNum = window.localStorage.getItem('mobile');
	if(phoneNum == null)
	{
		$state.go('app.login');
	}
	else
	{
		$ionicLoading.show({
			template: 'Getting Your Details!!!'
		});
	}
	console.log('MYPlaceCtrl');
    
	
	$scope.groceriesList = [];
	$scope.medicineList = [];
	$scope.apparaelList = [];
	$scope.bcList = [];
	
	
	console.log("Phone Num :"+phoneNum);
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);
	
	var digiCash = window.localStorage.getItem('digiCash');
	console.log("DigiCash :"+digiCash);
	$scope.digiCash = digiCash;
	$scope.nextDigiCash = 500-digiCash;
	
	$scope.newUser = false;
	
	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
	
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var shopList = ListShops.query({custId: custId, lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			shopList.$promise.then(function(shopList) {
				$ionicLoading.hide();

				if(shopList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					if(initialIndex == 0)
					{
						$scope.newUser = true;	
					}
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(shopList.length != 0)
				{
					for(var i=0, size = tempShopList.length; i< size; i++){
						var tShop = tempShopList[i];

						if(tShop.category == "Groceries")
						{
							$scope.groceriesList.push(angular.fromJson(tShop));
						}
						if(tShop.category == "Medicine")
						{
							$scope.medicineList.push(angular.fromJson(tShop));
						}
						if(tShop.category == "Apparael")
						{
							$scope.apparaelList.push(angular.fromJson(tShop));
						}
						if(tShop.category == "Baby Clothing")
						{
							tShop.category = "Baby";
							$scope.bcList.push(angular.fromJson(tShop));
						}
					}
					console.log("loadMore : initial index :"+initialIndex);	
					initialIndex = initialIndex+5;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			})
		}
		else
		{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
	}

    $scope.createOffer = function (offer, val) {
        var textToDisplay = "";
        var rows = offer.offers.split(";");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];

            var a = "<div class=\"row\"> <div class=\"col text-center\">";
            var b = row;
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;
        }

        document.getElementById(val).innerHTML=textToDisplay; 
    }

	$scope.goToShop = function (shop) {
		window.localStorage.setItem('myplaceMethod', shop.method);
		window.localStorage.setItem('myplaceOffers', shop.offers);
		window.localStorage.setItem('myplaceStoreName', shop.storeName);
		window.localStorage.setItem('myplaceAddress', shop.address);
		$state.go('app.shop');
	}

	$scope.goToDigiCash = function (shop) {
		$state.go('app.digicash');
	}
})

.controller('OfferPlaceCtrl', function($scope, $state, $stateParams, Place, $rootScope) {
	
	$scope.placeList = [];

	$scope.storeName = window.localStorage.getItem('offerStoreName');
	
	$scope.createCashBack = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col col-50 text-center\"><b>Bill Range</b></div> <div class=\"col col-50 text-center\"><b>% Cashback</b></div>	</div>";
        var rows = window.localStorage.getItem('offerMethod').split(",");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];
            //split the row
            var tokens = row.split("=>");

            var a = "<div class=\"row\"> <div class=\"col col-50 text-center\">";
            var b = tokens[0];
            var c = "</div> <div class=\"col col-50 text-center\">";
            var d = tokens[1];
            var e = "</div></div>";
            textToDisplay = textToDisplay+a+b+c+d+e;
        }

        document.getElementById("Method").innerHTML=textToDisplay; 
    }

    $scope.createOffer = function () {
        var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Offers</b></div></div>";
        var rows = window.localStorage.getItem('offerOffers').split(";");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];

            var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
            var b = row;
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;
        }

        document.getElementById("Offer").innerHTML=textToDisplay; 
    }
	
	$scope.createAddress = function (shop) {
		var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Address</b></div></div>";
        
            var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
            var b = window.localStorage.getItem('offerAddress');
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;

        document.getElementById("Address").innerHTML=textToDisplay; 
    }

	$scope.uploadBill = function (){
    	$state.go('app.uploadBill');
	}
	
})

.controller('GroceriesCtrl', function($scope, $state, ListPlaces) {
	$scope.placesList = [];
	var tPlacesList = ListPlaces.query({type: 'Groceries'});// change here
	tPlacesList.$promise.then(function(tPlacesList) {

		for(var i=0, size = tPlacesList.length; i< size; i++){
			var tShop = tPlacesList[i];
				console.log(tShop);
			$scope.placesList.push(angular.fromJson(tShop));
		}
	})
	
	$scope.goToPlace = function (shop) {
		window.localStorage.setItem('placeMethod', shop.method);
		window.localStorage.setItem('placeOffers', shop.offers);
		window.localStorage.setItem('placeName', shop.storeName);
		window.localStorage.setItem('placeAddress', shop.address);
		
		$state.go('app.place');
	}
})

.controller('MedicineCtrl', function($scope, $state, $ionicHistory, $stateParams, ListPlaces, $rootScope) {
	$scope.placesList = [];
	var tPlacesList = ListPlaces.query({type: 'Medicine'});// change here
	tPlacesList.$promise.then(function(tPlacesList) {

		for(var i=0, size = tPlacesList.length; i< size; i++){
			var tShop = tPlacesList[i];
				console.log(tShop);
			$scope.placesList.push(angular.fromJson(tShop));
		}
	})
	
	$scope.goToPlace = function (shop) {
		window.localStorage.setItem('placeMethod', shop.method);
		window.localStorage.setItem('placeOffers', shop.offers);
		window.localStorage.setItem('placeName', shop.storeName);
		window.localStorage.setItem('placeAddress', shop.address);

		$state.go('app.place');
	}
})

.controller('ApparaelCtrl', function($scope, $state, $ionicHistory, $stateParams, ListPlaces, $rootScope) {
	$scope.placesList = [];
	var tPlacesList = ListPlaces.query({type: 'Apparel'});// change here
	tPlacesList.$promise.then(function(tPlacesList) {

		for(var i=0, size = tPlacesList.length; i< size; i++){
			var tShop = tPlacesList[i];
				console.log(tShop);
			$scope.placesList.push(angular.fromJson(tShop));
		}
	})

	$scope.goToPlace = function (shop) {
		window.localStorage.setItem('placeMethod', shop.method);
		window.localStorage.setItem('placeOffers', shop.offers);
		window.localStorage.setItem('placeName', shop.storeName);
		window.localStorage.setItem('placeAddress', shop.address);

		$state.go('app.place');
	}
})

.controller('BCCtrl', function($scope, $state, $ionicHistory, $stateParams, ListPlaces, $rootScope) {
	$scope.placesList = [];
	var tPlacesList = ListPlaces.query({type: 'Baby Clothing'});// change here
	tPlacesList.$promise.then(function(tPlacesList) {

		for(var i=0, size = tPlacesList.length; i< size; i++){
			var tShop = tPlacesList[i];
				console.log(tShop);
			$scope.placesList.push(angular.fromJson(tShop));
		}
	})

	$scope.goToPlace = function (shop) {
		window.localStorage.setItem('placeMethod', shop.method);
		window.localStorage.setItem('placeOffers', shop.offers);
		window.localStorage.setItem('placeName', shop.storeName);
		window.localStorage.setItem('placeAddress', shop.address);

		$state.go('app.place');
	}
})


.controller('PlaceCtrl', function($scope, $state, $stateParams) {
    console.log('PlaceCtrl');

	$scope.storeName = window.localStorage.getItem('placeName');
	
	$scope.createCashBack = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col col-50 text-center\"><b>Bill Range</b></div> <div class=\"col col-50 text-center\"><b>% Cashback</b></div>	</div>";
        var rows = window.localStorage.getItem('placeMethod').split(",");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];
            //split the row
            var tokens = row.split("=>");

            var a = "<div class=\"row\"> <div class=\"col col-50 text-center\">";
            var b = tokens[0];
            var c = "</div> <div class=\"col col-50 text-center\">";
            var d = tokens[1];
            var e = "</div></div>";
            textToDisplay = textToDisplay+a+b+c+d+e;
        }

        document.getElementById("Method").innerHTML=textToDisplay; 
    }

    $scope.createOffer = function () {
        var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Offers</b></div></div>";
        var rows = window.localStorage.getItem('placeOffers').split(";");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];

            var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
            var b = row;
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;
        }

        document.getElementById("Offer").innerHTML=textToDisplay; 
    }
	
	$scope.createAddress = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Address</b></div></div>";

		var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
		var b = window.localStorage.getItem('placeAddress');
		var c = "</div></div>";
		textToDisplay = textToDisplay+a+b+c;

        document.getElementById("Address").innerHTML=textToDisplay; 
    }

	$scope.uploadBill = function (){
    	$state.go('app.uploadBill');
	}
})

.controller('ShopCtrl', function($scope, $state, $stateParams, $rootScope) {

	$scope.storeName = window.localStorage.getItem('myplaceStoreName');
	
	$scope.createCashBack = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col col-50 text-center\"><b>Bill Range</b></div> <div class=\"col col-50 text-center\"><b>% Cashback</b></div>	</div>";
        var rows = window.localStorage.getItem('myplaceMethod').split(",");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];
            //split the row
            var tokens = row.split("=>");

            var a = "<div class=\"row\"> <div class=\"col col-50 text-center\">";
            var b = tokens[0];
            var c = "</div> <div class=\"col col-50 text-center\">";
            var d = tokens[1];
            var e = "</div></div>";
            textToDisplay = textToDisplay+a+b+c+d+e;
        }

        document.getElementById("Method").innerHTML=textToDisplay; 
    }

    $scope.createOffer = function () {
        var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Offers</b></div></div>";
        var rows = window.localStorage.getItem('myplaceOffers').split(";");

        for(var i=0; i<rows.length; i++)
        {
            var row = rows[i];

            var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
            var b = row;
            var c = "</div></div>";
            textToDisplay = textToDisplay+a+b+c;
        }

        document.getElementById("Offer").innerHTML=textToDisplay; 
    }
	
	$scope.createAddress = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Address</b></div></div>";

		var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
		var b = window.localStorage.getItem('myplaceAddress');
		var c = "</div></div>";
		textToDisplay = textToDisplay+a+b+c;

        document.getElementById("Address").innerHTML=textToDisplay; 
    }

	$scope.uploadBill = function (){
    	$state.go('app.uploadBill');
	}
})

.controller('LoginController', function ($scope, $ionicModal, $ionicLoading, $ionicHistory, $state, UserService, CustomerService) {
	console.log('Login Controller Initialized');


	$scope.signup = function (){
    	$state.go('app.signup');
	}

    $scope.signin = function (user){
    	console.log("Params number 1 : " + user.mobile);
		console.log("Params number 2 : " + user.pwdForLogin);
		
		if (user && user.mobile && user.pwdForLogin) {
			$ionicLoading.show({
				template: 'Signing In...'
			});
   
			var customer = UserService.get({ phoneNumber: user.mobile, password: user.pwdForLogin });
			
			
			//check if getting promise
			customer.$promise.then(function(customer) {
				
				if(customer.$resolved)
				{
						$ionicLoading.hide();

						window.localStorage.setItem('mobile', user.mobile);
    					window.localStorage.setItem('id', customer.customerId);
    					window.localStorage.setItem('digiCash', customer.digiCash);
    					window.localStorage.setItem('loggedIn', true);
					
						console.log(window.localStorage.getItem('mobile'));
					
						$state.go('app.transferAccount');
				}
				else
				{
					alert("Customer not valid. Please try again.");	
				}
			}).catch(function (error) {
				console.log(error);
				alert("Seems you entered wrong values. Please try again.");
				$ionicLoading.hide();
			});
		} 
		else
		{
			alert("Please enter both mobile number and password");
		}
	};
	
})

.controller('SignUpController', function ($scope, $ionicModal, $ionicLoading, $state, UserService) {
	console.log('SignUp Controller Initialized');

	$scope.createUser = function (user) {
		if (user && user.mobile && user.password) {
			$ionicLoading.show({
				template: 'Signing Up...'
			});

			var customer = UserService.create({phoneNumber: user.mobile, password: user.password});
			customer.$promise.then(function() {
				console.log("responseReceived");
				alert("User created successfully!");
				$ionicLoading.hide();
				$state.go('app.login');
			});
		} 
		else
		{
			alert("Please fill all details");
		}
	};
})

.controller('SendBillController', function ($scope, $state, $cordovaCamera, $cordovaFileTransfer, $ionicLoading) {
	console.log('Send Bill Controller Initialized');
	
    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.FILE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            targetWidth: 300,
  			targetHeight: 300,
			encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageURI) {
			$scope.imgURI = imageURI;
        }, function(err) {
            
        });
    }
	
	$scope.SubmitPicture = function() {
		
		var tFileName = $scope.imgURI.substr($scope.imgURI.lastIndexOf('/')+1);
		var custId = window.localStorage.getItem('id');
		tFileName = custId+tFileName;
		var uploadOptions = {
			fileName: tFileName,
			params : { 'upload_preset': "ssfg84fm"}
		};

		console.log("options :"+uploadOptions);
		console.log("Image location :"+$scope.imgURI); //attach phone number

		$cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/hig6nxwqp/image/upload", $scope.imgURI, uploadOptions).then(function(result) {
			$ionicLoading.hide();
			console.log("SUCCESS Upload ");
			$state.go('app.main');
		}, function(err) {
			$ionicLoading.hide();
			$state.go('app.main');
			console.log("ERROR: " + JSON.stringify(err));
		}, function (progress) {
				$ionicLoading.show({
					template: 'Uploading the bill!!!'
				});
			console.log("Progress: " + JSON.stringify(progress));
		});
		console.log("Uploaded: ");
		$scope.imgURI = "";
	}
})

.controller('UploadBillController', function ($scope, $state) {
	console.log('Upload Bill Controller Initialized');
	

	$scope.goToWhatsApp = function() {
		cordova.plugins.Whatsapp.send("9663000399");
	}

	$scope.goToUploadBill = function (){
    	$state.go('app.sendBill');
	}

})

.controller('TransferAccountController', function ($scope, $state, $ionicLoading, UserAccountService) {
	console.log('Transfer Account Controller Initialized');
	

	$scope.skip = function() {
		$state.go('app.myplace');
	}

	$scope.submit = function (payment){
		$ionicLoading.show({
			template: 'Saving Ur Preference...'
		});

		var custId = window.localStorage.getItem('id');
		
		//create account string to update
		var paymentOption=payment.option;
		var paymentBankName=payment.bankName;
		var paymentAccountNum=payment.accountNum;
		var paymentBranchName=payment.branchName;
		var paymentCityName=payment.cityName;
		var paymentAccount = paymentOption+";"+paymentBankName+";"+paymentAccountNum+";"+paymentBranchName+";"+paymentCityName;
		
    	var customer = UserAccountService.create({custId: custId, account: paymentAccount});
		customer.$promise.then(function(customer) {
				$ionicLoading.hide();
					
				if(customer.$resolved)
				{
					if(customer.result == "success")
					{
						console.log("preference saved");
						$state.go('app.myplace');
					}
					else
					{
						console.log("CouldN't Save!!!");
						$state.go('app.transferAccount');	
					}
				}
				else
				{
					alert("Something wrong!!!");
					$state.go('app.transferAccount');	  
				}
		});
	}
})

.controller('MapController', function($scope, $ionicLoading) {
 
	$scope.showCoord = function() { 
		var maxAge = 3000, timeout = 5000;
		
		var onSuccess = function(position) {
			var lat1 = position.coords.latitude;
			var lon1 = position.coords.longitude;
			
//			lat1 = parseFloat(Math.round(lat1 * 100) / 100).toFixed(2);
			window.localStorage.setItem('lat1', lat1);
			window.localStorage.setItem('lon1', lon1);
	
			console.log("latituede : "+lat1);
			console.log("longitude : "+lon1);
			
		alert('Latitude: '          + position.coords.latitude          + '\n' +
			  'Longitude: '         + position.coords.longitude         + '\n');
		};

		function onError(error) {
    		alert('code: '    + error.code    + '\n' +
          		  'message: ' + error.message + '\n');
		}

//		navigator.geolocation.getCurrentPosition(onSuccess, function(error) {
//    		console.log("Failed to retrieve high accuracy position - trying to retrieve low accuracy");
//    		navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: maxAge, timeout: timeout, enableHighAccuracy: false });
//			}, { maximumAge: maxAge, timeout: timeout, enableHighAccuracy: true });
		
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: false });
	}
	
	

	// Latitude/longitude spherical geodesy formulae & scripts (c) Chris Veness 2002-2011                   - www.movable-type.co.uk/scripts/latlong.html 
	// where R is earth’s radius (mean radius = 6,371km);
	// note that angles need to be in radians to pass to trig functions!
	$scope.showDistance = function() {
		var R = 6371; // km
		var lat1 = window.localStorage.getItem('lat1');
		var lon1 = window.localStorage.getItem('lon1');
		//Test with dummy location
		var lat2 = 12.91501;
		var lon2 = 77.635208;
		var dLat = toRad(lat2-lat1);
		var dLon = toRad(lon2-lon1);
		var lat1 = toRad(lat1);
		var lat2 = toRad(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		
		console.log("Distance : "+d);
	}
	
	function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
	}
})

.directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};

                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                      '</div>'
        };
    });
