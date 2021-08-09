import React from 'react';
import { mount } from '@cypress/react';
// import App from './App';
import LoginPg from '../../src/component/c1_pages/LogReg/LoginPg';

it('renders learn react link', () => {
  mount(LoginPg);

  cy.get('h2').contains("Login page");
  
  // cy.get('a').contains('Learn React');
});