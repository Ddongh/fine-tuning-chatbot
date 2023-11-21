import React, { useState, useEffect } from 'react';

const Practice: React.FC = () => {
    const [txt, setTxt] = useState<string | null>("")
    useEffect(() => {
        const testTxt: string = "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세"
        setTxt(testTxt)

    }, [])



    return (
        <div style={{display: 'grid', placeItems: 'center', height: '100vh'}} >
            <table>
                <tbody>
                    <tr>
                        <td>동해물과 백두산이 마르고 닳도록</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" style={{width:'100%'}} />
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
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

