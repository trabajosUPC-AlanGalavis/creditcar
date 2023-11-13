import http from '../../../shared/services/http-common';

export class creditcarApiService {
    getUsers () {
        return http.get('/users');
    }

    getUserById (id) {
        return http.get(`/users?id=${id}`);
    }

    getUserByEmail (email) {
        return http.get(`/users?email=${email}`);
    }

    getVehicles(){
        return http.get('/vehicles')
    }

    getVehiclesById(id){
        return http.get(`/vehicles?id=${id}`)
    }

    create(type, data) {
        return http.post(`/${type}`, data);
    }

    getNames(){
        return http.get('/names')
    }

    deleteName(){
        return http.delete(`/names/1`)
    }
}