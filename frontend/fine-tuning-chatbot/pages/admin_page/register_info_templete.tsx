import React, {useEffect, useState, ChangeEvent, useRef} from 'react';
import { Input, Select, Button } from "antd"

const Info_page: React.FC = () => {

    const [html, setHtml] = useState<string>(""); // HTML코드
    const [tagName, setTagName] = useState<string>("") // 수집할 태그 종류
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const parsedHTML = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // HTML 파싱 로직
        if (parsedHTML.current) {
            const parser = new DOMParser();
            // const doc = parser.parseFromString(html.replaceAll("\n", "<br>"), 'text/html');
            const doc = parser.parseFromString(html, 'text/html');

            // 파싱된 HTML을 parsedHTML 요소에 설정
            parsedHTML.current.innerHTML = '';
            parsedHTML.current.appendChild(doc.documentElement);
        }
    }, [html])
    

    const onHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newHtmlValue: string = e.target.value;
        setHtml(newHtmlValue); 
    };
    
    const handleTagChange = (value: string) => {
        setTagName(value);
    }
    const handleTypeChange = (value: string) => {
        // setTagName(value);
        console.log(value);
    }
    return (
        <div>
            {/* <h1>1. html입력 및 결과 확인</h1> */}
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{width:"500px", marginRight:"30px"}}>
                    <h1 style={{textAlign:"center"}}>HTML</h1>
                    <textarea 
                    style={{height:"500px"}} 
                    ref={textareaRef} 
                    value={html} 
                    onChange={onHtmlChange} 
                    placeholder="이곳에 HTML을 입력하세요."
                    />    
                </div>
                <div style={{width:"500px", marginLeft:"30px"}}>
                    {/* <h1 style={{textAlign:"center"}}>Parsed</h1>
                    <Button type="primary">Primary Button</Button> */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ flex: 1, textAlign:"center" }}>Parsed</h1>
                        <Button type="primary">Test</Button>
                    </div>
                    <div ref={parsedHTML} style={{border:"1px solid black", minHeight:"500px"}}></div>
                </div>
            </div>
            {/* <h1>2. 수집할 태그 종류 및 name입력 및 테스트</h1> */}
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{width:"500px", height:"300px", marginRight:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Error</h1>
                    <div style={{border:"1px solid black", minHeight:"300px"}}>

                    </div>

                </div>
                <div style={{width:"500px", height:"300px", marginLeft:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Result</h1>
                    <div style={{border:"1px solid black", minHeight:"300px"}}>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Info_page;