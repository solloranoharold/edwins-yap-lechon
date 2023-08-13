<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat dense dark color="green darken-2" v->
          <v-toolbar-title
            ><v-icon large>mdi-cart</v-icon>Checkout</v-toolbar-title
          >
          <v-spacer />
          <v-icon @click="close()">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <div v-if="type == 'buynow'">
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-center">Item</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td align="center">{{ data.product_name }}</td>
                    <td align="center">{{ data.quantity }}</td>
                    <td align="center">{{ data.total_price }}</td>
                  </tr>
                  <tr>
                    <td align="center">Shipping Fee</td>
                    <td></td>
                    <td align="center">{{ shipping_price }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td align="left" style="font-weight: bold">
                      PHP :
                      {{ total_computation ? total_computation.toFixed(2) : 0 }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
            <div v-else>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-center">Item</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in data" :key="i">
                    <td align="center">{{ item.product_name }}</td>
                    <td align="center">{{ item.quantity }}</td>
                    <td align="center">{{ item.total_price }}</td>
                  </tr>
                  <tr>
                    <td align="center">Shipping Fee</td>
                    <td></td>
                    <td align="center">{{ shipping_price }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td align="left" style="font-weight: bold">
                      PHP :
                      {{ total_computation ? total_computation.toFixed(2) : 0 }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </div>
            <v-divider />
            <br />
            <v-layout>
              <h3>Mode of Payment :</h3>
              <v-spacer />

              <v-radio-group v-model="typeOfPayment" small row>
                <v-radio label="GCASH" value="Gcash"></v-radio>
                <v-radio label="Cash on Delivery" value="COD"></v-radio>
              </v-radio-group>
            </v-layout>
            <div v-if="typeOfPayment == 'Gcash'">
              <center>
                <v-img max-width="400" src="../../public/img/gcash.jpg"></v-img>
              </center>
              <h3 class="text-center">UPLOAD YOUR RECEIPT HERE</h3>
              <h4 class="text-center">
                SEND HERE : <i style="color: blue">0997-7251-8667</i>
              </h4>

              <v-divider style="border: 1px solid" />
              <v-file-input
                v-model="file"
                @change="saveDocument()"
                placeholder="Upload your Receipt Image"
                label="File input"
                prepend-icon="mdi-paperclip"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </div>
            <v-btn
              @click="Proceed()"
              rounded
              block
              outlined
              dark
              color="green darken-2"
              :loading="loading"
              :disabled="loadimg == true"
            >
              <v-icon>mdi-cart</v-icon>PROCEED</v-btn
            >
            <h4 class="text-center" v-if="loadimg == true">
              WAIT FOR YOUR RECEIPT TO BE UPLOADED
            </h4>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: () => ({
    loading: false,
    total_computation: 0,
    shipping_price: 0,
    typeOfPayment: "",
    file: null,
    receipt: null,
    loadimg: false,
  }),
  props: ["dialog", "type", "data"],
  watch: {
    dialog(val) {
      if (val) {
        this.loadShippingFee();
        this.loadNotifications();
      }
    },
  },
  methods: {
    loadShippingFee() {
      axios
        .get(`${this.api}getShippingFee/${this.userInfo.shipping_id}`)
        .then((res) => {
          if (res.data) {
            // console.log(res.data)
            this.shipping_price = res.data[0].fees;

            if (this.type == "buynow") {
              this.total_computation =
                this.data.total_price + this.shipping_price;
            } else {
              let amount = 0;
              this.data.forEach((rec) => {
                amount += rec.total_price;
              });
              this.total_computation = amount + this.shipping_price;
            }
          }
        });
    },
    saveDocument() {
      if (this.file) {
        this.loadimg = true;
        let formdata = new FormData();
        let addObj = {};
        addObj.receipt =
          moment().format("YYYYMMDDHHmmss") + "_" + this.file.name;
        formdata.append("addObj", JSON.stringify(addObj));
        formdata.append("file", this.file);
        axios
          .post(`${this.api}uploadReceipt`, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              dataType: "json",
            },
          })
          .then((res) => {
            this.loadimg = false;
            this.receipt = addObj.receipt;
            console.log(res.data);
          });
      }
    },
    Proceed() {
      if (!this.typeOfPayment) {
        alert("Please select MODE OF PAYMENT");
        return false;
      }
      if (this.typeOfPayment == "Gcash") {
        if (!this.file) {
          alert("Please upload your receipt first!");
          return false;
        }
      } else {
        this.receipt = null;
        this.file = null;
      }
      if (confirm("Are you sure you want to order this item/s")) {
        this.loading = true;
        let order = {
          data: this.data,
          type: this.type,
          total: this.total_computation,
          receipt: this.receipt,
          shipping: this.shipping_price,
          payment: this.typeOfPayment,
          account: this.userInfo.acc_id,
          fullname: this.userInfo.fullname,
        };
        axios.post(`${this.api}proceedPayment`, order).then((res) => {
          if (res.data) {
            alert("Data has been ordered!");
            this.receipt = null;
            this.file = null;
            this.loading = false;
            this.close();
          }
        });
      }
    },
    close() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>

<style></style>
