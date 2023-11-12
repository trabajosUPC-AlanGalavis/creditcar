import http from '../../../shared/services/http-common';

export class creditcarApiService {
    getUsers () {
        return http.get('/users');
    }

    getUserById (id) {
        return http.get(`/users?id=${id}`);
    }

    getVehicles(){
        return http.get('/vehicles')
    }

    getVehiclesById(id){
        return http.get(`/vehicles?id=${id}`)
    }
}