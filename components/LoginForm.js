import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation'; // Import useRouter

const LoginForm = ({ onLogin }) => {
  const router = useRouter(); // Define the router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleWalletLogin = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const signature = await signer.signMessage('Sign in to access the platform');

        // Store the address in localStorage
        localStorage.setItem('walletAddress', address);

        console.log('Wallet Address:', address);
        console.log('Signature:', signature);

        // Perform login with the wallet details (pass it to your backend or Lit Protocol)
        onLogin(address, signature);
        
        // Navigate to the wallet page after login
        router.push('/wallet'); // Redirect to wallet page
      } catch (error) {
        console.error('Error logging in with wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Regular email-password login
    onLogin(email, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <h2>Login</h2>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '8px', marginBottom: '16px' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '8px', marginBottom: '16px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
          Login with Email
        </button>

        <button
          type="button"
          onClick={handleWalletLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#f7931a', color: 'white', border: 'none', marginTop: '16px' }}>
          Login with MetaMask
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
