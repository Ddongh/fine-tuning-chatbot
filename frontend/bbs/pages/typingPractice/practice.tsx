import React, { useState, useEffect } from 'react';

const Practice: React.FC = () => {
    const [totalTxt, setTotalTxt] = useState<string>(""); // 전체 문자열()
    const [typedTxt, setTypedTxt] = useState<string>(""); // 사용자가 입력한 문자열
    const [page, setPage] = useState<number>(0)
    const [correctTxt, setCorrectTxt] = useState({ // 각 줄에 표시될 문자열(정답)
        line1: "",
        line2: "",
        line3: "",
        line4: "",
    })


    useEffect(() => { // 사용자가 선택한 글 내용 업데이트
        const testTxt: string = "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세";
        setTotalTxt(testTxt);
        onPageChange(testTxt, 1, 20);        
    }, [])

    const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typedValue: string = e.target.value;
        setTypedTxt(typedValue);
    }

    const onPageChange = (txt: string, page: number, n: number) => {debugger;
        setCorrectTxt((prevCorrectTxt) => {
            return {
              ...prevCorrectTxt,
              line1: txt.slice((page - 1) * n, page * n),
              line2: txt.slice(page * n, (page + 1) * n),
              line3: txt.slice((page + 1) * n, (page + 2) * n),
              line4: txt.slice((page + 2) * n, (page + 3) * n),
            };
          });
    }



    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }} >
            <input type="text" name="typing" value={typedTxt} onChange={e => handleTypingChange(e)} />
            <table>
                <tbody>
                    <tr>
                        <td>{correctTxt.line1}</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" style={{ width: '100%' }} />
                        </td>
                    </tr>
                    <tr>
                        <td>{correctTxt.line2}</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>{correctTxt.line3}</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>{correctTxt.line4}</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Practice

