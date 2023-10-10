import { AppProps } from 'next/app';
// import TopNav from '@/components/TopNav';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
});
// import { Menu } from 'antd';
// import '../styles/lotto.css';
// import '../styles/style.css';

// const { Item } = Menu;

function MyApp({ Component, pageProps }: AppProps) {
    // 커스텀 레이아웃을 여기에 추가할 수 있습니다.
    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* <TopNav /> */}
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} >
                <div style={{ flex: 1 }}>
                    <Component {...pageProps} />
                </div>
            {/* <h1>footer</h1> */}
            </div>
        </ThemeProvider>
       
        
    ); 
}

export default MyApp;
