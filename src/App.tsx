import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes";
import {AppThemeProvider} from "./contexts";


const App: React.FC = () => {


    return (
        <AppThemeProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </AppThemeProvider>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));

export default App