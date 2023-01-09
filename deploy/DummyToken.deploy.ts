import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployDummyToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
) => {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const MASTER_CHEF_V2_ADDRESS = (await deployments.get('MasterChefV2'))
    .address;
  const CAKE_POOL_ADDRESS = (await deployments.get('CakePool')).address;

  const { address: DUMMY_TOKEN_ADDRESS } = await deploy('DummyToken', {
    from: deployer,
    args: [
      'dCAKEPOOL',
      'dCAKEPOOL',
      ethers.BigNumber.from(100000).mul(ethers.BigNumber.from(10).pow(18)),
    ],
    log: true,
    deterministicDeployment: false,
  });

  // Initialize CAKE POOL to start earning rewards from MasterChef ^_^
  await execute(
    'DummyToken',
    {
      log: true,
      from: deployer,
    },
    'approve',
    CAKE_POOL_ADDRESS,
    ethers.constants.MaxUint256,
  );

  await execute(
    'MasterChefV2',
    {
      log: true,
      from: deployer,
    },
    'add',
    550951,
    DUMMY_TOKEN_ADDRESS,
    false,
    false,
  );

  await execute(
    'MasterChefV2',
    {
      log: true,
      from: deployer,
    },
    'updateWhiteList',
    CAKE_POOL_ADDRESS,
    true,
  );

  await execute(
    'CakePool',
    {
      log: true,
      from: deployer,
    },
    'init',
    DUMMY_TOKEN_ADDRESS,
  );
};

deployDummyToken.tags = ['DUMMY'];
deployDummyToken.dependencies = ['MASTER_CHEF', 'CAKE_POOL'];

export default deployDummyToken;
