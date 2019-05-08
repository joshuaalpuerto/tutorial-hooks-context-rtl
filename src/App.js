import React from 'react';
import styled from 'styled-components'
import SkillsPage from 'containers/SkillsPage'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

function App() {
  return (
    <AppWrapper>
      <SkillsPage />
    </AppWrapper>
  );
}

export default App;
