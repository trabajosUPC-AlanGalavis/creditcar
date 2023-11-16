import http from "@/shared/services/http-common";

export class PaymentApiService {
    getAll() {
        return http.get("/cash_flows");
    }

    getById(id) {
        return http.get(`/cash_flows/${id}`);
    }

    create(data) {
        return http.post("/cash_flows", data);
    }

    getByUserId(id){
        return http.get(`/cash_flows?paymentId=${id}`);
    }

}