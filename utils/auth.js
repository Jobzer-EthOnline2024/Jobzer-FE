import { ethers } from 'ethers';

export const loginWithWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a new provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Get the signer (the wallet that will sign transactions)
            const signer = provider.getSigner();

            // Get wallet address
            const address = await signer.getAddress();
            console.log("Connected wallet address:", address);

            // You can now use the address for authentication, verification, etc.
            return { address, signer };

        } catch (error) {
            console.error('Error connecting to wallet:', error);
            return null;
        }
    } else {
        console.error('No Ethereum provider found. Please install MetaMask!');
        return null;
    }
};
