'use strict';

angular.module('hyenaTimeclocks')
.controller('MainCtrl', function($scope, $ionicModal, $timeout, $cordovaLocalNotification) {
	$scope.viewData = {
		beaconData: [],
		ranging: false
	};

	$scope.consoleLog = function() {
		console.log('Hello!');

		$cordovaLocalNotification.add({
	      id: 'some_notification_id',
	      title: "Here's a notification!",
	      at: null
	    }).then(function () {
	      console.log('callback for adding background notification');
	    });
	};

	$scope.toggleRanging = function () {
		if($scope.viewData.ranging) {
			// estimote.beacons.stopRangingBeaconsInRegion({}, function(response) {
			// 	console.log('Stopped Ranging');
			// 	$scope.viewData.beaconData = [];
			// 	$scope.viewData.ranging = false;
			// 	$scope.$apply();
			// });

			estimote.beacons.stopMonitoringForRegion({},
		    function(result) {
		    	console.log('Stopped Monitoring');
		    	$scope.viewData.ranging = false;
		    	$scope.viewData.beaconData = [];
			 	$scope.$apply();
		    },
		    function(result) {

		    });

		}
		else
		{
			console.log('Monitoring!');
			// estimote.beacons.startRangingBeaconsInRegion({}, function(result) {
			// 	$scope.viewData.ranging = true;
			// 	$scope.viewData.beaconData = result.beacons;
			// 	console.log('*** Beacons Ranged! ***');
			// 	console.log(result);
			// 	$scope.$apply();
			// 	//estimote.beacons.printObject(result);
			// }, function(errorMessage) {
			// 	console.log('Ranging error: ', errorMessage);
		 //    });
			estimote.beacons.startMonitoringForRegion({},
		    function(result) {
		    	$scope.viewData.ranging = true;
		    	$scope.viewData.beaconData = result;
		    	console.log(result.state);
		    	$scope.$apply();

		    	$cordovaLocalNotification.add({
			      id: 'some_notification_id',
			      title: "Region state changed: " + result.state
			      // parameter documentation:
			      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
			    }).then(function () {
			      console.log('callback for adding background notification');
			    });

		    },
		    function(result) {
		    	console.log('Error', result);
		    });
		}
	};

	var onBeaconsRanged = function(beacons) {

	};
});