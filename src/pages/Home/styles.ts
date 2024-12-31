import styled from 'styled-components';

export const HomeContainer = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5rem;
	}
`;

export const FormContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;
	font-size: 1.125rem;
	font-weight: bold;
	color: ${props => props.theme['gray-100']};
`;

const BaseInput = styled.input`
	padding: 0 0.5rem;
	height: 2.5rem;
	border: 0;
	border-bottom: 2px solid ${props => props.theme['gray-500']};
	font-weight: bold;
	font-size: 1.125rem;
	background: transparent;
	color: ${props => props.theme['gray-100']};

	&:focus {
		box-shadow: none;
		border-color: ${props => props.theme['green-500']};
	}

	&::placeholder {
		color: ${props => props.theme['gray-500']};
	}
`;

export const TaskInput = styled(BaseInput)`
	flex: 1;
`;

export const MinutesAmountInput = styled(BaseInput)`
	width: 4rem;
`;

export const CountdownContainer = styled.div`
	display: flex;
	gap: 1rem;
	font-family: "Roboto Mono", sans-serif;
	font-size: 10rem;
	line-height: 8rem;
	color: ${props => props.theme['gray-100']};

	span {
		padding: 2rem 1rem;
		border-radius: 8px;
		background-color: ${props => props.theme['gray-700']};
	}
`;

export const Separator = styled.div`
	display: flex;
	justify-content: center;
	padding: 2rem 0;
	width: 4rem;
	overflow: hidden;
	color: ${props => props.theme['green-500']};
`;

export const StartCountdownButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 1rem;
	width: 100%;
	border: 0;
	border-radius: 8px;
	font-weight: bold;
	cursor: pointer;
	background-color: ${props => props.theme['green-500']};
	color: ${props => props.theme['gray-100']};

	transition: background-color 200ms;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background-color: ${props => props.theme['green-700']};
	}
`;
