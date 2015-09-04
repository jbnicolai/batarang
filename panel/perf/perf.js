'use strict';

angular.module('batarang.app.perf', []).
  controller('PerfController', ['$scope', 'inspectedApp', PerfController]);

function PerfController($scope, inspectedApp) {
  $scope.perf = inspectedApp.perf;
  $scope.app = inspectedApp;

  $scope.lastDigestTime = 0;

  $scope.$on('scope:digest', function (e, d) {
    console.log('root broadcast', e, d);
    $scope.lastDigestTime = d.time;
    var reducedWatches = d.events.reduce(function (prev, next) {
      // console.log(next);
      if (!prev[next.watch]) {
        prev[next.watch] = next.time;
      } else {
        prev[next.watch] += next.time;
      }
      return prev;
    }, {});
    $scope.watchTimings = Object.keys(reducedWatches)
    .map(function (key) {
      return {
        text: key.trim().replace(/\s{2,}/g, ' '),
        time: reducedWatches[key]
      };
    })
    .sort(function (a, b) {
      return b.time - a.time;
    });
  });

  // $scope.$watch('perf', function (n, o) {
  //   console.log('perf watch', n, o);
  // });

  // $scope.watch = inspectedApp.watch;
  // $scope.inspect = function (path) {
  //   inspectedApp.watch($scope.inspectedScope, path);
  // };
  // $scope.assign = function (path, value) {
  //   inspectedApp.assign($scope.inspectedScope, path, value);
  // };

  // $scope.inspectedScope = null;

  // $scope.$on('refresh', function () {
  //   $scope.inspectedScope = null;
  // });

  // // expand models the fist time we inspect a scope
  // var cancelWatch = $scope.$watch('inspectedScope', function (newScope) {
  //   if (newScope) {
  //     $scope.modelsExpanded = true;
  //     cancelWatch();
  //   }
  // });


  // $scope.$on('inspected-scope:change', function (ev, data) {
  //   inspectScope(data.id);
  // });

  // function inspectScope(scopeId) {
  //   $scope.watch(scopeId);
  //   $scope.inspectedScope = scopeId;
  //   inspectedApp.inspectScope(scopeId);
  // };

}
