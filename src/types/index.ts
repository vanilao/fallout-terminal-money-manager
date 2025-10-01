// Core data interfaces based on PRD specifications

export interface UserProfile {
  vaultDwellerId: string;
  username: string;
  createdAt: Date;
  lastLogin: Date;
  loginStreak: number;
  totalXP: number;
  level: number;
  achievements: Achievement[];
  unlockedContent: UnlockedItem[];
  preferences: UserPreferences;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: Category;
  description: string;
  date: Date;
  tags: string[];
  xpEarned: number;
}

export interface GameState {
  currentBalance: number;
  monthlyBudget: Budget;
  activeGoals: Goal[];
  shopPoints: number;
  terminalTheme: Theme;
  asciiPet?: ASCIIPet;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  reward: Reward;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface UnlockedItem {
  id: string;
  type: 'theme' | 'pet' | 'lore' | 'utility';
  name: string;
  description: string;
  unlockedAt: Date;
  isActive: boolean;
}

export interface UserPreferences {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
  autoBackup: boolean;
  commandAliases: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  isDefault: boolean;
}

export interface Budget {
  id: string;
  month: number;
  year: number;
  categories: BudgetCategory[];
  totalIncome: number;
  totalExpenses: number;
  savings: number;
}

export interface BudgetCategory {
  categoryId: string;
  budgetedAmount: number;
  spentAmount: number;
  remainingAmount: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  isCompleted: boolean;
  completedAt?: Date;
  xpReward: number;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    error: string;
    background: string;
  };
  font: string;
  effects: {
    glow: boolean;
    scanlines: boolean;
    crt: boolean;
  };
}

export interface ASCIIPet {
  id: string;
  name: string;
  ascii: string[];
  animations: string[][];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  isActive: boolean;
}

export interface Reward {
  xp: number;
  points: number;
  item?: UnlockedItem;
  badge?: string;
}

export interface Command {
  name: string;
  description: string;
  usage: string;
  category: 'financial' | 'goals' | 'gaming' | 'system';
  aliases: string[];
  execute: (args: string[]) => Promise<CommandResult>;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
  xpEarned?: number;
}

export interface TerminalState {
  isBooted: boolean;
  isLocked: boolean;
  currentUser?: UserProfile;
  commandHistory: string[];
  currentCommand: string;
  output: TerminalOutput[];
  cursorPosition: number;
}

export interface TerminalOutput {
  id: string;
  type: 'command' | 'response' | 'error' | 'system';
  content: string;
  timestamp: Date;
  xpEarned?: number;
}

// S.P.E.C.I.A.L. Stats for gamification
export interface SPECIALStats {
  saving: number;      // Bonus XP for savings deposits
  planning: number;    // Unlock advanced budget features
  economy: number;     // Better shop prices
  consistency: number; // Streak multipliers
  investment: number;  // Future feature unlock
  analysis: number;    // Detailed reports access
  luck: number;        // Random daily bonuses
}

// Shop item interface
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'theme' | 'pet' | 'lore' | 'utility';
  category: string;
  isUnlocked: boolean;
  requirements?: {
    level?: number;
    achievements?: string[];
    special?: Partial<SPECIALStats>;
  };
}

// Lore entry interface
export interface LoreEntry {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'vault' | 'pre-war' | 'robco' | 'personal';
  isUnlocked: boolean;
  unlockRequirements: {
    level?: number;
    achievements?: string[];
    shopPoints?: number;
  };
}
