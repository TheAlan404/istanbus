import ReactDOM from 'react-dom/client'
import { MantineProvider } from "@mantine/core";
import { IstanbusRouter } from "./routes/router";
import '@mantine/core/styles.css'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MantineProvider forceColorScheme="dark">
		<IstanbusRouter />
	</MantineProvider>,
)
