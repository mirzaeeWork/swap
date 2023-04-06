const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("TokenERC20 Contract", function () {
  async function deployOneContract() {
    const Swapper = await ethers.getContractFactory("TokenSwap");
    const swapper = await Swapper.deploy();
    await swapper.deployed();
  
    MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy("mirzaee","MIZ");
    await myToken.deployed();
  
  
    console.log(`Swapper deployed to : ${swapper.address}`);
    console.log(`myToken deployed to : ${myToken.address}`);
    
    const [addr1, addr2] = await ethers.getSigners();
    return { swapper,myToken, addr1, addr2 };
  }

  it("should be able to swap", async function () {
    console.log('------------------------------------------')

    const {swapper,myToken, addr1, addr2 } = await loadFixture(deployOneContract);
    const amount = ethers.utils.parseEther( "30" );
    //approve addr1 to swapper.address
    await myToken.approve(swapper.address,amount)
    await swapper.swap(myToken.address,addr2.address,ethers.utils.parseEther("20"))
    expect(await myToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("20"));

  });
});