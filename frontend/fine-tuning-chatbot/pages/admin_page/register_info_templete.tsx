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
            <h1>1. html입력 및 결과 확인</h1>
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
                    <h1 style={{textAlign:"center"}}>Parsed</h1>
                        <Button type="primary">Primary Button</Button>
                    <div ref={parsedHTML} style={{border:"1px solid black", minHeight:"500px"}}></div>
                </div>
            </div>
            <h1>2. 수집할 태그 종류 및 name입력 및 테스트</h1>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{width:"500px", height:"300px", marginRight:"30px"}}>
                {/* 1. 템플릿 명:  */}
                {/* <Input type="text" style={{width:"300px"}}></Input> */}
                <br /><br />
                태그 종류 및 속성 선택

                <br></br>
                <Select
                // defaultValue="input"
                placeholder= "수집할 태그를 선택하세요."
                style={{
                    width: 200,
                }}
                onChange={handleTagChange}
                options={[
                    {
                    value: 'input',
                    label: 'input',
                    },
                    {
                    value: 'select',
                    label: 'select',
                    },
                    {
                    value: 'textarea',
                    label: 'textarea',
                    },
                    
                ]}
                />
                {tagName === "input" && 
                    <Select
                    // defaultValue="input"
                    placeholder= "input태그의 type을 선택하세요"
                    style={{
                        width: 200,
                    }}
                    onChange={handleTypeChange}
                    options={[
                        {
                        value: 'text',
                        label: 'text',
                        },
                        {
                        value: 'radio',
                        label: 'radio',
                        },
                        {
                        value: 'checkbox',
                        label: 'checkbox',
                        },
                        {
                        value: 'date',
                        label: 'date',
                        },
                        {
                        value: 'email',
                        label: 'email',
                        },
                        {
                        value: 'range',
                        label: 'range',
                        },
                        
                    ]}
                    />
                }

                </div>
                <div style={{width:"500px", marginLeft:"30px", border:"1px solid black"}}>
                    
                </div>
            </div>
        </div>
    );
}

export default Info_page;