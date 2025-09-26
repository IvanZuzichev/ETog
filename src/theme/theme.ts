export interface Theme {
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    footerheaderBg: string; 
    footerheaderText: string;
    buttonBg?: string;
    buttonText?: string;
  };
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#7b1fa2',
    background: '#ffffff',
    text: '#000000',
    footerheaderBg: '#7b1fa2',
    footerheaderText: '#ffffff',
    buttonBg: '#e6e6e6',
    buttonText: '#000000'
  }
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#1e1e1e',
    background: '#121212',
    text: '#ffffff',
    footerheaderBg: '#1e1e1e',
    footerheaderText: '#ffffff',
    buttonBg: '#333333',
    buttonText: '#ffffff'
  }
};

export type ThemeName = 'light' | 'dark';