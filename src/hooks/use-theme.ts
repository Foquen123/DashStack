// import { useLayoutEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// // const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;

// // const defaultTheme: Theme = isDarkTheme ? 'dark' : 'light';
// const defaultTheme: Theme = 'light';
// console.log(defaultTheme);

// export const useTheme = () => {
//   const [theme, setTheme] = useState<Theme>(
//     (localStorage.getItem('app-theme') as Theme) || defaultTheme,
//   );

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   useLayoutEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     localStorage.setItem('app-theme', theme);
//   }, [theme]);

//   return { theme, setTheme, toggleTheme };
// };
