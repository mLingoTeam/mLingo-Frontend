
// in future you can implement error display component
export default async function handleResponse ( { request, error_message } ) {

    const result = await request;

    if (result === false){
        alert( error_message );
        return false;
    }
    else{
        return result;
    }

}