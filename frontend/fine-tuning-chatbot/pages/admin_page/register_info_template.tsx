import React, {useEffect, useState, ChangeEvent, useRef} from 'react';
import { Input, Select, Button, message, Upload } from "antd"
import { test } from 'node:test';

const Info_page: React.FC = () => {

    const [html, setHtml] = useState<string>(""); // HTML코드
    const [tagName, setTagName] = useState<string>("") // 수집할 태그 종류
    const [info, setInfo] = useState({});
    // const [parsedHTML_0, setParsedHTML_0] = useState<HTMLElement|null>(null);
    // const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const parsedHTML = useRef<HTMLDivElement | null>(null);
    

    const [activeTab, setActiveTab] = useState<string>('html');
    // const [html, setHtml] = useState<string>('');
    const [file, setFile] = useState('');

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    const addInfo = () => {
        // 현재 상태를 복사한 뒤 새로운 key와 value를 추가
        const updatedInfo = { ...info, newKey: 'newValue' };
    
        // 변경된 상태를 설정
        setInfo(updatedInfo);
    };

    // useEffect(() => {
    //     // HTML 파싱 로직
    //     if (parsedHTML.current) {
    //         const parser = new DOMParser();
    //         // const doc = parser.parseFromString(html.replaceAll("\n", "<br>"), 'text/html');
    //         const doc = parser.parseFromString(html, 'text/html');
    //         setParsedHTML_0(doc.documentElement);
    //         // 파싱된 HTML을 parsedHTML 요소에 설정
    //         // parsedHTML.current.innerHTML = '';
    //         // parsedHTML.current.appendChild(doc.documentElement);
    //     }
    // }, [html])
    

    const onHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger;
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

    const chkTagName = (t: HTMLInputElement | HTMLSelectElement) => {
        return t.tagName === "" ? false : true;
    }

    const test = () => {

        if(parsedHTML.current) {
            const tags = parsedHTML.current.querySelectorAll("input, select")
            
            tags.forEach((x: Element) => {
                if (x.tagName === "INPUT") {
                    const inputElement = x as HTMLInputElement;
                    if (inputElement.type === "text" || inputElement.type === "") { // text type
                        setInfo((prevInfo) => ({
                            ...prevInfo,
                            [inputElement.name || "name속성 추가 필요"]: inputElement.value,
                        }));
                    }
                } else if (x.tagName === "SELECT") {
                    const selectElement = x as HTMLSelectElement;
                    // <select> 처리
                    // 여기에 원하는 동작을 추가하세요
                }
              });
        } 
    }
    const buttonEvent = () => {
        alert("33333")
        }
    return (
        <div>
            <button onClick={buttonEvent}> 1111</button>
            {/* <h1>1. html입력 및 결과 확인</h1> */}
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{width:"500px", marginRight:"30px"}}>
                    <h1 style={{textAlign:"center"}}>HTML</h1>
                    <div>
                        <div className="tabs" style={{display:"flex"}}>
                            <div
                            className={`tab ${activeTab === 'html' ? 'active' : ''}`}
                            onClick={() => handleTabChange('html')}
                            >
                            HTML
                            </div>
                            <div
                            className={`tab ${activeTab === 'file' ? 'active' : ''}`}
                            onClick={() => handleTabChange('file')}
                            >
                            File
                            </div>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'html' && (
                            <textarea
                                style={{resize: 'none' }}
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                placeholder="이곳에 HTML을 입력하세요."
                            />
                            )}
                            {activeTab === 'file' && (
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.value)}
                            />
                            
                            )}
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                // beforeUpload={beforeUpload}
                                // onChange={handleChange}
                            ></Upload>
                        </div>
                    </div>
                </div>
                <div style={{width:"500px", marginLeft:"30px"}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ flex: 1, textAlign:"center"}}>Parsed</h1>
                        <Button type="primary" onClick={test}>Test</Button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: html }}  
                    ref={parsedHTML} 
                    style={{border:"1px solid black", height:"500px", overflowY:"auto", borderRadius:"10px" }} 
                    />

                </div>
            </div>
            <div style={{display:'flex', justifyContent: 'center', height:"500px"}}>
                <div style={{width:"500px", height:"300px", marginRight:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Error</h1>
                    <div style={{border:"1px solid black", minHeight:"300px"}}>

                    </div>
                </div>
                <div style={{width:"500px", height:"300px", marginLeft:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Result</h1>
                    <div className='result' style={{border:"1px solid black", minHeight:"300px", borderRadius:"10px"}}>
                        <table>
                            <thead>
                                <tr>
                                    <td>Tag Name</td>
                                    <td>Tag Value</td>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.entries(info).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value as string}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info_page;