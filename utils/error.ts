export const getErrorMessage = (error: unknown): string => {
    return typeof error === 'object' && error !== null ? String((error as any).message) : String(error)
}