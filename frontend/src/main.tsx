import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from "@mantine/core";
import { IstanbusRouter } from "./routes/router";
import '@mantine/core/styles.css'
import './style.css'

const theme = createTheme({
	fontFamily: "Lexend-VariableFont",
	components: {
		Tooltip: {
			defaultProps: {
				withArrow: true,
				color: "dark",
			},
			styles: {
				color: "var(--mantine-color-text)",
			},
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider forceColorScheme="dark" theme={theme}>
		<IstanbusRouter />
	</MantineProvider>,
)
