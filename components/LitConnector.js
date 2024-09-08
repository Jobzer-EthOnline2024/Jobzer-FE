'use client';  // Make this a Client Component since it's interacting with the Lit network.

import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNetwork } from '@lit-protocol/constants';

const LitConnector = async () => {
      try {
        console.log('Connecting to Lit Network...');
        const client = new LitJsSdk.LitNodeClient({
          litNetwork: LitNetwork.DatilDev,
          debug: true,
        });
        
        await client.connect();
        console.log('Connected to Lit Network');
      } catch (error) {
        console.error('Failed to connect to Lit Network:', error);
      }

  return <div>Connecting to Lit Network..</div>;
};

export default LitConnector;
