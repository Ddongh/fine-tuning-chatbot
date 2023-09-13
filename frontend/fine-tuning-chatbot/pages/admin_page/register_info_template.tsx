import React, {useEffect, useState, ChangeEvent, useRef} from 'react';
import { Input, Select, Button, message, Upload, Modal } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { test } from 'node:test';

const Info_page: React.FC = () => {

    const [html, setHtml] = useState<string>(""); // HTML코드
    const [info, setInfo] = useState({});
    const parsedHTML = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState<string>('html');

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    const addInfo = () => {
        // 현재 상태를 복사한 뒤 새로운 key와 value를 추가
        const updatedInfo = { ...info, newKey: 'newValue' };
    
        // 변경된 상태를 설정
        setInfo(updatedInfo);
    };
     
    const handleUploadChange = (info: any) => {
        
        const reader = new FileReader();

        reader.onload = (e) => {

            if(info.file.type !== 'text/html') {
                message.warning("html형식의 파일만 업로드 가능합니다.")
                return
            }

            const htmlCode = e.target?.result as string;

            Modal.confirm({
                title: '확인',
                content: '작성한 html코드가 초기화됩니다. \n작업을 진행하시겠습니까?',
                onOk() {
                    // 확인 버튼 클릭 시 실행되는 콜백 함수
                    setActiveTab("html");
                    setHtml(htmlCode);
                },
                onCancel() {
                    // 파일 초기화
                    debugger;
                    
                    return false;
                },
            });
        };
        reader.readAsText(info.file.originFileObj);
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

    return (
        <div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{width:"500px", marginRight:"30px"}}>
                    {/* <h1 style={{textAlign:"center"}}>HTML</h1> */}
                    <div>
                        <div className="tabs" style={{display:"flex", alignItems:"center"}}>
                            <div style={{display:"flex", justifyContent:"flex-start"}}>
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
                            
                            <h1 style={{}}>HTML</h1>
                            <div style={{width:"150px"}} />

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
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={true}
                                    onChange={handleUploadChange}
                                >
                                    <div
                                        style={{
                                        marginTop: 8,
                                        }}
                                    >
                                        <PlusOutlined /><br />
                                        Upload
                                    </div>
                                </Upload>
                                </div>
                                
                            </div>
                            
                            )}
                        </div>
                    </div>
                </div>
                <div style={{width:"500px", marginLeft:"30px"}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{width:"56px"}} />
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