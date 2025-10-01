import React, { useState, useEffect, useRef } from 'react';
import type { TerminalState, TerminalOutput } from '../types';
import { useLogin } from './LoginPrompt';

interface TerminalProps {
  onCommand?: (command: string) => void;
  initialOutput?: TerminalOutput[];
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, initialOutput = [] }) => {
  const [terminalState, setTerminalState] = useState<TerminalState>({
    isBooted: false,
    isLocked: false,
    commandHistory: [],
    currentCommand: '',
    output: initialOutput,
    cursorPosition: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasBooted = useRef(false);

  // Login hook
  const login = useLogin({
    onLoginSuccess: (username: string) => {
      setIsLoggedIn(true);
      completeBootSequence(username);
    },
    onOutput: (output: TerminalOutput) => {
      setTerminalState(prev => ({
        ...prev,
        output: [...prev.output, output],
      }));
    },
    isTyping,
  });

  // Boot sequence effect
  useEffect(() => {
    // Prevent duplicate boot sequences in StrictMode
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = async () => {
      setIsTyping(true);
      
      // RobCo Industries header
      await typeText('ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM');
      await delay(500);
      await typeText('COPYRIGHT 2075-2077 ROBCO INDUSTRIES');
      await delay(500);
      await typeText('-Server 1-');
      await delay(1000);
      
      // Login/Register prompt first
      await typeText('VAULT-FIN Terminal v2.3.1');
      await delay(300);
      await typeText('Access restricted to authorized Vault personnel only.');
      await delay(500);
      await typeText('Do you have an account?');
      await delay(300);
      await typeText('Type "register" to create new account or "login" to sign in:');
      await delay(200);
      
      setIsTyping(false);
      
      // Focus input for login
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    bootSequence();
  }, []);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const typeText = async (text: string) => {
    const newOutput: TerminalOutput = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'system',
      content: text,
      timestamp: new Date(),
    };

    setTerminalState(prev => ({
      ...prev,
      output: [...prev.output, newOutput],
    }));

    // Scroll to bottom
    setTimeout(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const completeBootSequence = async (username: string) => {
    setIsTyping(true);
    
    await typeText(`Welcome, ${username}.`);
    await delay(500);
    await typeText('Initializing VAULT-FIN Terminal...');
    await delay(800);
    await typeText('Loading financial protocols...');
    await delay(600);
    await typeText('Establishing secure connection...');
    await delay(700);
    await typeText('Loading personal financial data...');
    await delay(800);
    await typeText('Synchronizing with Vault database...');
    await delay(600);
    await typeText('System ready.');
    await delay(500);
    await typeText('VAULT-FIN Terminal ready.');
    await delay(300);
    await typeText('Type "help" for available commands.');
    await delay(300);
    
    setTerminalState(prev => ({ ...prev, isBooted: true }));
    setIsTyping(false);
    
    // Focus input after boot
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isTyping) return;

    const command = terminalState.currentCommand.trim();
    if (!command) return;

    // Handle login process
    if (login.isLoginActive() && !isLoggedIn) {
      login.handleLoginCommand(command, () => {
        setTerminalState(prev => ({ ...prev, currentCommand: '' }));
      });
      return;
    }

    // If terminal isn't booted yet, just clear the command
    if (!terminalState.isBooted) {
      setTerminalState(prev => ({ ...prev, currentCommand: '' }));
      return;
    }

    // Add command to output
    const commandOutput: TerminalOutput = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'command',
      content: `> ${command}`,
      timestamp: new Date(),
    };

    setTerminalState(prev => ({
      ...prev,
      output: [...prev.output, commandOutput],
      commandHistory: [...prev.commandHistory, command],
      currentCommand: '',
    }));

    // Execute command
    if (onCommand) {
      onCommand(command);
    } else {
      // Default command handling
      handleDefaultCommand(command);
    }

    // Focus input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleDefaultCommand = (command: string) => {
    let response = '';
    
    switch (command.toLowerCase()) {
      case 'help':
        response = `Available Commands:
  Financial:
    add <amount> <category> "<description>" [--date YYYY-MM-DD]
    spend <amount> <category> "<description>" [--recurring]
    balance [--detailed]
    summary <period> [--export]
    
  Goals:
    goal create <name> <target_amount> <deadline>
    goal progress <name>
    
  Gaming:
    stats
    achievements
    shop
    inventory
    
  System:
    clear
    exit`;
        break;
      case 'clear':
        setTerminalState(prev => ({ ...prev, output: [] }));
        return;
      case 'exit':
        response = 'Terminal session ended. Goodbye, Vault Dweller.';
        break;
      default:
        response = `Command not found: ${command}. Type "help" for available commands.`;
    }

    if (response) {
      const responseOutput: TerminalOutput = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'response',
        content: response,
        timestamp: new Date(),
      };

      setTerminalState(prev => ({
        ...prev,
        output: [...prev.output, responseOutput],
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Command history navigation (to be implemented)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Command history navigation (to be implemented)
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 p-8">
      <div className="terminal-casing w-3/4 max-w-6xl h-4/5 max-h-3xl flex flex-col bg-black rounded-lg shadow-2xl">
        {/* Terminal Screen */}
        <div className="terminal-screen flex-1 flex flex-col relative overflow-hidden rounded-t-lg">
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
          <div className="h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="terminal-scroll flex-1 p-4 pb-20 overflow-y-auto text-terminal-green font-mono text-base leading-tight"
          style={{ fontFamily: 'VT323, monospace', fontSize: '18px' }}
        >
          {terminalState.output.map((output) => (
            <div
              key={output.id}
              className={`mb-1 ${
                output.type === 'command' 
                  ? 'text-terminal-green font-bold' 
                  : output.type === 'error'
                  ? 'text-radiation-red'
                  : output.type === 'system'
                  ? 'text-vault-blue'
                  : 'text-terminal-green'
              }`}
            >
              {output.content}
            </div>
          ))}
        </div>

        {/* Fixed Command Input Line at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-600">
          <form onSubmit={handleCommandSubmit} className="flex items-center">
            <span 
              className="text-terminal-green font-bold mr-2"
              style={{ fontFamily: 'VT323, monospace', fontSize: '18px' }}
            >
              &gt;
            </span>
            <input
              ref={inputRef}
              type={(login.loginState.isPasswordPrompt || login.loginState.isConfirmPasswordPrompt) ? "password" : "text"}
              value={terminalState.currentCommand}
              onChange={(e) => setTerminalState(prev => ({ ...prev, currentCommand: e.target.value }))}
              onKeyDown={handleKeyDown}
              className="terminal-input flex-1 bg-transparent outline-none"
              style={{ fontFamily: 'VT323, monospace', fontSize: '18px' }}
              placeholder={login.getPlaceholder()}
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
            />
            {login.shouldShowCursor() && (
              <div className="terminal-cursor w-2 h-5 ml-1"></div>
            )}
          </form>
        </div>
      </div>

        {/* Terminal Base Panel */}
        <div className="terminal-base h-16 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-between px-4 border-t border-gray-600 rounded-b-lg">
          {/* Speaker Grilles */}
          <div className="flex space-x-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-8 bg-gray-600 rounded"></div>
            ))}
          </div>

          {/* Power Button */}
          <button className="power-button">
            POWER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
