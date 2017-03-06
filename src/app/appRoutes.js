import components from 'components';

module.exports = function ($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state(angular.extend({ name: 'home', url: '/' }, components.home));
}