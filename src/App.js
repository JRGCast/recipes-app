import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import ContextDrink from './context/ContextDrink';
import ContextFood from './context/ContextFood';
import Routes from './routes/routes';

function App() {
  const coveringStyle = {
    backgroundColor: 'rgb(60, 60, 60)',
    width: '150%',
    borderRadius: '10px',
    padding: '1em',
  };
  return (
    <div style={ coveringStyle }>
      <ContextFood>
        <ContextDrink>
          <Routes />
        </ContextDrink>
      </ContextFood>
    </div>
  );
}

export default App;

// import styled from 'styled-components';
// import React from 'react';

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// function App() {
//   return <AppContainer>Hello</AppContainer>;
// }

// export default App;
