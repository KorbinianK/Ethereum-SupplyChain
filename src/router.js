const _modules = {
    Home: () => ("./index.js"),
    FieldModule: () =>
        import ('./fields.js'),
    HarvestModule: () =>
        import ('./harvests.js'),
    TransportModule: () =>
        import ("./transports.js")
    
};

export default class Router {
    static get modules() {
        return _modules;
    }
}