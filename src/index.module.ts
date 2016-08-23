import {HomeController} from './home.controller';
import {HelpPane} from './helpPane.directive';
import {HelpController} from './help.controller';

angular.module('app', [])
    .controller('HomeController', HomeController)
    .controller('HelpController', HelpController)
    .directive('helpPane', HelpPane.factory());
