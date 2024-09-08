'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { loginWithWallet } from '../../utils/auth';
import { useRouter } from 'next/navigation';
import LitConnector from '../../components/LitConnector';  // Import LitConnector

export default function HomePage() {
  const router = useRouter();
  const [connectedToLit, setConnectedToLit] = useState(false);

  const handleLogin = async (emailOrAddress, passwordOrSignature) => {
    if (passwordOrSignature) {
      // Handle email-password login or wallet login
      if (emailOrAddress.includes('@')) {
        // Handle email login
        console.log('Email login:', { emailOrAddress, passwordOrSignature });
      } else {
        // Handle wallet login via Lit Protocol
        const result = await loginWithWallet(emailOrAddress, passwordOrSignature);
        
        if (result.success) {
          console.log('Login successful via wallet');
          // After login, trigger Lit Protocol connection
          setConnectedToLit(true);
        } else {
          alert(result.error);
        }
      }
    }
  };

  const handleLitConnection = (connected) => {
    if (connected) {
      // If successfully connected to Lit Network, navigate to dashboard
      router.push('/dashboard');
    } else {
      alert('Could not connect to Lit Network');
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      {connectedToLit && <LitConnector onConnected={handleLitConnection} />}
    </div>
  );
}
