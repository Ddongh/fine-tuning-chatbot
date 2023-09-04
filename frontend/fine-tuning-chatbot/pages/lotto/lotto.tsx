import React from "react";
// import SelectNumber from "@/components/lotto/SelectNumber";

const lotto: React.FC = () => {

	const lotto_numbers: number[] = Array.from({ length: 45 }, (_, index) => index + 1);

	return (
		<div>
		<h1>테이블 만들기</h1>
		<table style={{ width: '100%'}}>
			<tbody>
			<tr>
				<td width={"300px"}>
					{/* <div style={{whiteSpace: 'pre-wrap'}}> */}
					{lotto_numbers.map((number) => (
						<div style={{width: "30px", height:"45px", display: "inline-block", textAlign:"center", border:"1px solid #f56d6d", margin:"5px"}}>{number}</div>
					))}
					{/* </div> */}
				
				</td>
				<td>두번째 칸</td>
				<td>세번째 칸</td>
				<td>네번째 칸</td>
				<td>다섯번째 칸</td>
			</tr>
			</tbody>
		</table>
		</div>
	);
}

export default lotto