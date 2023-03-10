import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyEtherscanContractByName } from '../helpers/etherscan-verification';

const deployMasterChef: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
) => {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const PLATFORM_TOKEN_ADDRESS = process.env.PLATFORM_TOKEN_ADDRESS as string;
  const args = [PLATFORM_TOKEN_ADDRESS, deployer];

  await deploy('MasterChefV2', {
    from: deployer,
    args,
    log: true,
    deterministicDeployment: false,
  });
};

deployMasterChef.tags = ['MASTER_CHEF'];

export default deployMasterChef;
