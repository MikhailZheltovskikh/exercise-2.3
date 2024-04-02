import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const OPERATOR = [
		{
			id: 1,
			action: 'add',
			content: '+',
			func: (number1, number2) => number1 + number2,
		},
		{
			id: 2,
			action: 'subtract',
			content: '-',
			func: (number1, number2) => number1 - number2,
		},
		{
			id: 3,
			action: 'multiply',
			content: '*',
			func: (number1, number2) => number1 * number2,
		},
		{
			id: 4,
			action: 'divide',
			content: '÷',
			func: (number1, number2) => number1 / number2,
		},
	];

	const [operand1, setOperand1] = useState('0');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	let result = operand1 + operator + operand2;

	const resultCalculate = (operator) => {
		setIsClicked(true);
		if (!operand2) {
			setOperand1('0');
			setOperator('');
		}

		if (operator) {
			const selectedOperator = OPERATOR.find((item) => item.content === operator);
			const result = selectedOperator.func(Number(operand1), Number(operand2));
			setOperand1(result);
			setOperand2('');
			setOperator('');
		}
	};
	return (
		<div className={styles.App}>
			<div className={styles.calculator}>
				<div
					className={`${styles['calculator__display']} ${isClicked ? styles['calculator__display--active'] : ''}`}
				>
					{result}
				</div>
				<div className={styles['calculator__keys']}>
					{OPERATOR.map((item) => (
						<button
							className={styles['key--operator']}
							data-action={item.action}
							key={item.id}
							onClick={() => {
								setIsClicked(false);
								setOperator(item.content);
							}}
						>
							{item.content}
						</button>
					))}

					{NUMS.map((number) => (
						<button
							key={number}
							onClick={() => {
								setIsClicked(false);
								if (operator === '') {
									if (operand1 === '0') {
										setOperand1(number);
									} else {
										setOperand1(operand1 + number);
									}
								} else {
									if (operand2 === '0') {
										setOperand2(number);
									} else {
										setOperand2(operand2 + number);
									}
								}
							}}
						>
							{number}
						</button>
					))}

					<button
						onClick={() => {
							setOperand1('0');
							setOperator('');
							setOperand2('');
							setIsClicked(false);
						}}
					>
						AC
					</button>
					<button
						className={styles['key--equal']}
						onClick={() => {
							resultCalculate(operator);
						}}
					>
						=
					</button>
				</div>
			</div>
		</div>
	);
};
