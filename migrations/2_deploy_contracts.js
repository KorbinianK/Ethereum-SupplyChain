var StringUtils = artifacts.require("strings");
var FieldHandler = artifacts.require("FieldHandler");
var HarvestHandler = artifacts.require("HarvestHandler");
var TransportHandler = artifacts.require("TransportHandler"); 
var ProcessHandler = artifacts.require("ProcessHandler");
var Token = artifacts.require("GrapeToken");

// module.exports = async function deployment(deployer){
//     await deployer.deploy(StringUtils);
//     deployer.link(StringUtils, [FieldHandler, HarvestHandler, TransportHandler]);
//     await deployer.deploy(Token);
//     await deployer.deploy(FieldHandler);
//     await deployer.deploy(HarvestHandler, Token.address, FieldHandler.address);
//     await deployer.deploy(TransportHandler, Token.address, HarvestHandler.address);
//     await deployer.deploy(ProcessHandler, Token.address, TransportHandler.address);
// }

module.exports = function (deployer) {
    deployer.deploy(StringUtils).then(() =>{
        deployer.link(StringUtils, [FieldHandler, HarvestHandler, TransportHandler]);
        deployer.deploy(Token).then( () =>{
                return deployer.deploy(FieldHandler).then( () =>{ ;
                    return deployer.deploy(HarvestHandler, Token.address, FieldHandler.address).then( () =>{
                        return deployer.deploy(TransportHandler, Token.address, HarvestHandler.address).then( () =>{
                            return deployer.deploy(ProcessHandler, Token.address, TransportHandler.address);
                        });
                    });
                });
    });
});
}
    
    // deployer.deploy(Token).then( () =>{
    //     return deployer.deploy(FieldHandler).then( () =>{ ;
    //         return deployer.deploy(HarvestHandler, Token.address, FieldHandler.address).then( () =>{
    //             return deployer.deploy(TransportHandler, Token.address, HarvestHandler.address).then( () =>{
    //                 return deployer.deploy(ProcessHandler, Token.address, TransportHandler.address);
    //             });
    //         });
    //     });
    // });
// };