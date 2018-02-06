angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	if (window.cordova && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
})
  
//  $ionicPlatform.registerBackButtonAction(function (e) {
//		e.preventDefault();
//	}, 100); // 1 more priority than back button
//    // Override the android back button
//    $ionicPlatform.registerBackButtonAction(function () {
//        alert("View name"+$state.current.name);
//		if ($state.current.name == "main") {
//            // do something for this state
//        } else {
//            navigator.app.backHistory();
//        }
//    }, 100);	
})

.config(function($stateProvider, $urlRouterProvider) {
  	$stateProvider.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html'
	})

	.state('app.main', {
		cache: false,
		url: '/home',
		views: {
			'menuContent': {
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl',
			}
		}
//		,
//		params: {
//			'phoneNumber' : window.localStorage.getItem('mobile')
//		}
	})

	.state('app.myplace', {
		cache: false,
		url: '/myplace',
		views: {
			'menuContent': {
				templateUrl: 'templates/myplace.html',
				controller: 'MyPlaceCtrl',
			}
		}
	})
	
	.state('app.shop', {
		cache: false,
		url: '/shop',
		views: {
			'menuContent': {
			templateUrl: 'templates/shop.html',
			controller: 'ShopCtrl',
			}
		}
	})

	.state('app.place', {
		cache: false,
		url: '/place',
		views: {
			'menuContent': {
			templateUrl: 'templates/place.html',
			controller: 'PlaceCtrl',
			}
		}
	})

	.state('app.offer', {
		cache: false,
		url: '/offerPlace',
		views: {
			'menuContent': {
				templateUrl: 'templates/offerplace.html',
				controller: 'OfferPlaceCtrl',
			}
		}
	})

	.state('app.bc', {
		url: '/bc',
			views: {
			'menuContent': {
				templateUrl: 'templates/bc.html',
				controller: 'BCCtrl',
			}
		}
	})

	.state('app.groceries', {
		url: '/groceries',
		views: {
			'menuContent': {
				templateUrl: 'templates/groceries.html',
				controller: 'GroceriesCtrl',
			}
		}
	})

	.state('app.apparael', {
		url: '/apparael',
		views: {
			'menuContent': {
				templateUrl: 'templates/apparael.html',
				controller: 'ApparaelCtrl'
			}
		}
	})

	.state('app.medicine', {
		url: '/medicine',
		views: {
			'menuContent': {
			templateUrl: 'templates/medicine.html',
			controller: 'MedicineCtrl'
			}
		}
	})

	// State to represent Login View
	.state('app.signup', {
		url: '/signup',
	  	views: {
			'menuContent': {
				templateUrl: 'templates/signup.html',
				controller: 'SignUpController'
			}
		}
	})

	.state('app.login', { //state for showing single movie
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html',
				controller: 'LoginController'
			}
		}
	})

	.state('app.sendBill', {
		url: '/sendBill',
		views: {
			'menuContent': {
				templateUrl: 'templates/sendBill.html',
				controller: 'SendBillController'
			}
		}
	})

	.state('app.uploadBill', {
		url: '/uploadBill',
		views: {
			'menuContent': {
				templateUrl: 'templates/uploadBill.html',
				controller: 'UploadBillController'
			}
		}
	})

	.state('app.digicash', {
		cache: false,
		url: '/digicash',
		views: {
			'menuContent': {
				templateUrl: 'templates/digicash.html',
				controller: 'DigiCashController'
			}
		}
	})

	.state('app.transferAccount', {
		cache: false,
		url: '/transferAccount',
		views: {
			'menuContent': {
				templateUrl: 'templates/transferAccount.html',
				controller: 'TransferAccountController'
			}
		}
	})

	.state('app.howitworks', {
		cache: false,
		url: '/howitworks',
		views: {
			'menuContent': {
				templateUrl: 'templates/howitworks.html',
				controller: 'HowItWorksController'
			}
		}
	})

	.state('app.refer', {
		cache: false,
		url: '/refer',
		views: {
			'menuContent': {
				templateUrl: 'templates/refer.html',
				controller: 'ReferController'
			}
		}
	})

	.state('app.faq', {
		cache: false,
		url: '/faq',
		views: {
			'menuContent': {
				templateUrl: 'templates/faq.html',
			    controller: 'FaqController'	
			}
		}
	})

	.state('app.contact', {
		cache: false,
		url: '/contact',
		views: {
			'menuContent': {
				templateUrl: 'templates/contact.html',
				controller: 'ContactUsController'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	var phoneNum = window.localStorage.getItem('mobile');
	if(phoneNum == null)
	{
		$urlRouterProvider.otherwise('/app/login');
	}
	else
	{
		$urlRouterProvider.otherwise('/app/home');
	}
});
