import http from '../../shared/services/http-common';

export class creditcarApiService {
    getProfiles () {
        return http.get('/users');
    }

    getProfileById (id) {
        return http.get(`/users?id=${id}`);
    }

    getCars(){
        return http.get('/cars')
    }
}