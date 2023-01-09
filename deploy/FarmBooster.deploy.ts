import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFarmBooster: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
) => {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const PLATFORM_TOKEN_ADDRESS = process.env.PLATFORM_TOKEN_ADDRESS;
  const CAKE_POOL_ADDRESS = (await deployments.get('CakePool')).address;
  const MASTER_CHEF_V2_ADDRESS = (await deployments.get('MasterChefV2'))
    .address;
  const MAX_BOOST_POOL = process.env.MAX_BOOST_POOL;

  await deploy('FarmBooster', {
    from: deployer,
    args: [
      PLATFORM_TOKEN_ADDRESS,
      CAKE_POOL_ADDRESS,
      MASTER_CHEF_V2_ADDRESS,
      MAX_BOOST_POOL,
      50000,
      5,
    ],
    log: true,
    deterministicDeployment: false,
  });
};

deployFarmBooster.tags = ['FARM_BOOSTER'];
deployFarmBooster.tags = ['CAKE_POOL'];

export default deployFarmBooster;
