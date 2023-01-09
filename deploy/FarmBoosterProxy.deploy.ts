import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const deployFarmBoosterProxy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('FarmBoosterProxy', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  })
}

deployFarmBoosterProxy.tags = ['BOOSTER_PROXY']
deployFarmBoosterProxy.skip = () => Promise.resolve(true)

export default deployFarmBoosterProxy
