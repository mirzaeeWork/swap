// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
        function swap(address contractAddress,address reciver ,uint _amount) public {
            require(IERC20(contractAddress).allowance(msg.sender, address(this)) >= _amount, "Token allowance too low");
            
            _safeTransferFrom(contractAddress, msg.sender, reciver, _amount);               
        }
        
        function _safeTransferFrom(address contractAddress_, address sender, address recipient, uint amount) private {
            bool sent = IERC20(contractAddress_).transferFrom(sender, recipient, amount);
            require(sent, "Token transfer failed");            
        }
}

