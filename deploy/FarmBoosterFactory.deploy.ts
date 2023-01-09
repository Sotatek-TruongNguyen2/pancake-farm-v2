import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const deployFarmBoosterProxyFactory: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const FARM_BOOSTER_ADDRESS = (await deployments.get('FarmBooster')).address
  const MASTER_CHEF_V2_ADDRESS = (await deployments.get('MasterChefV2')).address
  const PLATFORM_TOKEN_ADDRESS = process.env.PLATFORM_TOKEN_ADDRESS

  await deploy('FarmBoosterProxyFactory', {
    from: deployer,
    args: [FARM_BOOSTER_ADDRESS, MASTER_CHEF_V2_ADDRESS, PLATFORM_TOKEN_ADDRESS],
    log: true,
    deterministicDeployment: false,
  })
}

deployFarmBoosterProxyFactory.tags = ['BOOSTER_PROXY_FACTORY']
deployFarmBoosterProxyFactory.dependencies = ['MASTER_CHEF', 'FARM_BOOSTER']

export default deployFarmBoosterProxyFactory
