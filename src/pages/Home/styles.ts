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

export const BaseCountdownButton = styled.button`
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

	transition: background-color 200ms;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
	background-color: ${props => props.theme['green-500']};
	color: ${props => props.theme['gray-100']};

	&:not(:disabled):hover {
		background-color: ${props => props.theme['green-700']};
	}
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
	background-color: ${props => props.theme['red-500']};
	color: ${props => props.theme['gray-100']};

	&:not(:disabled):hover {
		background-color: ${props => props.theme['red-700']};
	}
`;
