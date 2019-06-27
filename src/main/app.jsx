import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HashRouter } from 'react-router-dom';

import Routes from './routes';
import Header from '../common/components/template/header';
import SideBar from '../common/components/template/sideBar';
import Footer from '../common/components/template/footer';
import Messages from '../common/components/messages/messages'; 



const theme = createMuiTheme({
    typography: {
        htmlFontSize: 8,
    },
  });
  

export default class App extends Component {

    render() {
        return (
      
            <HashRouter>
                <div className='wrapper'>
                    <Header />
                    <SideBar />
                    <Routes />
                    {/* <Footer /> */}
                    <Messages />
                </div>
                
            </HashRouter> 
        )
    }
}

