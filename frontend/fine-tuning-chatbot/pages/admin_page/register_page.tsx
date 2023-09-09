import React, {useEffect, useState, ChangeEvent, useRef} from 'react';

const Info_page: React.FC = () => {

    const [html, setHtml] = useState<string>(""); // HTML코드
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const parsedHTML = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // HTML 파싱 로직
        if (parsedHTML.current) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html.replaceAll("\n", "<br>"), 'text/html');

            // 파싱된 HTML을 parsedHTML 요소에 설정
            parsedHTML.current.innerHTML = '';
            parsedHTML.current.appendChild(doc.documentElement);

            // 높이 비교 후 스크롤 표시
            // if (textareaRef.current && parsedHTML.current) {
            //     const textareaHeight = textareaRef.current.scrollHeight;
            //     const parsedHtmlHeight = parsedHTML.current.scrollHeight;

            //     if (parsedHtmlHeight > textareaHeight) {
            //         parsedHTML.current.style.overflowY = 'scroll';
            //     } else {
            //         parsedHTML.current.style.overflowY = 'hidden';
            //     }
            // }
        }
    }, [html])
    

    const onHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newHtmlValue: string = e.target.value;
        setHtml(newHtmlValue); 
        
        // textarea 높이 자동 조절
        // if (textareaRef.current) {
        //     textareaRef.current.style.height = 'auto';
        //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        // }
      };

    return (
        <div>
            <div>
                
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <div>
                        <h1>HTML</h1>
                    </div>
                    <div>
                        <h1>Parsed</h1>
                    </div>
                </div>
                
                {/* <div>
                <div>
                    <div>
                    <textarea ref={textareaRef} value={html} onChange={onHtmlChange} />
                    </div>
                    <div>
                    <div ref={parsedHTML}></div>
                    </div>
                </div>
                </div> */}
            </div>
        </div>
        // <div className="wrapper">
        //     <table>
        //         <thead>
        //             <tr className="tac">
        //                 <td>HTML</td>
        //                 <td>Parsing</td>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>
        //                     <textarea ref={textareaRef} value={html} onChange={onHtmlChange} />    
        //                 </td>
        //                 <td>
        //                     <div ref={parsedHTML} className='w100'></div>
        //                 </td>
        //             </tr>
                    

        //         </tbody>
        //     </table>
        // </div>
        
    );
}

export default Info_page;