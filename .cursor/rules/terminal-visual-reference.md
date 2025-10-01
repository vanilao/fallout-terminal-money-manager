# Fallout Terminal Visual Reference

## Terminal Interface Design Elements

### Common Visual Characteristics
- **Color Scheme**: Green phosphor text (#00ff41) on dark background (#000000 or #001100)
- **Typography**: Monospace pixelated font with CRT glow effect
- **Screen**: Curved CRT appearance with visible scanlines
- **Casing**: Dark metallic/industrial design with horizontal grilles
- **Power Elements**: Red/orange square power buttons on bottom right
- **Branding**: RobCo Industries headers and copyright notices

### Terminal Layout Patterns

#### 1. System Headers
```
ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
COPYRIGHT 2075-2077 ROBCO INDUSTRIES
-Server [NUMBER]-
```

#### 2. Application Titles
- Dashed line separators: `-Application Name-`
- Version indicators: `(beta v.432)`
- Protocol names: `TERMALINK PROTOCOL`, `LIMBLINE PROTOCOL`

#### 3. Command Interface
- Prompt symbol: `>`
- Command structure: `> run:// [command]`
- System responses: `> LOG: [message]`
- Password prompts: `Please enter password for access...`

#### 4. User Interface Elements
- **Cursors**: 
  - Blinking green rectangular cursor for input
  - White block cursor for selection
- **Lists**: Items prefixed with `>` or `>>`
- **Status Indicators**: 
  - Attempt counters: `ATTEMPT(S) LEFT: [N]`
  - Warning messages: `!!! WARNING: LOCKOUT IMMINENT !!!`
- **Grid Layouts**: Hexadecimal addresses with data strings

### Hardware Design Elements

#### Terminal Casing
- **Base Panel**: Horizontal panel below screen
- **Speaker Grilles**: Circular holes or rectangular slots on left side
- **Power Button**: Square red/orange button on bottom right
- **Ventilation**: Horizontal grilles or slots
- **Industrial Aesthetic**: Dark, robust, metallic appearance

#### Screen Characteristics
- **CRT Effects**: Curved screen, scanlines, phosphor glow
- **Pixelation**: Low-resolution, blocky character rendering
- **Glow Effect**: Subtle halo around text characters
- **Contrast**: High contrast green on black background

### Interactive Elements

#### Password/Login Interfaces
- Attempt counters with visual blocks
- Hexadecimal address grids
- Status feedback: "ENTRY denied", "correct."
- Lockout warnings

#### Command Line Interfaces
- Blinking cursor at prompt
- Command history and responses
- System logs and user entries
- Multi-line text displays

#### Menu Systems
- Hierarchical lists with `>` prefixes
- Selectable options
- Status indicators and counters
- Navigation prompts

### Implementation Notes for VAULT-FIN

#### CSS Classes to Implement
```css
.terminal-screen {
  background: #000000;
  color: #00ff41;
  font-family: 'Share Tech Mono', 'VT323', monospace;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}

.terminal-header {
  border-bottom: 1px solid #00ff41;
  padding: 8px;
}

.terminal-prompt {
  color: #00ff41;
  font-weight: bold;
}

.terminal-cursor {
  background: #00ff41;
  animation: blink 1s infinite;
}

.crt-glow {
  text-shadow: 0 0 5px #00ff41;
}
```

#### React Components Structure
- `TerminalScreen`: Main container with CRT effects
- `TerminalHeader`: RobCo branding and system info
- `CommandLine`: Input handling with prompt
- `TerminalOutput`: Command responses and logs
- `TerminalCursor`: Blinking cursor component

#### Animation Effects
- Cursor blinking animation
- Typewriter effect for text rendering
- Phosphor glow on hover/focus
- Scanline overlay for CRT effect
- Boot sequence animations

This reference will guide the implementation of the Fallout-themed terminal interface for the VAULT-FIN money management application.
