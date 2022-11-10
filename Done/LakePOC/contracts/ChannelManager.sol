pragma solidity ^0.4.22;

import "./CustomToken.sol";
import "./ECVerify.sol";

contract ChannelManager {
    using SafeMath for uint256;

    uint256 public constant channel_min_deposit_limit = 10 ** 18 * 100;
    address public owner_address;
    CustomToken public token;

    struct Channel {
        uint256 deposit;                                                   // Total Channel Balance
        uint256 open_block_number;                                       // Block Nubmer when Channel is opened
        uint256 startTime;                                                 // Channel start date 
        uint256 expiryTime;                                                // Channel Expiry Date        
    }   

    mapping (bytes32 => Channel) public channels;

    /*
     *  Events
     */
    event ChannelCreated(
    address indexed _sender_address,
    address indexed _receiver_address,
    uint256 _deposit);

    event ChannelSettled(
    address indexed _sender_address,
    address indexed _receiver_address,
    uint256 indexed _open_block_number,
    uint256 _balance,
    uint256 _receiver_tokens);

    constructor(address _token_address) public {
        token = CustomToken(_token_address);
        owner_address = msg.sender;
    }
    /*
     *  External functions 
     */
    /// @notice Creates a new channel between `msg.sender` and `_receiver_address` and transfers
    /// the `_deposit` token deposit to this contract. Compatibility with ERC20 tokens.
    /// @param _receiver_address The address that receives tokens.
    /// @param _deposit The amount of tokens that the sender escrows.
    function createChannel(address _receiver_address, uint256 _deposit) external {
        _createChannelPrivate(msg.sender, _receiver_address, _deposit);
   
    }

    /// @notice Function called by the sender, receiver or a delegate, with all the needed
    /// signatures to close the channel and settle immediately.
    /// @param _receiver_address The address that receives tokens.
    /// @param _open_block_number The block number at which a channel between the
    /// sender and receiver was created.
    /// @param _balance The amount of tokens owed by the sender to the receiver.
    /// @param _balance_msg_sig The balance message signed by the sender.
    /// @param _closing_sig The receiver's signed balance message, containing the sender's address.
    function channelClose(
        address _receiver_address,
        uint256 _open_block_number,
        uint256 _balance,
        bytes _balance_msg_sig,
        bytes _closing_sig)
        external
    {
        // Derive sender address from signed balance proof
        address sender = extractBalanceProofSignature(
            _receiver_address,
            _open_block_number,
            _balance,
            _balance_msg_sig
        );

        // Derive receiver address from closing signature
        address receiver = extractClosingSignature(
            sender,
            _open_block_number,
            _balance,
            _closing_sig
        );

        require(receiver == _receiver_address);

        // Both signatures have been verified and the channel can be settled.
        settleChannel(sender, receiver, _open_block_number, _balance);
    }
    
    /*
     *  Private functions
     */

    /// @dev Creates a new channel between a sender and a receiver.
    /// @param _sender_address The address that sends tokens.
    /// @param _receiver_address The address that receives tokens.
    /// @param _deposit The amount of tokens that the sender escrows.
    function _createChannelPrivate(
        address _sender_address,
        address _receiver_address,
        uint256 _deposit)
        private
    {

        //uint32 open_block_number = uint32(block.number);
        uint256 open_block_number = block.number;

        // Create unique identifier from sender, receiver and current block number
        bytes32 key = getKey(_sender_address, _receiver_address, open_block_number);

        require(channels[key].deposit == 0);
        require(channels[key].open_block_number == 0);
    
        // Store channel information
        channels[key] = Channel({deposit: _deposit, open_block_number: open_block_number, startTime: block.timestamp, expiryTime: (block.timestamp + 7 days)});
        emit ChannelCreated(_sender_address, _receiver_address, _deposit);
    }

    /// @dev Deletes the channel and settles by transfering the balance to the receiver
    /// and the rest of the deposit back to the sender.
    /// @param _sender_address The address that sends tokens.
    /// @param _receiver_address The address that receives tokens.
    /// @param _open_block_number The block number at which a channel between the
    /// sender and receiver was created.
    /// @param _balance The amount of tokens owed by the sender to the receiver.
    function settleChannel(
        address _sender_address,
        address _receiver_address,
        uint256 _open_block_number,
        uint256 _balance)
        private
    {
        bytes32 key = getKey(_sender_address, _receiver_address, _open_block_number);
        Channel memory channel = channels[key];

        require(channel.open_block_number > 0);
        require(_balance <= channel.deposit);

        // Remove closed channel structures
        // channel.open_block_number will become 0
        // Change state before transfer call
        delete channels[key];
        //delete closing_requests[key];

        // Send the unwithdrawn _balance to the receiver
        uint256 receiver_remaining_tokens = _balance;
        require(token.transfer(_receiver_address, _balance));

        // Send deposit - balance back to sender
        require(token.transfer(_sender_address, channel.deposit.sub(_balance)));

        emit ChannelSettled(
            _sender_address,
            _receiver_address,
            _open_block_number,
            _balance,
            receiver_remaining_tokens
        );
    }

    /*
    Public Functions
    */

    /// @notice Returns the sender address extracted from the balance proof.
    /// @param _receiver_address The address that receives tokens.
    /// @param _open_block_number The block number at which a channel between the
    /// sender and receiver was created.
    /// @param _balance The amount of tokens owed by the sender to the receiver.
    /// @param _balance_msg_sig The balance message signed by the sender.
    /// @return Address of the balance proof signer.
    function extractBalanceProofSignature(
        address _receiver_address,
        uint256 _open_block_number,
        uint256 _balance,
        bytes _balance_msg_sig)
        public
        view
        returns (address)
    {
        // The variable names from below will be shown to the sender when signing
        // the balance proof, so they have to be kept in sync with the Dapp client.
        // The hashed strings should be kept in sync with this function's parameters
        // (variable names and types).
        bytes32 message_hash = keccak256(
            abi.encodePacked(
        keccak256(
            abi.encodePacked(
            'string message_id',
            'address receiver',
            'uint32 block_created',
            'uint192 balance',
            'address contract'
        )),
        keccak256(
            abi.encodePacked(
            "Sender balance proof signature",
            _receiver_address,
            _open_block_number,
            _balance,
            address(this)
        ))
        ));

        // Derive address from signature
        address signer = ECVerify.ecverify(message_hash, _balance_msg_sig);
        return signer;
    }

    /// @dev Returns the receiver address extracted from the closing signature.
    /// Works with eth_signTypedData https://github.com/ethereum/EIPs/pull/712.
    /// @param _sender_address The address that sends tokens.
    /// @param _open_block_number The block number at which a channel between the
    /// sender and receiver was created.
    /// @param _balance The amount of tokens owed by the sender to the receiver.
    /// @param _closing_sig The receiver's signed balance message, containing the sender's address.
    /// @return Address of the closing signature signer.
    function extractClosingSignature(
        address _sender_address,
        uint256 _open_block_number,
        uint256 _balance,
        bytes _closing_sig)
        public
        view
        returns (address)
    {
        // The variable names from below will be shown to the sender when signing
        // the balance proof, so they have to be kept in sync with the Dapp client.
        // The hashed strings should be kept in sync with this function's parameters
        // (variable names and types).
        // ! Note that EIP712 might change how hashing is done, triggering a
        // new contract deployment with updated code.
        bytes32 message_hash = keccak256(
            abi.encodePacked(
            keccak256(
                abi.encodePacked(
                'string message_id',
                'address sender',
                'uint32 block_created',
                'uint192 balance',
                'address contract'
            )),
            keccak256(
                abi.encodePacked(
                "Receiver closing signature",
                _sender_address,
                _open_block_number,
                _balance,
                address(this)
            ))
        ));

        // Derive address from signature
        address signer = ECVerify.ecverify(message_hash, _closing_sig);
        return signer;
    }

    /// @notice Returns the unique channel identifier used in the contract.
    /// @param _sender_address The address that sends tokens.
    /// @param _receiver_address The address that receives tokens.
    /// @param _open_block_number The block number at which a channel between the
    /// sender and receiver was created.
    /// @return Unique channel identifier.
    function getKey(
        address _sender_address,
        address _receiver_address,
        uint256 _open_block_number)
        public
        pure
        returns (bytes32 data)
    {
        return keccak256(abi.encodePacked(_sender_address, _receiver_address, _open_block_number));
    }

}