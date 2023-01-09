import { Contract } from 'ethers';
import { verifyEtherscanContract } from './etherscan-verification';
import { usingTenderly, verifyAtTenderly } from './tenderly-utils';

export const verifyContract = async (
  id: string,
  instance: Contract,
  args: (string | string[])[],
) => {
  if (usingTenderly()) {
    await verifyAtTenderly(id, instance);
  }
  await verifyEtherscanContract(instance.address, args);
  return instance;
};
