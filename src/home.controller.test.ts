import {HomeController} from './home.controller';
import './index.module';

describe("HomeController", () => {

    var $controller: angular.IControllerService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject((_$controller_) => {
        $controller = _$controller_;
    }));

    it("should initialize correctly", () => {
        var controller = $controller<HomeController>("HomeController");
        expect(controller.message).toEqual('Hello World!');
	});
});
