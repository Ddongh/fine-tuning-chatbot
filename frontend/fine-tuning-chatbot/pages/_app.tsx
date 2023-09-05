import { AppProps } from 'next/app';
import '../styles/lotto.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {
    // 커스텀 레이아웃을 여기에 추가할 수 있습니다.
    return(
        <div>
            {/* <h1>header</h1> */}
            <Component {...pageProps} />
            {/* <h1>footer</h1> */}
        </div>
        
    ); 
}

export default MyApp;
