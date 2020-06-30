import firestore from '@react-native-firebase/firestore';

async function securePost(payload) {
    try {
        const path=payload.path;
        const body=payload.body;

        const docRef= await firestore().collection(`${path}`).add(body);
        const id = docRef.id;
        Object.assign(body,{_id:id});
        await firestore().collection(`${path}`).doc(id).update(body);
        let output= await firestore().collection(`${path}`).where('_id', "==", id).get();

        let results = { "result": true, results: output , "message": " Data posted" };
        return results;
    }
     catch (error) {
        console.log('error in Posting data ',error);
        let results = { "result": false, "message": error.message };
        return results;
    }
}

async function secureFetch(payload) {
    try {
        const path=payload.path;
        const docs=[];
        
        let snap = await firestore().collection(`${path}`).get();
        await snap.forEach(doc => {
            docs.push(doc.data());
        });
        let results = { "result": true, "results": docs, "message": "Fetched Data" };
        return results;
    } 
    catch (error) {
        console.log('error in Fetching data ',error);
        let results = { "result": false, "message": error.message };
        return results;
    }
}

export const helpers = { securePost ,secureFetch}