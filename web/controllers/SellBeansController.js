const HTTPController = require('../../shared/HTTPController');

@inject('ISellBeansUseCase')
class SellBeansController extends HTTPController {
    /**
     * Creates a new SellBeansController
     *
     * @param {ISellBeansUseCase} sellBeansUC Use case implementation
     */
    constructor(sellBeansUC) {
        super();
        this._sellBeansUC = sellBeansUC;
    }

    @POST('/sell-beans')
    sellBeans(req) {
        const amount = parseInt(req.body, 10);

        if (isNaN(amount)) return { err: 'input' };

        this._sellBeansUC.sell(amount);

        return { done: true };
    }

    @GET('/sell-beans/:amount')
    sellBeanCheating(req) {
        const amount = parseInt(req.params.amount, 10);
        if (isNaN(amount)) return { err: 'input' };

        this._sellBeansUC.sell(amount);

        return { done: true };
    }
}
