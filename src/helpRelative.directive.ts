

export class HelpRelative implements angular.IDirective {

    restrict = 'A';

    link: angular.IDirectiveLinkFn = function($scope, $element: JQuery, $attrs: ng.IAttributes) {
        var elementId = $attrs['helpRelative'];
        var parentElement = angular.element('#' + elementId);
        var relation = $attrs['helpPosition'];
        var offsetString: string = $attrs['helpOffset'];
        var offsets = offsetString.split(",").map((x) => parseInt(x));
        this.$rootScope.$on('help:toggle', (event: angular.IAngularEvent, doOpen: boolean) => {
            if (doOpen) {
                var parentTop = parseInt(parentElement.css('top'));
                var parentLeft = parseInt(parentElement.css('left'));
                var parentWidth = parseInt(parentElement.css('width'));
                var parentHeight = parseInt(parentElement.css('height'));
                var thisWidth = parseInt($element.css('width'));
                var thisHeight = parseInt($element.css('height'));
                var top;
                var left;
                if (relation === 'south') {
                    top = parentTop + parentHeight + offsets[1];
                    left = parentLeft + (parentWidth - thisWidth) / 2 + offsets[0];
                } else if (relation === 'north') {
                    top = parentTop - $element[0].clientHeight + offsets[1];
                    left = parentLeft + (parentWidth - thisWidth) / 2 + offsets[0];
	            } else if (relation === 'right') {
                    top = parentTop + offsets[1];
                    left = parentLeft + parentWidth + offsets[0];
                } else {
                    top = parentTop + offsets[1];
                    left = parentLeft - thisWidth + offsets[0];
                }
                // console.log('helpRel', $element.css('width'), thisWidth, thisHeight, top, left);

                $element.css('position', 'absolute');
                $element.css('top', top);
                $element.css('left', left);
            }
        });
    };

    constructor(private $rootScope: angular.IRootScopeService) { }

    public static factory(): angular.IDirectiveFactory {
        let factory = ($rootScope) => new HelpRelative($rootScope);
        factory.$inject = [ '$rootScope' ];
        return factory;
    }
}

