import { Component } from '@angular/core';
import { ethers } from 'ethers';
import wavePortal from '../utils/WavePortal.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wave-project';
  currentAccount: any;
  contractAddress = '0x4AE65F8e872A5867747c8B963F8C4Fa7522B8Be0';
  contractABI = wavePortal.abi;
  constructor() {
    this.checkForWalletConnect();
  }

  async wave() {
      try {
      const ethereum = (window as any).ethereum;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(this.contractAddress, this.contractABI, signer);

        const count1 = await wavePortalContract['wave']();
        const count2 = await wavePortalContract['getTotalWaves']();

        console.log('Retrieved total wave count...', count2.toNumber());
      } else {
        console.log('Ethereum object doesnt exist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async  connectWallet() {
     try {
      const ethereum = (window as any).ethereum;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Connected', accounts[0]);
      this.currentAccount = accounts[0];
    } catch (error) {
      console.log(error);
    }
  }

  async checkForWalletConnect() {
    try {
      const ethereum = (window as any).ethereum;

      if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        this.currentAccount = account;
      } else {
        console.log('No authorized account found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
