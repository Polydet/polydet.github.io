'use strict';

let polydetApp = angular.module('polydetApp', []);

polydetApp.filter('max', function maxFilterFactory() {
    return function maxFilter(input, number) {
        return '' + Math.max(input, Number(number));
    };
});

polydetApp.filter('hex', function hexFilterFactory() {
    return function hexFilter(input) {
        return '0x' + Number(input).toString(16);
    };
});

polydetApp.controller('ScannerController', ['$scope', '$http', function ScannerController($scope, $http) {
    $scope.results = [];
    $scope.submit = function submit() {
        let element = document.getElementById('analyseFileInput');
        let files = element.files;

        if (files.length === 0) {
            return
        }

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file[]', files[i]);
        }

        $http.post('https://polyglotdetector.juliencampion.net/api/analysis', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then((response) => {
            console.debug(response);

            $scope.results = response.data;

            // Clear input
            element.value = '';
            $(element).next('.custom-file-label').text('Choose file');
        }, (response) => {
            console.error(response);
        });
    }
}]);
