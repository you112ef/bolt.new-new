import dedent from "dedent";

export default {
  SUGGESTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Management Portal Dashboard', 'Create Quiz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With Bolt.New 2.0',
  SIGNIN_SUBHEADING: 'To use Bolt you must log into an existing account or create one.',
  SIGNIN_AGREEMENT_TEXT: 'By using Bolt, you agree to the collection of usage data for analytics.',

  DEFAULT_FILE:{
    "/public/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`
    },
    "/src/App.tsx": {
      code: `import React from 'react';
  
  const App: React.FC = () => {
    return <h1>Hello, React + TypeScript!</h1>;
  };
  
  export default App;`
    },
    "/src/index.tsx": {
      code: `import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`
    },
    "/package.json": {
      code: `{
    "name": "react-ts-app",
    "version": "1.0.0",
    "main": "index.tsx",
    "dependencies": {
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
    },
    "devDependencies": {
      "typescript": "^5.0.0"
    }
  }`
    },
    "/tsconfig.json": {
      code: `{
    "compilerOptions": {
      "target": "ES6",
      "module": "ESNext",
      "jsx": "react-jsx",
      "strict": true
    }
  }`
    }
  },
  DEPENDENCY: {
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
    "next": "^13.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
  },
  PRICING_DESC:'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS:[
    {
      name:'Basic',
      tokens:'50K',
      value:50000,
      desc:'Ideal for hobbyists and casual users for light, exploratory use.',
      price:4.99
    },
    {
      name:'Starter',
      tokens:'120K',
      value:120000,
      desc:'Designed for professionals who need to use Bolt a few times per week.',
      price:9.99
    },
    {
      name:'Pro',
      tokens:'2.5M',
      value:2500000,
      desc:'Designed for professionals who need to use Bolt a few times per week.',
      price:19.99
    },
    {
      name:'Unlimted (License)',
      tokens:'Unmited',
      value:999999999,
      desc:'Designed for professionals who need to use Bolt a few times per week.',
      price:49.99
    }
  ]


}