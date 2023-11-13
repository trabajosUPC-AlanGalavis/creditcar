import http from "@/shared/services/http-common";

export class PaymentApiService {
    getAll() {
        return http.get("/payments");
    }

    create(data) {
        return http.post("/payments", data);
    }

    getByUserId(id){
        return http.get(`/payments?userId=${id}`);
    }
}