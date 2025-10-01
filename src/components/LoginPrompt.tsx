import { useState } from 'react';
import type { TerminalOutput } from '../types';

interface LoginState {
  isRegisterPrompt: boolean;
  isUsernamePrompt: boolean;
  isPasswordPrompt: boolean;
  isConfirmPasswordPrompt: boolean;
  currentUser: string;
  currentPassword: string;
  loginAttempts: number;
}

interface UseLoginProps {
  onLoginSuccess: (username: string) => void;
  onOutput: (output: TerminalOutput) => void;
  isTyping: boolean;
}

export const useLogin = ({ onLoginSuccess, onOutput, isTyping }: UseLoginProps) => {
  const [loginState, setLoginState] = useState<LoginState>({
    isRegisterPrompt: true,
    isUsernamePrompt: false,
    isPasswordPrompt: false,
    isConfirmPasswordPrompt: false,
    currentUser: '',
    currentPassword: '',
    loginAttempts: 0,
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const typeText = async (text: string) => {
    const newOutput: TerminalOutput = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'system',
      content: text,
      timestamp: new Date(),
    };
    onOutput(newOutput);
    await delay(200);
  };

  const handleLoginCommand = (command: string, clearInput: () => void) => {
    // Determine if this is a password field
    const isPasswordField = loginState.isPasswordPrompt || loginState.isConfirmPasswordPrompt;
    
    // Add command to output (mask password with asterisks)
    const commandOutput: TerminalOutput = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'command',
      content: `> ${isPasswordField ? '*'.repeat(command.length) : command}`,
      timestamp: new Date(),
    };
    onOutput(commandOutput);
    
    // Clear the input field
    clearInput();

    // Handle register/login choice prompt
    if (loginState.isRegisterPrompt) {
      const choice = command.toLowerCase().trim();
      if (choice === 'register' || choice === 'r') {
        setLoginState(prev => ({ 
          ...prev, 
          isRegisterPrompt: false,
          isUsernamePrompt: true
        }));
        
        setTimeout(async () => {
          await typeText('Creating new Vault Dweller account...');
          await delay(300);
          await typeText('Username:');
        }, 100);
      } else if (choice === 'login' || choice === 'l') {
        setLoginState(prev => ({ 
          ...prev, 
          isRegisterPrompt: false,
          isUsernamePrompt: true
        }));
        
        setTimeout(async () => {
          await typeText('Username:');
        }, 100);
      } else {
        const errorOutput: TerminalOutput = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'error',
          content: 'Please enter "register" or "login"',
          timestamp: new Date(),
        };
        onOutput(errorOutput);
      }
    }
    // Handle username prompt
    else if (loginState.isUsernamePrompt) {
      if (command.length > 0) {
        setLoginState(prev => ({ 
          ...prev, 
          currentUser: command,
          isUsernamePrompt: false,
          isPasswordPrompt: true
        }));
        
        // Show password prompt
        setTimeout(async () => {
          await typeText('Password:');
        }, 100);
      } else {
        // Invalid username
        const errorOutput: TerminalOutput = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'error',
          content: 'Invalid username. Please try again.',
          timestamp: new Date(),
        };
        onOutput(errorOutput);
      }
    }
    // Handle password prompt
    else if (loginState.isPasswordPrompt) {
      if (command.length > 0) {
        setLoginState(prev => ({ 
          ...prev, 
          currentPassword: command,
          isPasswordPrompt: false,
          isConfirmPasswordPrompt: true
        }));
        
        // Show confirm password prompt
        setTimeout(async () => {
          await typeText('Confirm Password:');
        }, 100);
      } else {
        // Invalid password
        const errorOutput: TerminalOutput = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'error',
          content: 'Invalid password. Please try again.',
          timestamp: new Date(),
        };
        onOutput(errorOutput);
      }
    }
    // Handle confirm password prompt
    else if (loginState.isConfirmPasswordPrompt) {
      if (command === loginState.currentPassword) {
        setLoginState(prev => ({ 
          ...prev, 
          isConfirmPasswordPrompt: false
        }));
        
        // Complete registration/login
        setTimeout(async () => {
          await typeText('Account verified. Welcome to VAULT-FIN!');
          await delay(500);
        }, 100);
        
        onLoginSuccess(loginState.currentUser);
      } else {
        // Password mismatch
        const errorOutput: TerminalOutput = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'error',
          content: 'Passwords do not match. Please try again.',
          timestamp: new Date(),
        };
        onOutput(errorOutput);
        
        // Reset to password prompt
        setLoginState(prev => ({ 
          ...prev, 
          isConfirmPasswordPrompt: false,
          isPasswordPrompt: true,
          currentPassword: ''
        }));
        
        setTimeout(async () => {
          await typeText('Password:');
        }, 100);
      }
    }
  };

  const isLoginActive = () => {
    return loginState.isRegisterPrompt || loginState.isUsernamePrompt || loginState.isPasswordPrompt || loginState.isConfirmPasswordPrompt;
  };

  const getPlaceholder = () => {
    if (isTyping) return "Initializing...";
    if (loginState.isRegisterPrompt) return "Enter 'register' or 'login'...";
    if (loginState.isUsernamePrompt) return "Enter username...";
    if (loginState.isPasswordPrompt) return "Enter password...";
    if (loginState.isConfirmPasswordPrompt) return "Confirm password...";
    return "Booting...";
  };

  const shouldShowCursor = () => {
    return !isTyping && isLoginActive();
  };

  const isPasswordField = (): boolean => {
    return loginState.isPasswordPrompt || loginState.isConfirmPasswordPrompt;
  };

  return {
    handleLoginCommand,
    isLoginActive,
    getPlaceholder,
    shouldShowCursor,
    isPasswordField,
    loginState
  };
};
