import styled from 'styled-components';

export const LayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5rem auto;
	padding: 2.5rem;
	max-width: 74rem;
	height: calc(100vh - 10rem);
	border-radius: 8px;
	background-color: ${props => props.theme['gray-800']};
`;
