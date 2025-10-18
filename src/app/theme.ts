import { createTheme, type CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
	fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
	other: {
		linkColorLight: '#369cb0',
		linkColorDark: '#fff',
	},
});

export const resolver: CSSVariablesResolver = (theme) => ({
	variables: {},
	light: {
		'--mantine-color-link': theme.other.linkColorLight,
		'--mantine-color-body': '#fff',
	},
	dark: {
		'--mantine-color-link': theme.other.linkColorDark,
		'--mantine-color-body': '#272b33',
	},
});
