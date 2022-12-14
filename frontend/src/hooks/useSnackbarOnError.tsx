import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { ApiError } from 'clients/CoreService';

export function extractErrorMessage(error: any) {
	const message =
		error instanceof ApiError && error.body.Message
			? error.body.Message
			: error instanceof Error
			? error.message
			: 'Unable to perform operation';

	return message;
}

export function useSnackbarOnError() {
	const snackbar = useSnackbar();
	return useCallback(
		(error: any) => {
			snackbar.enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
		},
		[snackbar],
	);
}
