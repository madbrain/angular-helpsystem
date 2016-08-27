
export class HelpPane implements angular.IDirective {

    restrict = 'E';
    controller = 'HelpController';
    controllerAs = 'ctrl';
    templateUrl = 'views/helpPane.directive.html';
    transclude = true;
    scope = {};

    public static factory(): angular.IDirectiveFactory {
        let factory = () => new HelpPane();
        factory.$inject = [ ];
        return factory;
    }
}

