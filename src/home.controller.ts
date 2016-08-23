
export class HomeController {

    public message: string;

    constructor(private $rootScope: angular.IRootScopeService) {
        this.message = "Hello World!";
    }

    public openHelp() {
        this.$rootScope.$broadcast('help:open');
    }

}