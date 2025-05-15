import Router from "./router";

import ThemeProvider from "./layout/provider/Theme";

const App = () => {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
};
export default App;