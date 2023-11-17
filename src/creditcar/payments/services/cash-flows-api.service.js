import http from "@/shared/services/http-common";

export class CashFlowsApiService {
    getAll() {
        return http.get("/cash_flows");
    }

    getById(id) {
        return http.get(`/cash_flows/${id}`);
    }

    create(data) {
        return http.post("/cash_flows", data);
    }

    getByPaymentId(id){
        return http.get(`/cash_flows?paymentId=${id}`);
    }

}