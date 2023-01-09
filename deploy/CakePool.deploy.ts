import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const deployCakePool: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  const PLATFORM_TOKEN_ADDRESS = process.env.PLATFORM_TOKEN_ADDRESS;
  const MASTER_CHEF_V2_ADDRESS = (await deployments.get("MasterChefV2")).address;

  await deploy('CakePool', {
    from: deployer,
    args: [
        PLATFORM_TOKEN_ADDRESS,
        MASTER_CHEF_V2_ADDRESS,
        deployer,
        deployer,
        deployer,
        0
    ],
    log: true,
    deterministicDeployment: false
  });
};

deployCakePool.tags = ["CAKE_POOL"];
deployCakePool.dependencies = ["MASTER_CHEF"];

export default deployCakePool;