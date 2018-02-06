angular.module('starter.controllers', ['starter.services'])
.controller('HomeCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $ionicPlatform, $ionicHistory, $location, $state, ListOffers, CustomerService, cordova, LocationService) {
    console.log('HomeCtrl');
	var deregisterFirst = $ionicPlatform.registerBackButtonAction(
		function() {
			function showConfirm() {
				var confirmPopup = $ionicPopup.confirm({
					title: '<strong>Exit Cash-It App?</strong>',
					template: 'Are you sure you want to exit CashIt?'
				});

				confirmPopup.then(function(res) {
					if (res) {
						ionic.Platform.exitApp();
					}
				});
			}

			if($state.is('app.main')) {
					showConfirm();				
				}
			}, 100
		);
	$scope.$on('$destroy', deregisterFirst);	

	cordova.test();
	$scope.offersList = [];
	var initialIndex = 0;
    var listOver = false;
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);
	
	$scope.loadMore = function() {

		if(!listOver)
		{
			LocationService.getLatLong().then(
					function(latLong) {
						$scope.latLong = latLong;
						var lat1 = window.localStorage.getItem('lat1');
						var lon1 = window.localStorage.getItem('lon1');

						var additionalOffersList = ListOffers.query({custId: custId, lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
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
					},
					function(error) {
						alert(error);
					})
			}	
			else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
	}
	
	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerlat', shop.latitude);
		window.localStorage.setItem('offerlon', shop.longitude);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
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

.controller('GroceriesCtrl', function($scope, $state, ListPlaces) {
	$scope.placesList = [];
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);

	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
    var initialIndex = 0;
    var listOver = false;
	
	$scope.loadMore = function() {

		if(!listOver)
		{
			var tPlacesList = ListPlaces.query({custId: custId, type: 'Groceries', lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			tPlacesList.$promise.then(function(tPlacesList) {

				if(tPlacesList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(tPlacesList.length != 0)
				{
					for(var i=0, size = tPlacesList.length; i< size; i++){
						var tShop = tPlacesList[i];
						console.log(tShop);
						$scope.placesList.push(angular.fromJson(tShop));
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
	
	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
	}
})

.controller('MedicineCtrl', function($scope, $state, ListPlaces) {
	$scope.placesList = [];
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);

	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var tPlacesList = ListPlaces.query({custId: custId, type: 'Medicine', lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			tPlacesList.$promise.then(function(tPlacesList) {

				if(tPlacesList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(tPlacesList.length != 0)
				{
					for(var i=0, size = tPlacesList.length; i< size; i++){
						var tShop = tPlacesList[i];
						console.log(tShop);
						$scope.placesList.push(angular.fromJson(tShop));
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
	
	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
	}
})

.controller('ApparaelCtrl', function($scope, $state, ListPlaces) {
	$scope.placesList = [];
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);
	
	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var tPlacesList = ListPlaces.query({custId: custId, type: 'Apparel', lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			tPlacesList.$promise.then(function(tPlacesList) {

				if(tPlacesList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(tPlacesList.length != 0)
				{
					for(var i=0, size = tPlacesList.length; i< size; i++){
						var tShop = tPlacesList[i];
						console.log(tShop);
						$scope.placesList.push(angular.fromJson(tShop));
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
	
	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
	}
})

.controller('BCCtrl', function($scope, $state, ListPlaces) {
	$scope.placesList = [];
	
	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);

	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var tPlacesList = ListPlaces.query({custId: custId, type: 'Baby Clothing', lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			tPlacesList.$promise.then(function(tPlacesList) {

				if(tPlacesList.length == 0)
				{
					console.log("loadMore : initial index :"+initialIndex);
					listOver = true;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				else if(tPlacesList.length != 0)
				{
					for(var i=0, size = tPlacesList.length; i< size; i++){
						var tShop = tPlacesList[i];
						console.log(tShop);
						$scope.placesList.push(angular.fromJson(tShop));
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
	
	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
	}
})

.controller('MyPlaceCtrl', function($scope, $state, ListShops, $ionicLoading) {
	console.log('MyPlaceCtrl');

	var custId = window.localStorage.getItem('id');
	console.log("customer id :"+custId);
	
	var digiCash = window.localStorage.getItem('digiCash');
	console.log("DigiCash :"+digiCash);
	$scope.digiCash = digiCash;
	$scope.nextDigiCash = 500-digiCash;
	
	$scope.newUser = false;
	
	$scope.myPlaceList = [];
	var lat1 = window.localStorage.getItem('lat1');
	var lon1 = window.localStorage.getItem('lon1');
	
    var initialIndex = 0;
    var listOver = false;
	$scope.loadMore = function() {

		if(!listOver)
		{
			var shopList = ListShops.query({custId: custId, lat:lat1, lon:lon1, beginIndex: initialIndex, numRes:5});// change here
			shopList.$promise.then(function(shopList) {

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
					for(var i=0, size = shopList.length; i< size; i++){
						var tShop = shopList[i];

						if(tShop.category == "Baby Clothing")
						{
							tShop.category = "Baby";
						}
						$scope.myPlaceList.push(angular.fromJson(tShop));
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

	$scope.goToShop = function (shop) {
		window.localStorage.setItem('offerStoreName', shop.storeName);
		window.localStorage.setItem('offerMethod', shop.method);
		window.localStorage.setItem('offerAddress', shop.address);
		window.localStorage.setItem('offerOffers', shop.offers);
		window.localStorage.setItem('offerPhone', shop.phoneNum);
		$state.go('app.offer');
	}

	$scope.goToDigiCash = function (shop) {
		$state.go('app.digicash');
	}
})

.controller('OfferPlaceCtrl', function($scope, $state, $stateParams) {
	
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
	
	$scope.createAddress = function () {
		var textToDisplay = "<div class=\"row\"> <div class=\"col text-center\"><b>Address</b></div></div>";
        
            var a = "<div class=\"row\"> <div class=\"col text-center item-text-wrap\">";
            var b = window.localStorage.getItem('offerAddress');
            var c = "</div></div>";

		    var addressLongLat = window.localStorage.getItem('offerlat')+','+window.localStorage.getItem('offerlon');
			console.log("sho address"+addressLongLat);
			var d = "<div class=\"row\"><div class=\"col-50 text-center\"><button class=\"button button-balanced icon ion-ios-telephone\" onClick=call()> Call</button></div><div class=\"col-50 text-center\"><button class=\"button button-balanced icon ion-ios-location\" onClick=openMap("+addressLongLat+")> Map</button></div></div>";
			
            textToDisplay = textToDisplay+a+b+c+d;

            document.getElementById("Address").innerHTML=textToDisplay; 
    }

	openMap = function(latitude,longitude){
		var addressLongLat = latitude+','+longitude;
		window.open("http://maps.google.com/?q="+addressLongLat, '_system');
	}
	
	call = function(){
		var phone = window.localStorage.getItem('offerPhone');
		window.open("tel:"+phone);
	}

	$scope.uploadBill = function (){
    	$state.go('app.uploadBill');
	}
	
})

.controller('LoginController', function ($scope, $ionicLoading, $state, UserService, CustomerService) {
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

.controller('SignUpController', function ($scope, $ionicLoading, $state, UserService) {
	console.log('SignUp Controller Initialized');

	$scope.createUser = function (user) {
		if (user && user.mobile && user.password) {
			$ionicLoading.show({
				template: 'Signing Up...'
			});

			var customer = UserService.create({phoneNumber: user.mobile, password: user.password});
			customer.$promise.then(function(customer) {
				if(customer.result == "success")
				{
					console.log("responseReceived");
					alert("Congrats. Registeration Successful!!!");
					$ionicLoading.hide();
					$state.go('app.login');
				}
				else
				{
					console.log("CouldN't Sign Up!!!");
					alert("Oops. Something wrong. Please contact us!!!");
					$state.go('app.signup');	
				}
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

.controller('TransferAccountController', function ($scope, $state, $ionicPlatform, $ionicLoading, UserAccountService) {
	console.log('Transfer Account Controller Initialized');

	var deregisterFirst = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.transferAccount')) {
			$state.go('app.main');
		}
      }, 100
    );
    $scope.$on('$destroy', deregisterFirst);	
	
	$scope.skip = function() {
		$state.go('app.main');
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
						$state.go('app.main');
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

.controller('DigiCashController', function ($scope, $state, $ionicPlatform, CashBackService) {

	var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.digicash')) {
            //ionic.Platform.exitApp();
			$state.go('app.main');
          }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);

	var custId = window.localStorage.getItem('id');
	$scope.items = CashBackService.query({custId: custId});
	var digiCash = window.localStorage.getItem('digiCash');
	console.log("DigiCash :"+digiCash);
	$scope.digiCash = digiCash;
	$scope.nextDigiCash = 500-digiCash;

})

.controller('ReferController', function ($scope, $ionicLoading, $ionicPlatform, $state, ReferService) {
	console.log('Refer Controller Initialized');

	var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.refer')) {
            //ionic.Platform.exitApp();
			$state.go('app.main');
          }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);
	
	$scope.refer = function (user) {
		if (user && user.mobile && user.name) {
			$ionicLoading.show({
				template: 'Adding referral...'
			});

			
			var customer = ReferService.create({source: window.localStorage.getItem('id'), phoneNumber: user.mobile, name: user.name});
			customer.$promise.then(function(customer) {
				if(customer.result == "success")
				{
					console.log("responseReceived");
					alert("Congrats. Referral Successful!!!");
					$ionicLoading.hide();
					$state.go('app.refer');
				}
				else
				{
					console.log("CouldN't Add referral!!!");
					alert("Phone number already referred or exist as user!!!");
					$state.go('app.refer');	
				}
			});
		} 
		else
		{
			alert("Please fill all details");
		}
	};
})

.controller('ContactUsController', function ($scope, $state, $ionicPlatform) {
	console.log('Contact Us Controller Initialized');
	
	var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.contact')) {
            //ionic.Platform.exitApp();
			$state.go('app.main');
          }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);
	
	$scope.goToWhatsApp = function() {
		cordova.plugins.Whatsapp.send("9663000399");
	}
	
})

.controller('HowItWorksController', function ($scope, $state, $ionicPlatform) {
	console.log('Contact Us Controller Initialized');
	
	var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.howitworks')) {
            //ionic.Platform.exitApp();
			$state.go('app.main');
          }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);
})

.controller('FaqController', function ($scope, $state, $ionicPlatform) {
	$scope.items = getFaq();
	
	var deregisterSecond = $ionicPlatform.registerBackButtonAction(
      function() {
        if($state.is('app.faq')) {
            //ionic.Platform.exitApp();
			$state.go('app.main');
          }
      }, 100
    );
    $scope.$on('$destroy', deregisterSecond);

	$scope.toggleDetail = function($index,item) {
        $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    };	
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
