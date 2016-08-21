
export class HelpId implements angular.IDirective {

    restrict = 'A';

    link: angular.IDirectiveLinkFn = function($scope, $element: JQuery, $attrs: ng.IAttributes) {
        var elementId = $attrs['helpId'];
        var helpElement = angular.element('#' + elementId);
        this.$rootScope.$on('help:toggle', (event: angular.IAngularEvent, doOpen: boolean) => {
            if (doOpen) {
                var position = helpElement.offset();
                var width = helpElement[0].clientWidth;
                var height = helpElement[0].clientHeight;

                $element.css('position', 'absolute');
                $element.css('top', position.top);
                $element.css('left', position.left);
                $element.css('width', width);
                $element.css('height', height);
                $element.css('z-index', '20');
            }
        });
    };

    constructor(private $rootScope: angular.IRootScopeService) { }

    public static factory(): angular.IDirectiveFactory {
        let factory = ($rootScope) => new HelpId($rootScope);
        factory.$inject = [ '$rootScope' ];
        return factory;
    }
}

