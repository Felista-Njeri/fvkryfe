export interface Stat {
    title: string;
    value: string;
    trend: "up" | "down";
    change: string;
  }
  
  export interface AssetAllocation {
    name: string;
    value: number;
    usdValue: string;
    percentage: string;
    color: string;
  }
  
  export interface Activity {
    type: string;
    amount: string;
    vault: string;
    timestamp: string;
    status: string;
    txHash: string;
  }
  
  export interface Unlock {
    vault: string;
    amount: string;
    initialLockDate: string;
    lockPeriod: string;
    unlockDate: string;
    daysLeft: number;
  }