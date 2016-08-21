import {HomeController} from './home.controller';
import {HelpId} from './helpId.directive';
import {HelpRelative} from './helpRelative.directive';

angular.module('app', [])
    .controller('HomeController', HomeController)
    .directive('helpId', HelpId.factory())
    .directive('helpRelative', HelpRelative.factory());
