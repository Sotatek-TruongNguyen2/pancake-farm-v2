import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyEtherscanContractByName } from '../helpers/etherscan-verification';
import { setDRE } from '../helpers/misc-utils';

const contractVerification: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
) => {
  const { deployments } = hre;

  setDRE(hre);

  const MASTER_CHEF_V2_ADDRESS = (await deployments.get('MasterChefV2'))
    .address;
  const CAKE_POOL_ADDRESS = (await deployments.get('CakePool')).address;
  const FARM_BOOSTER_PROXY_ADDRESS = (await deployments.get('FarmBoosterProxy'))
    .address;
  const FARM_BOOSTER_PROXY_FACTORY_ADDRESS = (
    await deployments.get('FarmBoosterProxyFactory')
  ).address;

  const FARM_BOOSTER = (await deployments.get('FarmBooster')).address;

  await hre.addressExporter.save({
    MASTER_CHEF_V2_ADDRESS,
    CAKE_POOL_ADDRESS,
    FARM_BOOSTER,
    FARM_BOOSTER_PROXY_FACTORY_ADDRESS,
    FARM_BOOSTER_PROXY_ADDRESS,
  });

  await verifyEtherscanContractByName('MasterChefV2');
  await verifyEtherscanContractByName('CakePool');
  await verifyEtherscanContractByName('FarmBooster');
  await verifyEtherscanContractByName('FarmBoosterProxy');
  await verifyEtherscanContractByName('FarmBoosterProxyFactory');

  console.log('====== Finish Verification Process !!!');
};

contractVerification.tags = ['VERIFICATION'];
contractVerification.runAtTheEnd = true;

export default contractVerification;
