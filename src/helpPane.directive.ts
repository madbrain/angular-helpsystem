
export class HelpPane implements angular.IDirective {

    restrict = 'E';
    controller = 'HelpController';
    controllerAs = 'ctrl';
    templateUrl = 'src/helpPane.directive.html';
    transclude = true;
    scope = {};

    constructor(private $rootScope: angular.IRootScopeService) { }

    public static factory(): angular.IDirectiveFactory {
        let factory = ($rootScope) => new HelpPane($rootScope);
        factory.$inject = [ '$rootScope' ];
        return factory;
    }
}

