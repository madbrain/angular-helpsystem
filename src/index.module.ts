import {HomeController} from './home.controller';
import {HelpPane} from './helpPane.directive';
import {HelpController} from './help.controller';

angular.module('app', [ 'rzModule' ])
    .controller('HomeController', HomeController)
    .controller('HelpController', HelpController)
    .directive('helpPane', HelpPane.factory());
