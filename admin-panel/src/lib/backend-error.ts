export class AdminBackendUnavailableError extends Error {
  constructor(apiUrl: string) {
    super(
      `Unable to connect to the backend API at ${apiUrl}. Start the backend server and try again.`,
    );
    this.name = "AdminBackendUnavailableError";
  }
}

export function isBackendUnavailableError(
  error: unknown,
): error is AdminBackendUnavailableError {
  return (
    error instanceof AdminBackendUnavailableError ||
    (error instanceof Error && error.name === "AdminBackendUnavailableError")
  );
}
