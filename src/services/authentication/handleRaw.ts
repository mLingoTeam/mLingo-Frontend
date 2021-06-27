
export default function handleRaw(response: any) {
    if (response.ok) {
        return response.json();
    }
    else {
        return false;
    }
}