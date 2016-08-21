
export class HomeController {

    public message: string;
    public helpOpened: boolean = false;

    constructor(private $rootScope: angular.IRootScopeService) {
        this.message = "Hello World!";
    }

    public openHelp() {
        this.helpOpened = true;
        this.$rootScope.$broadcast('help:toggle', true);
    }

    public closeHelp() {
        this.helpOpened = false;
        this.$rootScope.$broadcast('help:toggle', false);
    }
}