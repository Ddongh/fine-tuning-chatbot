import { AppProps } from 'next/app';
// import '../styles/globals.css'; // 글로벌 CSS 파일을 여기서 임포트합니다.

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
