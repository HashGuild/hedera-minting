const Minting = artifacts.require('Minting');

contract('Minting', (accounts) => {
  // it('says hello', async () => {
  //   const mintingInstance = await Minting.deployed();
  //   const response = await mintingInstance.hello();
  //   assert.equal(response, 'Hello, World');
  // });

  it('creates and returns a valid token', async () => {
    const mintingInstance = await Minting.deployed();
    const response = await mintingInstance.createNft(
      'My fancy NFT',
      'MNFT',
      'hey there',
      10,
      7000000,
      {
        from: accounts[0],
      },
    );

    console.log(response);
  });
});
