<script>
import ButtonPrimary from "@/creditcar/shared/components/button-primary.component.vue";
import {PaymentApiService} from "@/creditcar/payments/services/payment-api.service";
import {creditcarApiService} from "@/creditcar/shared/services/creditcar-api.service";
import router from "@/router";
import {CashFlowsApiService} from "@/creditcar/payments/services/cash-flows-api.service";
import * as events from "events";

export default {
  name: "payment-estimator",
  components: {ButtonPrimary},
  data() {
    return {
      creditcarApi: null,
      vehicle: null,
      simulator: new PaymentApiService(),
      cashFlowApi: new CashFlowsApiService(),
      currency: "USD",
      rateType: "effective",
      selectedRate: "daily",
      selectedPeriod: "annual",
      rateValue: null,
      closingDate: 24,
      totalGracePeriod: null,
      partialGracePeriod: null,
      initialFee: 20,
      creditFee: null,
      finalFee: 0,
      creditLifeInsurance: null,
      vehicleInsurance: null,
      formInvalid: true,
      formattedRateValue: 0,
      vehicleId: null,
      user_id: 0,
      decimalRate: 0,
      cashFlows: [],
      paymentQuantity: 0,
      paymentData: null,
      selectedDecision: "keep",
      clientName: "",
      clientLastName: "",
      clientDni: null,
      cok: null

    }
  },
  methods: {
    calculateEffectiveMonthlyRate() {
      this.decimalRate = this.rateValue/100;
      let rateType = this.rateType;
      let selectedRate = this.selectedRate;
      let m = 0;
      let n = 0;
      let selectedPeriod = this.selectedPeriod;
      let effectiveMonthlyRate = 0;
      if(rateType === "effective"){
        if(selectedPeriod === "daily"){
          effectiveMonthlyRate = Math.pow((1 + this.decimalRate), 30) - 1;
        } else if(selectedPeriod === "monthly"){
          effectiveMonthlyRate = this.decimalRate;
        } else if(selectedPeriod === "bimonthly"){
          effectiveMonthlyRate = Math.pow((1 + this.decimalRate), 1/2) - 1;
        } else if(selectedPeriod === "quarterly"){
          effectiveMonthlyRate = Math.pow((1 + this.decimalRate), 1/3) - 1;
        } else if (selectedPeriod === "four-month"){
          effectiveMonthlyRate = Math.pow((1+ this.decimalRate), 1/4) - 1;
        } else if(selectedPeriod === "semiannual"){
          effectiveMonthlyRate = Math.pow((1 + this.decimalRate), 1/6) - 1;
        } else if(selectedPeriod === "annual"){
          effectiveMonthlyRate = Math.pow((1 + this.decimalRate), 1/12) - 1;
        }
      } else if(rateType === "nominal"){
        if(selectedPeriod === "daily"){
          if (selectedRate === "daily"){
            m=1;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=1/15;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=1/30;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=1/60;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=1/90;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=1/120;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1/180;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/360;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        }  else if(selectedPeriod === "biweekly"){
          if (selectedRate === "daily"){
            m=15;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=1;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=1/2;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=1/4;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=1/6;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=1/8;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1/12;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/24;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        } else if(selectedPeriod === "monthly"){
          if (selectedRate === "daily"){
            m=30;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=2;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=1;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=1/2;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=1/3;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=1/4;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1/6;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/12;
            n=1/12;
          }
          effectiveMonthlyRate = this.decimalRate;
        } else if(selectedPeriod === "bimonthly"){
          if (selectedRate === "daily"){
            m=60;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=4;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=2;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=1;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=2/3;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=2/4;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1/3;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/6;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        } else if(selectedPeriod === "quarterly"){
          if (selectedRate === "daily"){
            m=90;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=6;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=3;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=3/2;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=1;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=3/4;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1/2;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/4;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        } else if(selectedPeriod === "four-month"){
          if (selectedRate === "daily"){
            m=120;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=8;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=4;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=2;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=4/3;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=1;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=2/3;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/3;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        } else if(selectedPeriod === "semiannual"){
          if (selectedRate === "daily"){
            m=180;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=12;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=6;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=3;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=2;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=3/2;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=1;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1/2;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        } else if(selectedPeriod === "annual"){
          if (selectedRate === "daily"){
            m=360;
            n=30;
          } else if (selectedPeriod === "biweekly"){
            m=24;
            n=2;
          } else if (selectedPeriod === "monthly"){
            m=12;
            n=1;
          } else if (selectedPeriod === "bimonthly"){
            m=6;
            n=1/2;
          } else if (selectedPeriod === "quarterly"){
            m=4;
            n=1/3;
          } else if (selectedPeriod === "four-month"){
            m=3;
            n=1/4;
          } else if (selectedPeriod === "semiannual"){
            m=2;
            n=1/6;
          } else if (selectedPeriod === "annual"){
            m=1;
            n=1/12;
          }
          effectiveMonthlyRate = (Math.pow((1 + this.decimalRate/m), n) - 1);
        }
      }
      this.formattedRateValue = effectiveMonthlyRate;
      console.log("Effective Monthly Rate", effectiveMonthlyRate);
    },
    calculateCashFlow(){
      this.calculateEffectiveMonthlyRate();

      let monthlyInterestRate = this.formattedRateValue;
      const initialInvestment = this.initialFee/100 * this.vehicle.price;
      let creditFee = this.creditFee/100 * this.vehicle.price; //convert it to percentage y valor del credito
      let creditLifeInsurance = this.creditLifeInsurance/100; //convert it to percentage
      let vehicleInsurance = this.vehicleInsurance/100 * this.vehicle.price;//other costs is constant among the schedule
      let totalPayments = this.closingDate;//number of payments
      const totalGracePeriod = this.totalGracePeriod;//always considered at the start of the cashflow if there is no total grace period value 0
      const partialGracePeriod = this.partialGracePeriod;//always considered immediately after the totalGracePeriod if there is no partial grace period value 0
      let gracePeriodType = "";
      //let initialCredit = 0;

      // Calcular el monto del préstamo neto después de la cuota inicial y los cargos adicionales
      let netLoanAmount = creditFee;

      // Construir el array de flujos de efectivo
      const cashFlows = [];

      // Calcular los pagos regulares con el método francés
      let interestPayment = 0;
      let amortization = 0;
      let totalPayment = 0;
      let quota = 0;
      let calculatedCreditLifeInsurance = 0;
      for (let i = 1; i <= totalPayments; i++) {
        creditFee = netLoanAmount;
        if (i<=totalGracePeriod){
          console.log("Net Loan Amount Total before", netLoanAmount);
          interestPayment = netLoanAmount * monthlyInterestRate;
          calculatedCreditLifeInsurance = creditLifeInsurance*netLoanAmount;
          totalPayment = calculatedCreditLifeInsurance+vehicleInsurance;
          cashFlows.push(-(totalPayment));
          netLoanAmount += interestPayment;
          gracePeriodType = "T";
          console.log("Net Loan Amount Total After", netLoanAmount)
        }
        else if (i>totalGracePeriod && i<=partialGracePeriod+totalGracePeriod){
          console.log("Net Loan Amount Partial", netLoanAmount);
          interestPayment = netLoanAmount * monthlyInterestRate;
          calculatedCreditLifeInsurance = creditLifeInsurance*netLoanAmount;
          totalPayment = calculatedCreditLifeInsurance+vehicleInsurance+interestPayment;
          cashFlows.push(-(totalPayment));
          gracePeriodType = "P";
        }
        else if (i>=partialGracePeriod+totalGracePeriod){
          //console.log("Net Loan Amount", netLoanAmount);
          if (i===totalGracePeriod+partialGracePeriod+1){
            quota = (netLoanAmount*(monthlyInterestRate+creditLifeInsurance))/(1-Math.pow((1+(monthlyInterestRate + creditLifeInsurance)),-totalPayments+totalGracePeriod+partialGracePeriod))
            console.log("Quota", quota)
          }
          calculatedCreditLifeInsurance = creditLifeInsurance*netLoanAmount;
          interestPayment = netLoanAmount * monthlyInterestRate;
          totalPayment = quota + vehicleInsurance;
          cashFlows.push(-totalPayment); // Pago mensual, considerando que es una salida de efectivo (negativo)

          // Calcular la amortización
          amortization = quota - interestPayment-calculatedCreditLifeInsurance;
          // Actualizar el saldo pendiente después del pago
          if(i===totalPayments){
            netLoanAmount = 0;
          }else{
            netLoanAmount -= amortization;
          }
          gracePeriodType = "N";
        }

        this.createCashFlow(i, this.decimalRate, gracePeriodType, creditFee, monthlyInterestRate,
             amortization, quota,interestPayment, calculatedCreditLifeInsurance, vehicleInsurance, netLoanAmount, -totalPayment);
      }

      this.postCashFlow();
      console.log("Cash Flows: ", cashFlows);
      return cashFlows;
    },
    calculateVAN(initialInvestment, cashFlows, COK) {
      console.log("Initial Investment", initialInvestment);
      let van = initialInvestment; // Invertir el flujo de caja inicial
      let vna = 0;
      for (let i = 0; i < cashFlows.length; i++) {
        console.log("Cash Flows Van", cashFlows[i]);
        vna += cashFlows[i] / Math.pow(1 + COK, i + 1);
      }
      console.log("NPV", vna);
      van += vna;
      console.log("VAN antes de *100", van);
      return van;
    },
    calculateTIR(cashFlows) {
      const tolerance = 0.0001; // Tolerancia para la precisión de la aproximación
      let lowerBound = -1.0;
      let upperBound = 1.0;
      let guess = (lowerBound + upperBound) / 2;

      let irr = 0;

      for (let i = 0; i < 100; i++) { // Número máximo de iteraciones (ajusta según sea necesario)
        let npv = 0;

        for (let j = 0; j < cashFlows.length; j++) {
          npv += cashFlows[j] / Math.pow(1 + guess, j);
        }

        if (Math.abs(npv) < tolerance) {
          irr = guess;
          break;
        } else if (npv > 0) {
          upperBound = guess;
        } else {
          lowerBound = guess;
        }

        guess = (lowerBound + upperBound) / 2;
      }

      return irr*100;
    },
    calculateTCEA(tirMensual) {
      // Convierte la TIR mensual a tasa decimal
      const tirDecimal = tirMensual / 100;

      // Calcula la TCEA usando la fórmula
      const tcea = Math.pow(1 + tirDecimal, 12) - 1;
      return tcea*100;
    },
    handleSubmit() {
      if (this.validateForm()) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = currentDate.toLocaleDateString(undefined, options);
        let dataToSend;
        let cashFlow = this.calculateCashFlow();
        const van = this.calculateVAN(this.creditFee/100*this.vehicle.price, cashFlow, this.cok/100);
        const cashFlowTIR = [this.creditFee/100*this.vehicle.price, ...cashFlow]
        const tir = this.calculateTIR(cashFlowTIR);
        const tcea = this.calculateTCEA(tir);
        let vehicleId = this.$route.params.id;
        //convert to int vehicle id from string to int
        vehicleId = parseInt(vehicleId);
        console.log(this.user_id);
        dataToSend = {
          userId: this.user_id,
          clientFirstName: this.clientName,
          clientLastName: this.clientLastName,
          clientDni: this.clientDni,
          currency: this.currency,
          rateType: this.rateType,
          selectedRate: this.selectedRate,
          selectedPeriod: this.selectedPeriod,
          rateValue: this.rateValue,
          closingDate: this.closingDate,
          totalGracePeriod: this.totalGracePeriod,
          partialGracePeriod: this.partialGracePeriod,
          initialFee: this.initialFee,
          finalFee: this.finalFee,
          creditLifeInsurance: this.creditLifeInsurance,
          vehicleInsurance: this.vehicleInsurance,
          vehicleId: vehicleId,
          createDate: formattedDate,
          formattedRateValue: this.formattedRateValue,
          van: van,
          tir: tir,
          tcea: tcea,
          id: this.paymentQuantity + 1,
          cok: this.cok,
          selectedDecision: this.selectedDecision
        }
        this.simulator.create(dataToSend)
            .then((response) => {
              console.log("Data", dataToSend)
              console.log(response);
              if (this.formInvalid) {
                router.push(`/generated-payment/${response.data.id}`);
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
    createCashFlow(number, annualInterestRate, gracePeriod, initialBalance,
                   periodInterestRate, amortization, quota, interestPayment, lifeInsurance, vehicularInsurance, finalbalance,flow){
      let cashFlowData = {
        number: number,
        annualInterestRate: annualInterestRate,
        periodInterestRate: periodInterestRate,
        gracePeriod: gracePeriod,
        initialBalance: initialBalance,
        interestPayment: interestPayment,
        amortization: amortization,
        quota: quota,
        lifeInsurance: lifeInsurance,
        vehicularInsurance: vehicularInsurance,
        finalBalance: finalbalance,
        flow: flow,
        paymentId: this.paymentQuantity + 1
      };
      this.cashFlows.push(cashFlowData);
    },
    postCashFlow(){
      let createCashFlows = async() => {
        const promises = []
        for (let i = 0; i < this.cashFlows.length; i++){
          const request = this.cashFlowApi.create(this.cashFlows[i]).then((response) => {
            if (response.status === 500){
              console.log('XD');
            }
            else {
              console.log(response.data);
            }
          }).catch((error) => {
            console.log(error);
          });
          promises.push(request);

          //await new Promise(resolve => setTimeout(resolve, 500))
        }
        //await Promise.all(promises);
      }
      createCashFlows();
    },
    changeCurrency() {
      this.currency = (this.currency === 'USD' ? 'Soles' : 'USD');
    },
    changeRateType() {
      if (this.rateType === 'effective') {
        this.rateType = 'nominal';
      } else {
        this.rateType = 'effective';
      }
    },
    changeClosingDate() {
      if (this.closingDate === 24) {
        this.closingDate = 36;
      } else {
        this.closingDate = 24;
      }
    },
    changeFinalFee(){
      this.finalFee = 100 - this.initialFee - this.creditFee;
      return this.finalFee;
    },
    resetScrollbar() {
      window.scrollTo(0, 0);
    },
    validateForm() {
      this.formInvalid = this.currency &&
          this.rateType &&
          this.selectedRate &&
          this.selectedPeriod &&
          this.rateValue > 0 &&
          this.closingDate > 0 &&
          this.creditFee > 0 &&
          this.creditLifeInsurance > 0 &&
          this.vehicleInsurance > 0;
      return this.formInvalid;
    },
    formatPrice(value){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    }
  },
  created() {
    this.creditcarApi = new creditcarApiService();
    const vehicleId = this.$route.params.id;
    this.creditcarApi.getVehiclesById(vehicleId).then((response) => {
      this.vehicle = response.data[0];
    });
    this.creditcarApi.getNames().then((response) => {
      this.user_id = response.data[0].user_id;
    });
    this.simulator.getAll().then((response) => {
      this.paymentData = response.data;
      this.paymentQuantity = this.paymentData.length;
    })

  },
  mounted() {
    this.resetScrollbar();
  },
}
</script>

<template>
  <div class="max-w-4xl mx-5 md:mx-auto mt-4">
    <div class="lg:flex text-center md:text-left">
      <div class="lg:w-1/2 flex flex-column justify-center md:ml-5">
        <div>
          <p class="text-4xl leading-snug">Planifica la compra de tu <br> <b>{{ vehicle.brand }}</b> {{vehicle.model }}</p>
          <hr class="division mb-3">
        </div>
        <p class="font-normal">Desde {{ formatPrice(vehicle.price) }}</p>
      </div>
      <div class="lg:w-1/2 p-1">
        <div class="items-center justify-right">
          <div class="flex justify-center items-center">
            <img :src="vehicle.image" alt="car_image">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto">
    <pv-card class="card mt-0 md:mx-50 md:px-5">
      <template #content>
        <form class="pt-3 px-5" @submit.prevent="handleSubmit">
          <ol>
            <li class="mb-6">
              <p class="text-lg mb-2">Ingresa los datos del cliente</p>
              <label for="client-name" class="font-normal mb-2">1.1 Ingresa los nombres del cliente</label>
              <pv-input-text
                  inputId="client-name"
                  name="client-name"
                  required
                  placeholder="Nombres"
                  class="w-full border rounded-md mb-5"
                  v-model="clientName">
              </pv-input-text>
              <label for="client-last-name" class="font-normal mb-2">1.2 Ingresa los apellidos del cliente</label>
              <pv-input-text
                  inputId="client-last-name"
                  name="client-last-name"
                  required
                  placeholder="Apellidos"
                  class="w-full border rounded-md mb-5"
                  v-model="clientLastName">
              </pv-input-text>
              <label for="client-dni" class="font-normal mb-2">1.3 Ingresa el DNI del cliente</label>
              <pv-input-number
                  inputId="client-dni"
                  name="client-dni"
                  min="0"
                  required
                  placeholder="DNI"
                  class="w-full border rounded-md"
                  :useGrouping="false"
                  v-model="clientDni">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <p class="text-lg mb-2">Elige el tipo de moneda</p>
              <div class="flex space-x-3 items-center">
                <input type="radio"
                       id="usd"
                       name="currency"
                       checked
                       class="cursor-pointer"
                       :value="currency"
                       @input="changeCurrency">
                <label for="usd">Dólares ($)</label>
                <input type="radio"
                       id="soles"
                       name="currency"
                       class="cursor-pointer"
                       :value="currency"
                       @input="changeCurrency">
                <label for="soles">Soles (S/)</label>
              </div>
            </li>
            <li class="mb-6">
              <p class="text-lg mb-2">Elige la tasa de interés a trabajar</p>
              <div class="flex space-x-4 mb-4 items-center">
                <input type="radio"
                       id="effective"
                       name="rate-type"
                       checked
                       class="cursor-pointer"
                       :value="rateType"
                       @input="changeRateType">
                <label for="effective">Efectiva</label>
                <input type="radio"
                       id="nominal"
                       name="rate-type"
                       class="cursor-pointer"
                       :value="rateType"
                       @input="changeRateType">
                <label for="nominal">Nominal</label>
              </div>
              <div class="mb-3">
                <p class="font-normal mb-2"> 3.1.1 Plazo de Tasa: </p>
                <div>
                  <select class="font-bold mb-2 bg-[--red] text-white border-round p-2 cursor-pointer"
                          v-model="selectedPeriod" id="periodOptions">
                    <option class="text-[--red] bg-white" value="daily">Diaria</option>
                    <option class="text-[--red] bg-white" value="biweekly">Quincenal</option>
                    <option class="text-[--red] bg-white" value="monthly">Mensual</option>
                    <option class="text-[--red] bg-white" value="bimonthly">Bimestral</option>
                    <option class="text-[--red] bg-white" value="quarterly">Trimestral</option>
                    <option class="text-[--red] bg-white" value="four-month">Cuatrimestral</option>
                    <option class="text-[--red] bg-white" value="semiannual">Semestral</option>
                    <option class="text-[--red] bg-white" value="annual">Anual</option>
                  </select>
                </div>
              </div>
              <div v-if="rateType === 'nominal'" class="mb-3">
                <p class="font-normal mb-2"> 3.1.2 Con capitalización:</p>
                <div>
                  <select class="font-bold mb-2 bg-[--red] text-white border-round p-2 cursor-pointer"
                          v-model="selectedRate" id="rateOptions">
                    <option class="text-[--red] bg-white" value="daily">Diaria</option>
                    <option class="text-[--red] bg-white" value="biweekly">Quincenal</option>
                    <option class="text-[--red] bg-white" value="monthly">Mensual</option>
                    <option class="text-[--red] bg-white" value="bimonthly">Bimestral</option>
                    <option class="text-[--red] bg-white" value="quarterly">Trimestral</option>
                    <option class="text-[--red] bg-white" value="four-month">Cuatrimestral</option>
                    <option class="text-[--red] bg-white" value="semiannual">Semestral</option>
                    <option class="text-[--red] bg-white" value="annual">Anual</option>
                  </select>
                </div>
              </div>
              <label for="rate-value" class="font-normal mb-2">3.2 Ingresa la tasa de interés</label>
              <pv-input-number
                  inputId="rate-value"
                  suffix="%"
                  name="rate-value"
                  placeholder="Tasa de interés (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  :maxFractionDigits="4"
                  v-model="rateValue">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <label for="closing-date" class="text-lg mb-2">¿Cuál es el plazo de pago?</label>
              <div class="flex space-x-4 mb-4 items-center">
                <input type="radio"
                       id="24"
                       name="closing-date"
                       checked
                       class="cursor-pointer"
                       :value="closingDate"
                       @input="changeClosingDate">
                <label for="24">24 meses</label>
                <input type="radio"
                       id="36"
                       name="closing-date"
                       class="cursor-pointer"
                       :value="closingDate"
                       @input="changeClosingDate">
                <label for="36">36 meses</label>
              </div>
            </li>
            <li class="mb-6">
              <p class="text-lg  mb-2">Selecciona el período de gracia</p>
              <label for="total-grace-period" class="font-normal mb-5">5.1 Ingresa el número de cuotas sobre las cuales
                aplica el período de gracia total</label>
              <pv-input-number
                  inputId="total-grace-period"
                  suffix=" cuotas"
                  name="total-grace-period"
                  placeholder="0"
                  required
                  min="0"
                  :max="closingDate-partialGracePeriod"
                  class="w-full border rounded-md mb-5"
                  v-model="totalGracePeriod">
              </pv-input-number>

              <label for="partial-grace-period" class="font-normal mb-2">5.2 Ingresa el número de cuotas sobre las
                cuales aplica el período de gracia parcial</label>
              <pv-input-number
                  inputId="partial-grace-period"
                  suffix=" cuotas"
                  name="partial-grace-period"
                  placeholder="0"
                  required
                  min="0"
                  :max="closingDate-totalGracePeriod"
                  class="w-full border rounded-md"
                  v-model="partialGracePeriod">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <p class="text-lg mb-2">Financiamiento</p>
              <p class=" mb-3 font-normal">6.1 Cuota inicial preestablecida: {{parseFloat(initialFee).toFixed(2)}}%</p>
              <label for="final-fee" class=" mb-2">6.2 ¿Cuál es el porcentaje del crédito a financiar?</label>
              <pv-input-number
                  inputId="final-fee"
                  suffix="%"
                  name="final-fee"
                  placeholder="Crédito a financiar (%)"
                  required
                  min="30"
                  max="40"
                  class="w-full border rounded-md"
                  :maxFractionDigits="4"
                  v-model="creditFee">
              </pv-input-number>
              <p class=" mt-3 mb-4 font-bold">6.3 Cuota final calculada: {{parseFloat(changeFinalFee()).toFixed(2)}}%</p>
              <label for="cok-percent" class="font-normal mb-2">6.4 ¿Cuál es la tasa de costo de oportunidad (COK)? </label>
              <pv-input-number
                  inputId="cok-percent"
                  suffix="%"
                  name="cok-percent"
                  placeholder="Tasa de costo de oportunidad (%)"
                  required
                  min="0"
                  max="100"
                  class="w-full border rounded-md"
                  :maxFractionDigits="4"
                  v-model="cok">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <label for="credit-life-insurance" class="text-lg mb-2">¿Cuál es la tasa del seguro de
                desgravamen?</label>
              <pv-input-number
                  inputId="credit-life-insurance"
                  suffix="%"
                  name="credit-life-insurance"
                  placeholder="Tasa del seguro de desgravamen (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  :maxFractionDigits="4"
                  v-model="creditLifeInsurance">
              </pv-input-number>
            </li>
            <li class="mb-6">
              <label for="vehicle-life-insurance" class="text-lg mb-2">¿Cuál es la tasa del seguro vehicular?</label>
              <pv-input-number
                  inputId="vehicle-insurance"
                  suffix="%"
                  name="vehicle-insurance"
                  placeholder="Tasa del seguro vehicular (%)"
                  required
                  min="0"
                  class="w-full border rounded-md"
                  :maxFractionDigits="4"
                  v-model="vehicleInsurance">
              </pv-input-number>
            </li>
            <li>
              <p class="text-lg mb-2">¿Qué desea hacer el cliente con el vehículo tras finalizar el pago de las cuotas?</p>
              <div>
                <select class="font-bold mb-2 bg-[--red] text-white border-round p-2 cursor-pointer"
                        v-model="selectedDecision" id="selectedDecision">
                  <option class="text-[--red] bg-white" value="keep">Conservarlo</option>
                  <option class="text-[--red] bg-white" value="sell">Venderlo</option>
                  <option class="text-[--red] bg-white" value="change">Renovarlo</option>
                </select>
              </div>
            </li>
          </ol>
          <div class="text-center mt-6">
            <button-primary
                class="px-6 mb-3 font-bold"
                :text="'Generar plan de pagos'"
                :buttonColor="'var(--red)'"
                :buttonTextColor="'var(--white)'"
                :buttonBorderColor="'var(--red)'"
                type="submit"
                v-model="handleSubmit">
            </button-primary>
          </div>
          <p v-if="formInvalid === false" class="text-center text-[--red]">Por favor completa todos los campos antes de continuar</p>
        </form>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
* {
  font-family: var(--font-primary);
}

.card {
  border-radius: 20px;
}

h2, label, ol {
  color: var(--black);
  font-weight: bold;
}

input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 20%;
  border: 2px solid var(--red);
  outline: none;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: var(--red);
  border-color: var(--red);
}

ol {
  list-style: number;
}

.division {
  border-top: 2px solid var(--red);
  margin-bottom: 8px;
  margin-top: 8px;
}

</style>
