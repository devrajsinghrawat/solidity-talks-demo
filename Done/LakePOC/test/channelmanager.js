const CustomToken = artifacts.require('CustomToken');
const ChannelManager = artifacts.require("ChannelManager");
//const ChannelManager = artifacts.require("NameRegistry");

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .should();
/*


1- Token contract will be deployed and we can get the address of Token contract
2- Check for Total Supply - Ok
3- 
2- Use that address and initiate the Channel Contract 
3- Create Channel using receiver address and deposit amount

*/

contract('ChannelManager', function (accounts) {
    const owner = accounts[0];
    const bob = accounts[1];
    const alice = accounts[2];
    const _escrow = accounts[3];
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

    beforeEach('setup contract for each test', async () => {
        token = await CustomToken.new();
        const _tokenAddress = await token.address;
        channelInstance = await ChannelManager.new(_tokenAddress);
    });

    describe('create a channel', () => {
        it('channel created', async () => {
            channelIns = await channelInstance.createChannel(_escrow, 50);
            console.log(channelIns);
        })
    })

    /* Token testing 
        describe('total supply', () => {
            it('returns the total amount of tokens', async () => {
                const totalsupply = await token.totalSupply.call();
                assert.equal(totalsupply, 100, 'Supply should equal to 100');
            })
        })

        describe('balanceOf', () => {
            describe('when the requested account has tokens', () => {
                it('return balance', async () => {
                    const balance = await token.balanceOf.call(owner);
                    assert.equal(balance, 100, 'balance should equal to 100');
                })
            })
            describe('when the requested account has no tokens', () => {
                it('return zero', async () => {
                    const balance = await token.balanceOf.call(bob);
                    assert.equal(balance, 0, 'balance should equal to 0');
                })
            });
        })

        describe('transfer', () => {
            describe('when receiver is not zero address', () => {
                const to = bob;

                describe('when sender has enough token balance', () => {
                    const amount = 10;
                    it('transfer funds', async () => {
                        console.log("To address --> ", to);
                        let senderBalance = await token.balanceOf.call(owner);
                        console.log("Sender Balance --> ", senderBalance.toNumber());
                        let receiverBalance = await token.balanceOf.call(to);
                        console.log("receiver Balance --> ", receiverBalance.toNumber());

                        try {
                            let status = await token.transfer.sendTransaction(to, amount, {
                                from: owner
                            });
                            console.log("Trasfer Status --> ", status);
                            senderBalance = await token.balanceOf.call(owner);
                            console.log("Sender Balance --> ", senderBalance.toNumber());
                            assert.equal(senderBalance, 90, 'balance should equal to 90');

                            receiverBalance = await token.balanceOf.call(to);
                            console.log("receiver Balance --> ", receiverBalance.toNumber());
                            assert.equal(receiverBalance, 10, 'balance should equal to 10');
                        } catch (error) {
                            const revertF = error.message.search('revert') >= 0;
                            assert.equal(revertFound, 'revert', 'Error message should have revert');
                        }
                    })
                    it('emits a transfer event', async () => {
                        const {
                            logs
                        } = await token.transfer(to, amount, {
                            from: owner
                        });

                        console.log("Log --> ", logs[0].args.value);

                        assert.equal(logs.length, 1);
                        assert.equal(logs[0].event, 'Transfer');
                        assert.equal(logs[0].args.from, owner);
                        assert.equal(logs[0].args.to, to);
                        assert(logs[0].args.value.eq(amount));
                    });
                })

                describe('when sender does not have enough token balance', () => {
                    const amount = 101;

                    it('revert', async () => {
                        try {
                            await token.transfer.sendTransaction(to, amount, {
                                from: owner
                            });
                        } catch (error) {
                            const revertFound = error.message.search('revert') >= 0;
                            //    console.log("Error : ", error)
                        }
                        assert.equal(revertFound, 'revert', 'Error message should have revert');
                        //const balance = await token.balanceOf.call(owner);
                        //assert.equal(balance, 100, 'Balance should be 100');
                    })
                })
            })

            describe('when receiver is zero address', () => {
                const to = ZERO_ADDRESS;
                const amount = 100;

                it('revert', async () => {
                    try {
                        await token.transfer.sendTransaction(to, amount, {
                            from: owner
                        });
                    } catch (error) {
                        const revertFound = error.message.search('revert') >= 0;
                    }
                    assert.equal(revertFound, 'revert', 'Error message should have revert');
                    // const balance = await token.balanceOf.call(owner);
                    // assert.equal(balance, 100, 'Balance should be 100');
                })
            })
        }) */
});