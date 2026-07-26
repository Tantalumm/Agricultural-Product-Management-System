export const getApiErrorMessage = async (response, fallbackMessage = "Something went wrong") => {
    let message = fallbackMessage;

    try {
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            const data = await response.json();
            if (typeof data === "string") {
                message = data;
            } else if (Array.isArray(data?.errors)) {
                message = data.errors.map((error) => error?.message || error).filter(Boolean).join(", ");
            } else if (data?.errors && typeof data.errors === "object") {
                message = Object.values(data.errors).flat().join(", ");
            } else {
                message = data?.message || data?.error || data?.detail || data?.title || fallbackMessage;
            }
        } else {
            const text = await response.text();
            message = text || fallbackMessage;
        }
    } catch (error) {
        message = fallbackMessage;
    }

    return message;
};

export const throwApiError = async (response, fallbackMessage) => {
    if (response.ok) return;

    const message = await getApiErrorMessage(response, fallbackMessage);
    throw new Error(message);
};
