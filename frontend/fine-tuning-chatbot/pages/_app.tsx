import { AppProps } from 'next/app';
import { Menu } from 'antd';
import '../styles/lotto.css';
import '../styles/style.css';

const { Item } = Menu;

function MyApp({ Component, pageProps }: AppProps) {
    // 커스텀 레이아웃을 여기에 추가할 수 있습니다.
    return(
        // <div style={{height:"100%"}}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* <h1>header</h1> */}
            <Menu mode="horizontal" theme="dark">
                <Item key="home">Home</Item>
                <Item key="about">About</Item>
                <Item key="contact">Contact</Item>
            </Menu>
            <div style={{ flex: 1 }}>
                <Component {...pageProps} />
            </div>
            {/* <h1>footer</h1> */}
        </div>
        
    ); 
}

export default MyApp;
