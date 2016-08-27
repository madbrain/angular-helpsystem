
export class HomeController {

    public message: string;

    static $inject =  [ '$rootScope' ];
    constructor(private $rootScope: angular.IRootScopeService) {
        this.message = "Hello World!";
    }

    public openHelp() {
        this.$rootScope.$broadcast('help:open');
    }

}