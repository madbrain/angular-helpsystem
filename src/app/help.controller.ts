
type ElementMap = { [key:string]: ElementNode; };

export class HelpController {

    public isOpened = false;
    public sliderIndex = 0;
    public sliderOptions = {
	    ceil: 1,
        hidePointerLabels: true,
        hideLimitLabels: true,
        onChange: null,
    };
    private orderedNodes: ElementNode[] = [];

    static $inject = [ '$element', '$rootScope', '$window', '$transclude' ];
    constructor(private $element: JQuery, $rootScope: angular.IRootScopeService,
            $window: angular.IWindowService, $transclude: angular.ITranscludeFunction) {
        $element.find('.glass-pane').append($transclude());
        this.buildNodeOrder();
        this.placeNodes();
        $rootScope.$on('help:open', (e) => {
            this.isOpened = true;
        });
        angular.element($window).bind('resize', () => {
            this.placeNodes();
	    });
        this.sliderOptions.onChange = this.changeIndex.bind(this);
    }

    private changeIndex() {
        this.orderedNodes.forEach((node, index) => {
            node.display( this.sliderIndex);
        });
    }

    private buildNodeOrder() {
        let nodes: ElementNode[] = [];
        let nodesById: ElementMap = {};
        this.findElements('help-widget', nodes, nodesById, true);
        this.findElements('help-relative', nodes, nodesById, false);

        var maxStep = -1;
        nodes.forEach((node) => {
            maxStep = Math.max(maxStep, node.resolve(nodesById));
        });
        this.sliderOptions.ceil = maxStep;
        // TODO detect cycles: after one passage almost one node must have been removed 
        while (nodes.length > 0) {
            let node = nodes.shift();
            if (node.hasParentIn(this.orderedNodes)) {
                this.orderedNodes.push(node);
            } else {
                nodes.push(node);
            }
        }
    }

    private findElements(attrName: string, nodes: ElementNode[],
            nodesById: ElementMap, isWidget: boolean) {
        this.$element.find("["+attrName+"]").each((i, e) => {
            let node = new ElementNode(angular.element(e), e.getAttribute(attrName), isWidget);
            nodes.push(node);
            if (e.id !== '') {
                nodesById[e.id] = node;
            }
        });
    }

    private placeNodes() {
        this.orderedNodes.forEach((node) => {
            node.display(this.sliderIndex);
            node.place();
        });
    }

    public closeHelp() {
        this.isOpened = false;
    }

    public previousHelp() {

    }

    public nextHelp() {

    }
}

class ElementNode {

    private stepIndex = -1;
    private parent: ElementNode;

    constructor(private element: JQuery, private parentName: string, private isWidget: boolean) {
        var step = this.element[0].getAttribute('help-step');
        if (angular.isDefined(step)) {
            this.stepIndex = parseInt(step); 
        }
    }

    public resolve(nodes: ElementMap): number {
        if (this.parentName != undefined) {
            this.parent = nodes[this.parentName];
        }
        return this.stepIndex;
    }

    public hasParentIn(nodes: ElementNode[]) {
        return angular.isUndefined(this.parent) || nodes.indexOf(this.parent) >= 0;
    }

    public display(visibleIndex: number) {
        if (this.stepIndex >= 0) {
            if (this.stepIndex === visibleIndex) {
                this.element.css('display', '');
            } else {
                this.element.css('display', 'none');
            }
        }
    }

    // TODO Use polymorphism
    public place() {
        if (this.isWidget) {
            this.placeWidget();
        } else {
            this.placeOther();
        }
    }

    private placeWidget() {
        var helpElement = angular.element('#' + this.parentName);
        var position = helpElement.offset();
        var width = helpElement[0].clientWidth;
        var height = helpElement[0].clientHeight;
        this.element.css('position', 'absolute');
        this.element.css('top', position.top);
        this.element.css('left', position.left);
        this.element.css('width', width);
        this.element.css('height', height);
        this.element.css('z-index', '20');

    }

    private placeOther() {
        var parentElement = angular.element('#' + this.parentName);
        var relation = this.element[0].getAttribute('help-position');
        var offsetString = this.element[0].getAttribute('help-offset');
        var offsets = offsetString.split(",").map((x) => parseInt(x));
        var parentTop = parseInt(parentElement.css('top'));
        var parentLeft = parseInt(parentElement.css('left'));
        var parentWidth = parseInt(parentElement.css('width'));
        var parentHeight = parseInt(parentElement.css('height'));
        var thisWidth = parseInt(this.element.css('width'));
        var thisHeight = parseInt(this.element.css('height'));
        var top;
        var left;
        if (relation === 'bottom') {
            top = parentTop + parentHeight + offsets[1];
            left = parentLeft + (parentWidth - thisWidth) / 2 + offsets[0];
        } else if (relation === 'top') {
            top = parentTop - this.element[0].clientHeight + offsets[1];
            left = parentLeft + (parentWidth - thisWidth) / 2 + offsets[0];
        } else if (relation === 'right') {
            top = parentTop + offsets[1];
            left = parentLeft + parentWidth + offsets[0];
        } else {
            top = parentTop + offsets[1];
            left = parentLeft - thisWidth + offsets[0];
        }

        this.element.css('position', 'absolute');
        this.element.css('top', top);
        this.element.css('left', left);
    }
}