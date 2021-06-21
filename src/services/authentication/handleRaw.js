
export default function handleRaw( response ) {
    if( response.ok ) {
        return response.json();
    }
    else{
        return false;
    }
}