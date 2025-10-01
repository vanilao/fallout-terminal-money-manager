# Product Requirements Document
## Fallout Terminal Money Manager

**Version:** 1.0  
**Date:** October 2025  
**Project Codename:** VAULT-FIN

---

## 1. Executive Summary

### 1.1 Product Vision
A retro-futuristic personal finance management application that transforms mundane money tracking into an engaging RPG experience through a Fallout-inspired terminal interface. Users interact with their finances via CLI commands while earning XP, unlocking lore, and progressing through a gamified financial journey.

### 1.2 Core Value Proposition
- **Engagement through Gamification**: Turn budgeting from a chore into an adventure
- **Nostalgic User Experience**: Leverage Fallout aesthetics to create memorable interactions
- **Habit Formation**: RPG mechanics encourage consistent financial tracking
- **Educational Entertainment**: Learn financial discipline through game mechanics

### 1.3 Target Audience
- **Primary**: Tech-savvy millennials/Gen-Z familiar with gaming culture
- **Secondary**: Fallout fans seeking themed productivity tools
- **Tertiary**: Finance enthusiasts looking for unique tracking methods

---

## 2. Product Architecture

### 2.1 Technical Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend Framework** | React 18+ with TypeScript | Type safety for CLI parsing, component reusability |
| **Styling** | TailwindCSS + Custom CSS | Utility classes for layout, custom terminal styling |
| **State Management** | Zustand | Lighter than Redux, perfect for medium complexity |
| **Local Storage** | Dexie.js (IndexedDB) | Offline-first, browser persistence |
| **Terminal Emulation** | Custom React Component | Full control over styling and behavior |
| **Build Tool** | Vite | Fast HMR, optimized builds |
| **Testing** | Vitest + React Testing Library | Unit and integration testing |
| **Future Backend** | Node.js + MongoDB Atlas | Cloud sync and multi-device support |

### 2.2 Data Architecture

```typescript
interface UserProfile {
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

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: Category;
  description: string;
  date: Date;
  tags: string[];
  xpEarned: number;
}

interface GameState {
  currentBalance: number;
  monthlyBudget: Budget;
  activeGoals: Goal[];
  shopPoints: number;
  terminalTheme: Theme;
  asciiPet?: ASCIIPet;
}
```

---

## 3. Core Features

### 3.1 Terminal Interface

#### 3.1.1 Boot Sequence
- **RobCo Industries** ASCII logo animation
- **Vault-Tec** system initialization messages
- Terminal phosphor glow effect
- Authentic boot sound effects
- System diagnostics readout

#### 3.1.2 Command Line Interface
```bash
VAULT-FIN TERMINAL v2.3.1
Copyright 2077 RobCo Industries
-Server 1-

> help
Available Commands:
  Financial:
    add <amount> <category> "<description>" [--date YYYY-MM-DD]
    spend <amount> <category> "<description>" [--recurring]
    transfer <amount> <from_account> <to_account>
    balance [--detailed]
    summary <period> [--export]
    
  Goals:
    goal create <name> <target_amount> <deadline>
    goal progress <name>
    goal complete <name>
    
  Gaming:
    stats
    achievements
    shop
    inventory
    unlock <item_id>
    
  System:
    backup [--encrypt]
    restore <backup_id>
    settings
    theme <theme_name>
    clear
    exit
```

### 3.2 Financial Management

#### 3.2.1 Transaction Management
- **Smart Parsing**: Natural language input recognition
- **Category Auto-suggestion**: ML-based category prediction
- **Recurring Transactions**: Automated monthly entries
- **Multi-currency Support**: With real-time conversion
- **Receipt Attachment**: Base64 encoded image storage

#### 3.2.2 Analytics & Reporting
- **Visual Charts**: ASCII-rendered graphs
- **Spending Patterns**: Weekly/Monthly/Yearly analysis
- **Category Breakdown**: Pie charts in ASCII
- **Predictive Budgeting**: Based on historical data
- **Export Options**: CSV, JSON, PDF reports

### 3.3 Gamification System

#### 3.3.1 XP & Leveling
```
Level Formula: XP_Required = 100 * (level ^ 1.5)

XP Sources:
- Daily login: 10 XP
- Add transaction: 5 XP
- Complete daily budget: 25 XP
- Achieve weekly goal: 50 XP
- Unlock achievement: 100 XP
- Streak bonuses: 5 XP * streak_days
```

#### 3.3.2 Achievement System
| Achievement | Requirement | Reward |
|-------------|-------------|---------|
| **Penny Pincher** | Save 1000 baht | 100 XP + Badge |
| **Budget Master** | Stay under budget 30 days | 200 XP + Theme |
| **Vault Economist** | Track 100 transactions | 150 XP + ASCII Pet |
| **Caps Collector** | Reach level 10 | 300 XP + Lore Pack |
| **Financial Overseer** | Complete all tutorials | 250 XP + Custom Title |

#### 3.3.3 S.P.E.C.I.A.L. Stats
Adapt Fallout's S.P.E.C.I.A.L. system for finance:
- **S**aving: Bonus XP for savings deposits
- **P**lanning: Unlock advanced budget features
- **E**conomy: Better shop prices
- **C**onsistency: Streak multipliers
- **I**nvestment: Future feature unlock
- **A**nalysis: Detailed reports access
- **L**uck: Random daily bonuses

### 3.4 Shop & Unlockables

#### 3.4.1 Shop Items
```
VAULT-FIN SHOP
=====================================
THEMES:
  [100 pts] Amber Monochrome
  [150 pts] Nuclear Green
  [200 pts] Vault Blue
  [500 pts] Animated CRT

ASCII PETS:
  [300 pts] Dogmeat Jr.
  [400 pts] Radroach
  [600 pts] Mr. Handy

LORE PACKS:
  [250 pts] Vault 11 Financial Records
  [250 pts] Pre-War Economic Data
  [250 pts] RobCo Budget Protocols

UTILITIES:
  [50 pts]  Extra Backup Slot
  [75 pts]  Advanced Analytics
  [100 pts] Custom Command Alias
```

### 3.5 Lore Integration

#### 3.5.1 Narrative Framework
- User is a **Vault 111 Financial Officer**
- Each level unlocks new "terminal entries"
- Discover the vault's economic collapse story
- Hidden easter eggs referencing Fallout events

#### 3.5.2 Sample Lore Entries
```
> read log 001
=====================================
VAULT 111 FINANCIAL LOG #001
Date: October 23, 2077
Author: Overseer Thompson

Budget allocation meeting postponed due to 
"technical difficulties" with Vault-Tec HQ.
Residents growing concerned about food credit
distribution. Must maintain morale.

Note: Hydroponics reported 12% under budget.
Investigate tomorrow.
=====================================
```

---

## 4. User Experience Design

### 4.1 Visual Design

#### 4.1.1 Color Schemes
- **Primary**: Amber/Green phosphor (#00ff41)
- **Secondary**: Terminal brown (#3d2817)
- **Accent**: Vault blue (#41a7ff)
- **Warning**: Nuclear yellow (#ffff00)
- **Error**: Radiation red (#ff0000)

#### 4.1.2 Typography
- **Primary Font**: "Share Tech Mono" or "VT323"
- **Fallback**: System monospace
- **Size**: 14px base, responsive scaling

#### 4.1.3 ASCII Art Style
```
   _____     __  _______________   ________
  / ___/____/ / / /_  __/_  __/  / ____/  |
  \__ \/ __  / / / / /   / /    / /_  /  /
 ___/ / /_/ / /_/ / /   / /    / __/ /  /
/____/\__,_/\____/_/   /_/    /_/   /__/
```

### 4.2 Sound Design
- **Keyboard clicks**: Mechanical typewriter sounds
- **Command execution**: Terminal beep
- **Achievement unlock**: Vault door opening
- **Error**: Geiger counter click
- **Background**: Subtle ambient vault hum

---

## 5. Development Roadmap

### Phase 1: Foundation (Weeks 1-3)
- [ ] Project setup (Vite, React, TypeScript)
- [ ] Basic terminal UI component
- [ ] Command parser implementation
- [ ] Dexie.js integration
- [ ] Core financial commands (add, spend, balance)
- [ ] Basic data persistence

### Phase 2: Core Features (Weeks 4-6)
- [ ] Complete CRUD operations
- [ ] Category management
- [ ] Summary and reporting commands
- [ ] ASCII chart rendering
- [ ] Backup/restore functionality
- [ ] Settings system

### Phase 3: Gamification (Weeks 7-9)
- [ ] XP system implementation
- [ ] Level progression
- [ ] Achievement engine
- [ ] Daily streak tracking
- [ ] Basic shop system
- [ ] Points economy

### Phase 4: Polish & Content (Weeks 10-12)
- [ ] Theme system
- [ ] ASCII pets
- [ ] Lore entries
- [ ] Sound effects
- [ ] Boot animation
- [ ] Performance optimization

### Phase 5: Cloud Features (Weeks 13-16)
- [ ] MongoDB Atlas setup
- [ ] User authentication
- [ ] Data sync API
- [ ] Multi-device support
- [ ] Social features (leaderboards)
- [ ] Export/sharing capabilities

---

## 6. Success Metrics

### 6.1 User Engagement
- **DAU/MAU Ratio**: Target 40%
- **Average Session Duration**: >5 minutes
- **Commands per Session**: >10
- **7-Day Retention**: >60%
- **30-Day Retention**: >40%

### 6.2 Financial Impact
- **Transaction Tracking Rate**: 80% of daily expenses
- **Budget Adherence**: 20% improvement after 30 days
- **Goal Completion**: 50% of set goals achieved

### 6.3 Gamification Success
- **Achievement Unlock Rate**: 3 per week average
- **Shop Engagement**: 70% users make purchase
- **Level Progression**: Level 5 within first month

---

## 7. Risk Management

| Risk | Probability | Impact | Mitigation |
|------|------------|---------|------------|
| **CLI too complex** | Medium | High | Interactive tutorial, command suggestions |
| **Limited mobile UX** | High | Medium | Virtual keyboard, touch commands |
| **Data loss** | Low | High | Auto-backup, cloud sync |
| **Low engagement** | Medium | High | Push notifications, daily challenges |
| **Performance issues** | Low | Medium | Virtualization, lazy loading |

---

## 8. Future Enhancements

### 8.1 Advanced Features
- **Investment Tracking**: Stock portfolio in Vault-Tec style
- **Bill Splitting**: Multiplayer expense sharing
- **Crypto Integration**: "Nuka-Coin" portfolio
- **Voice Commands**: "Hey Vault-Tec"
- **AR Mode**: Project terminal in real space

### 8.2 Platform Expansion
- **Electron Desktop App**: Native performance
- **Mobile Apps**: React Native implementation
- **Browser Extension**: Quick transaction entry
- **API Platform**: Third-party integrations
- **Hardware Terminal**: Raspberry Pi version

### 8.3 Community Features
- **Vault Networks**: Join financial communities
- **Challenge Mode**: Compete with friends
- **Template Sharing**: Budget templates marketplace
- **Modding Support**: Custom themes and commands

---

## 9. Technical Specifications

### 9.1 Performance Requirements
- **Initial Load**: <3 seconds
- **Command Response**: <100ms
- **Data Sync**: <2 seconds
- **Offline Support**: Full functionality
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+

### 9.2 Security Requirements
- **Data Encryption**: AES-256 for sensitive data
- **Authentication**: JWT with refresh tokens
- **API Rate Limiting**: 100 requests/minute
- **Backup Encryption**: Optional password protection
- **PCI Compliance**: For future payment features

### 9.3 Accessibility
- **Screen Reader Support**: ARIA labels
- **Keyboard Navigation**: Full support
- **High Contrast Mode**: Alternative themes
- **Font Scaling**: Responsive to browser settings
- **Command Autocomplete**: For motor impairments

---

## 10. Conclusion

The Fallout Terminal Money Manager represents a unique intersection of financial technology and gaming culture. By transforming personal finance management into an engaging, story-driven experience, we aim to make budgeting not just tolerable, but genuinely enjoyable.

The phased approach ensures we can validate core assumptions early while building toward a comprehensive platform that could revolutionize how people interact with their finances.

**War never changes, but your spending habits can.**

---

## Appendix A: Command Reference

[Full command documentation would go here]

## Appendix B: API Specifications

[REST API documentation for future backend]

## Appendix C: Database Schema

[Complete IndexedDB and MongoDB schemas]