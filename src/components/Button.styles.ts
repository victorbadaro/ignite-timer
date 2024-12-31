import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
	variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
	margin: 8px;
	border: 0;
	border-radius: 4px;
	width: 100px;
	height: 40px;
	background-color: ${props => props.theme['green-500']};
	color: ${props => props.theme.white};
`;
