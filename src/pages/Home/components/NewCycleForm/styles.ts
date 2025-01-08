import styled from 'styled-components';

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

	&::-webkit-calendar-picker-indicator {
		display: none !important;
	}
`;

export const MinutesAmountInput = styled(BaseInput)`
	width: 4rem;
`;
