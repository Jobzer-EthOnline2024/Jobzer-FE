'use client';  // This is a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WalletPage = () => {
    const router = useRouter();
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        // Get the wallet address from localStorage or pass it via query params
        const address = localStorage.getItem('walletAddress'); // Assuming you store the address in localStorage
        if (address) {
            setWalletAddress(address);
        } else {
            router.push('/'); // Redirect to home if no address is found
        }
    }, [router]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Wallet Address</h1>
            <p>{walletAddress ? walletAddress : 'No wallet address found.'}</p>
            <button onClick={() => router.push('/')}>Go Back</button>
        </div>
    );
};

export default WalletPage;
