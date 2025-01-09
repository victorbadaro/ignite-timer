import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from './Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
