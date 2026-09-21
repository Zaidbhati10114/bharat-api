export async function fetchPincode(code: string) {
    const start = performance.now();

    const response = await fetch(`/api/v1/pincode/${code}`);

    const data = await response.json();

    return {
        data,
        status: response.status,
        time: Math.round(performance.now() - start),
    };
}