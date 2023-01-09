import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const deployMockBEP20: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  await deploy('MockBEP20', {
    from: deployer,
    args: [
        "TIKTAK",
        "TAK",
        ethers.BigNumber.from(100000).mul(ethers.BigNumber.from(10).pow(18))
    ],
    log: true,
    deterministicDeployment: false
  });
};

deployMockBEP20.tags = ["MOCK_BEP20"];
deployMockBEP20.skip = () => Promise.resolve(true)

export default deployMockBEP20;