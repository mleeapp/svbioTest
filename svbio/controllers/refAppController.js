angular.module("refApp")
	.constant("dataUrl", "data/reference.json")
	.controller("refAppCtrl", function($scope, $http, dataUrl) {
		$scope.data= {};

		$http.get(dataUrl)
			.success(function (data) {
				adjustText(data.text);
			})
			.error(function (error) {
				$scope.data.error = error;
			});

		function adjustText(text) {
			var newText = text.replace(/™/g, "\u2122");
			var newTextArray = [];
			var references = [];
			var textArray = newText.split(']');
			for (var i = 0; i < textArray.length; i++) {
				var index = textArray[i].indexOf('[');
				if (index > -1) {
					var refString = textArray[i].substring(index+1, textArray[i].length);
					var properties = refString.split(',');
					references[i] = {};
					properties.forEach(function(property) {
						var keyValue = property.split(':');
						references[i].number = i + 1;
						references[i][keyValue[0]] = keyValue[1];
					});
					newTextArray[i] = textArray[i].substring(0, index-1) + '[' + (i+1) + ']';
				}
				else {
					newTextArray[i] = textArray[i]
				}
			}
			$scope.data.text = newTextArray.join(' ');
			$scope.data.references = references;
		}
});