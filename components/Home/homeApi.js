import { helpers } from '../../utils/helpers';

async function getUsers() {
    try {
        const payload={
            path : 'users'
        };
        let response = await helpers.secureFetch(payload);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export const home = {getUsers};