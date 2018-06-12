const _modules = {
    Home: () => ("./index.js"),
    FieldModule: () =>
        import ('./fields.js'),
        HarvestModule: () =>
            import ('./harvests.js')
    // Category: () => import('./category.js'),
    // Product: () => import('./product.js'),
    // Checkout: () => import('./checkout.js'),

};

export default class Router {
    static get modules() {
        return _modules;
    }
}