import React, { useState, useEffect, useRef } from "react";
import { Select, Button } from 'antd';

const Buy_lotto: React.FC = () => {

	const lottoNumbers: number[] = Array.from({ length: 45 }, (_, index) => index + 1); // 선택가능한 번호(1~45)
	const [choosenNumbers, setChoosenNumbers] = useState<number[]>([]); // 선택한 로또 번호를 담을 리스트0(번호 클릭시)
	const [choosenNumbers0, setChoosenNumbers0] = useState<number[]>([]); // 선택완료한 로또 번호를 담을 리스트0
	const [choosenNumbers1, setChoosenNumbers1] = useState<number[]>([]); // 선택완료한 로또 번호를 담을 리스트1
	const [choosenNumbers2, setChoosenNumbers2] = useState<number[]>([]); // 선택완료한 로또 번호를 담을 리스트2
	const [choosenNumbers3, setChoosenNumbers3] = useState<number[]>([]); // 선택완료한 로또 번호를 담을 리스트3
	const [choosenNumbers4, setChoosenNumbers4] = useState<number[]>([]); // 선택완료한 로또 번호를 담을 리스트4

	const lottoNumbersRef = useRef<HTMLTableCellElement | null>(null);

	useEffect(() => {
		choosenNumbers.map((number, key) => {
			const choosenNumber = document.querySelector<HTMLDivElement>("div[id=lottoNumbers" + number + "]");
			if(choosenNumber) {
				choosenNumber.style.backgroundColor = "gray";
			}
		})
	}, [choosenNumbers])
	
	const selectNumbers = () => {
		if(choosenNumbers.length < 6) {
			alert("6개를 선택해주세요.");
			return
		}
	}

	const chooseNumber = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		const currTarget = (e.currentTarget as HTMLDivElement);
		if(currTarget.style.backgroundColor === "") {
			if(choosenNumbers.length > 5) {
				alert("최대 6개의 숫자를 선택할 수 있습니다.");
				return
			}
			setChoosenNumbers((prevChoosenNumber) => [
				...prevChoosenNumber,
				parseInt(currTarget.getAttribute("data-number") || "-1"),
			]);
			// setChoosenNumber(choosenNumber.push(parseInt(currTarget.getAttribute("data-number")|| "-1")))
			
			// currTarget.style.backgroundColor = "gray"; // backgroundColor 변경
		} else {
			currTarget.style.backgroundColor = "";
		}
	  }

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<td>
							<table>
								<tbody>
									<tr>
										<td width={"300px"}>
											{lottoNumbers.map((number, key) => (
												<div id={`lottoNumbers${number}`} onClick={chooseNumber} data-number={number} key={key} style={{width: "30px", height:"45px", display: "inline-block", textAlign:"center", border:"1px solid #f56d6d", margin:"5px"}}>{number}</div>
											))}
										</td>
									</tr>
									<tr>
										<td>
											<div style={{width: "50px", height:"45px", display: "inline-block", textAlign:"center", border:"1px solid #f56d6d", margin:"5px"}}>
												초기화
											</div>
											<div style={{width: "60px", height:"45px", display: "inline-block", textAlign:"center", border:"1px solid #f56d6d", margin:"5px"}}>
												자동선택
											</div>
										</td>
									</tr>
									<tr>
										<td>
											적용수량
											<Select defaultValue="1" style={{ width: 120,}}
											//   onChange
											options={[
												{
												value: '1',
												label: '1',
												},
												{
												value: '2',
												label: '2',
												},
												{
												value: '3',
												label: '3',
												},
												{
												value: '4',
												label: '4',
												},
												{
												value: '5',
												label: '5',
												},
											]}
											/>
											<Button onClick={selectNumbers} type="primary">확인</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
						<td>
							<table>
								<tbody>
									<tr>

									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		
		</div>
	);
}

export default Buy_lotto