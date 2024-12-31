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
