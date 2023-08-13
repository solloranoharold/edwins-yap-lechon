<template>
  <v-container fluid>
    <VerticalNavBarVue v-if="userInfo == null || userInfo.type != 'ADMIN'" />

    <br />
    <h2 class="text-center">ORDERS</h2>
    <center v-if="userInfo.type == 'USER'">
      <v-flex md6 v-for="(item, i) in getData" :key="i">
        <v-card>
          <v-toolbar flat dense>
            <v-toolbar-title>{{ item.invoice_id }}</v-toolbar-title>

            <v-spacer />
            Payment: <strong>{{ item.type_of_payment }}</strong>
            <v-spacer />
            <a
              v-if="item.receipt && item.receipt != 'null'"
              target="_blank"
              :href="`${filelister}receipt/${item.receipt}`"
            >
              <v-icon large color="success">mdi-attachment</v-icon>
            </a>
            <v-tooltip
              bottom
              v-if="item.type_of_payment == 'Gcash' && item.orderStatus == 1"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="openUploadDialog(item)"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-upload</v-icon
                >
              </template>
              <span>Upload Receipt </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="indigo"
                  @click="viewOrder(item)"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-eye</v-icon
                >
              </template>
              <span>View Order </span>
            </v-tooltip>
            <v-tooltip bottom v-if="item.orderStatus == 1">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="red"
                  @click="updateStatus(item, 3)"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-cancel</v-icon
                >
              </template>
              <span>Cancel</span>
            </v-tooltip>
            <v-chip
              small
              class="ma-2"
              text-color="white"
              :color="
                item.orderStatus == 1
                  ? 'orange'
                  : item.orderStatus == 2
                  ? 'blue'
                  : item.orderStatus == 3
                  ? 'red'
                  : item.orderStatus == 4
                  ? '#607D8B'
                  : 'success'
              "
            >
              {{
                item.orderStatus == 1
                  ? "Pending"
                  : item.orderStatus == 2
                  ? "For Delivery"
                  : item.orderStatus == 3
                  ? "Cancelled"
                  : item.orderStatus == 4
                  ? "Preparing"
                  : "Delivered"
              }}
            </v-chip>
          </v-toolbar>
          <v-divider style="border: 1px solid" />
          <v-card-text>
            <v-simple-table dense>
              <thead>
                <th colspan="2">Item</th>
                <th>Price</th>
                <th>Qty</th>
              </thead>
              <tbody>
                <tr v-for="(prod, x) in item.Products" :key="x">
                  <td style="padding: 0px">
                    <v-img
                      class="pr-5"
                      max-width="200"
                      :src="`${filelister}products/${prod.img_product}`"
                    />
                  </td>
                  <td align="left">
                    {{ prod.product_name }}
                  </td>
                  <td><strong>₱</strong>{{ prod.product_price.toFixed(2) }}</td>
                  <td>{{ prod.qty }} Qty</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </center>

    <v-data-table
      v-else
      disable-pagination
      hide-default-footer
      :headers="headers"
      :items="getData"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <v-spacer />
          <v-flex md3 xs3>
            <v-autocomplete
              clearable
              label="Status"
              dense
              v-model="status"
              :items="statuses"
              rounded
              outlined
              item-text="text"
              item-value="val"
            ></v-autocomplete>
          </v-flex>
        </v-toolbar>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          small
          class="ma-2"
          text-color="white"
          :color="
            item.orderStatus == 1
              ? 'orange'
              : item.orderStatus == 2
              ? 'blue'
              : item.orderStatus == 3
              ? 'red'
              : item.orderStatus == 4
              ? '#607D8B'
              : 'success'
          "
        >
          {{
            item.orderStatus == 1
              ? "Pending"
              : item.orderStatus == 2
              ? "For Delivery"
              : item.orderStatus == 3
              ? "Cancelled"
              : item.orderStatus == 4
              ? "Preparing"
              : "Delivered"
          }}
        </v-chip>
      </template>
      <template v-slot:[`item.receipt`]="{ item }">
        <a
          v-if="item.receipt && item.receipt != 'null'"
          target="_blank"
          :href="`${filelister}receipt/${item.receipt}`"
        >
          <v-icon large color="success">mdi-attachment</v-icon>
        </a>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip
          bottom
          v-if="
            item.type_of_payment == 'Gcash' &&
            item.orderStatus == 1 &&
            userInfo.type != 'ADMIN'
          "
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              @click="openUploadDialog(item)"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >mdi-upload</v-icon
            >
          </template>
          <span>Upload Receipt </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="indigo"
              @click="viewOrder(item)"
              v-bind="attrs"
              v-on="on"
              >mdi-eye</v-icon
            >
          </template>
          <span>View Order </span>
        </v-tooltip>
        <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="orange"
              @click="updateStatus(item, 1)"
              v-bind="attrs"
              v-on="on"
              >mdi-account-clock</v-icon
            >
          </template>
          <span>Pending</span>
        </v-tooltip>
        <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="success"
              @click="updateStatus(item, 2)"
              v-bind="attrs"
              v-on="on"
              >mdi-truck</v-icon
            >
          </template>
          <span>For Delivery</span>
        </v-tooltip>
        <v-tooltip bottom v-if="userInfo.fullname == 'ADMINISTRATOR'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              @click="updateStatus(item, 4)"
              v-bind="attrs"
              v-on="on"
              >mdi-check</v-icon
            >
          </template>
          <span>Delivered</span>
        </v-tooltip>
        <v-tooltip bottom v-if="item.orderStatus == 1">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="red"
              @click="updateStatus(item, 3)"
              v-bind="attrs"
              v-on="on"
              >mdi-cancel</v-icon
            >
          </template>
          <span>Cancel</span>
        </v-tooltip>
        <v-tooltip bottom v-if="item.orderStatus == 1">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="black"
              @click="updateStatus(item, 4)"
              v-bind="attrs"
              v-on="on"
              >mdi-chef-hat</v-icon
            >
          </template>
          <span>Preparing</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <!--  VIEW ORDER  -->
    <v-dialog v-model="dialog" scrollable persistent max-width="900px">
      <v-card>
        <v-toolbar flat dense dark color="green darken-2">
          <v-toolbar-title
            >{{ addObj.invoice_id }} (
            {{
              addObj.orderStatus == 1
                ? "PENDING"
                : addObj.orderStatus == 2
                ? "FOR DELIVERY"
                : addObj.orderStatus == 3
                ? "CANCELLED"
                : addObj.orderStatus == 4
                ? "PREPARING"
                : "DELIVERED"
            }}
            )</v-toolbar-title
          >
          <v-spacer />
          <v-icon @click="dialog = !dialog">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text v-if="dialog == true">
          <span><strong>Personal Information : </strong></span>
          <span>{{ addObj.email }} ( {{ addObj.fullname }} )</span>
          <br />
          <span><strong>Address : </strong> </span>
          <span> {{ addObj.address.toUpperCase() }} </span>
          <span> {{ addObj.brgy.toUpperCase() }}</span>
          <span> {{ addObj.municipality.toUpperCase() }}</span>
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-center">Item</th>
                <th class="text-center">Name</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in specificOrders" :key="i">
                <td align="center" style="padding: 0px">
                  <v-img
                    class="pr-5"
                    max-width="200"
                    :src="`${filelister}products/${item.img_product}`"
                  />
                </td>
                <td align="center">
                  <h3>{{ item.product_name }}</h3>
                </td>
                <td align="center">{{ item.qty }}</td>
                <td align="center">
                  PHP : {{ (item.product_price * item.qty).toFixed(2) }}
                </td>
              </tr>
              <tr v-if="specificOrders.length > 0">
                <td></td>
                <td align="center">Shipping fee</td>
                <td></td>
                <td align="center">
                  PHP : {{ specificOrders[0].shipping_fee.toFixed(2) }}
                </td>
              </tr>
              <tr v-if="specificOrders.length > 0">
                <td></td>
                <td></td>
                <td></td>
                <td style="font-weight: bold" align="center">
                  Total: {{ specificOrders[0].total_price.toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="uploadDialog" persistent scrollable max-width="300px">
      <v-card>
        <v-toolbar flat dense dark color="green darken-2">
          <v-toolbar-title>Upload Receipt</v-toolbar-title>
          <v-spacer />
          <v-icon @click="uploadDialog = !uploadDialog">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-file-input
            v-model="file"
            @blur="saveDocument()"
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
          <v-btn block dark color="indigo" @click="uploadReceipt()"
            >UPLOAD</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import VerticalNavBarVue from "./VerticalNavBar.vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
export default {
  data: () => ({
    search: "",
    status: "",
    statuses: [
      { text: "Pending", val: 1 },
      { text: "For Delivery", val: 2 },
      { text: "Delivered", val: 4 },
      { text: "Cancelled", val: 3 },
    ],
    headers: [
      { text: "Invoice", align: "center", value: "invoice_id" },
      { text: "Fullname", align: "center", value: "fullname" },
      { text: "Status", align: "left", value: "status" },
      { text: "Total Price ", align: "center", value: "total_price" },
      { text: "Payment Method", align: "center", value: "type_of_payment" },
      { text: "Receipt(Gcash)", align: "center", value: "receipt" },
      { text: "Ordered Date", align: "center", value: "DateCreated" },
      { text: "Status", align: "center", value: "action" },
    ],
    Orders: [],
    dialog: false,
    uploadDialog: false,
    addObj: {},
    file: null,
    specificOrders: [],
  }),
  components: {
    VerticalNavBarVue,
  },
  created() {
    this.loadOrders();
    this.loadNotifications();
  },
  computed: {
    getData() {
      return this.Orders.filter((rec) => {
        if (this.status) {
          return rec.orderStatus == this.status;
        } else {
          return rec;
        }
      });
    },
  },
  methods: {
    loadOrders() {
      let id =
        this.userInfo.fullname != "ADMINISTRATOR" ? this.userInfo.acc_id : -1;
      axios.get(`${this.api}loadOrders/${id}`).then((res) => {
        if (res.data) {
          this.Orders = res.data.filter((rec) => {
            rec.DateCreated = moment(rec.DateCreated).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            return rec;
          });
          this.Orders = _.orderBy(this.Orders, ["DateCreated"], ["desc"]);

          if (this.userInfo.type == "USER") {
            axios.post(`${this.api}getProductOrders`, res.data).then((res1) => {
              if (res1.data) {
                console.log(res1.data);
                this.Orders = _.orderBy(res1.data, ["DateCreated"], ["desc"]);
                console.log(res1.data);
              }
            });
          }
        }
      });
    },

    viewOrder(item) {
      this.dialog = !this.dialog;

      this.addObj = JSON.parse(JSON.stringify(item));
      console.log(this.addObj);
      axios
        .get(`${this.api}loadInvoiceOrders/${item.invoice_id}`)
        .then((res) => {
          if (res.data) {
            this.specificOrders = res.data;
          }
        });
    },
    updateStatus(item, val) {
      let status =
        val == 1
          ? "PENDING"
          : val == 2
          ? "FOR DELIVERY"
          : val == 3
          ? "CANCEL"
          : val == 4
          ? "PREPARE"
          : "FINISHED";
      if (confirm(`Are you sure you want to ${status} this order ? `)) {
        item.orderStatus = val;
        axios.post(`${this.api}updateOrderStatus`, item).then((res) => {
          if (res.data) {
            alert(`Data has been ${status}`);
            this.loadOrders();
          }
        });
      }
    },
    openUploadDialog(item) {
      this.file = null;
      this.uploadDialog = true;
      this.addObj = JSON.parse(JSON.stringify(item));
    },
    saveDocument() {
      if (this.file) {
        let formdata = new FormData();
        this.addObj.receipt =
          moment().format("YYYYMMDDHHmmss") + "_" + this.file.name;
        formdata.append("addObj", JSON.stringify(this.addObj));
        formdata.append("file", this.file);
        axios
          .post(`${this.api}uploadReceipt`, formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
              dataType: "json",
            },
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    },
    uploadReceipt() {
      if (!this.file) {
        alert("Please upload first !");
        return false;
      }
      axios.post(`${this.api}updateReceipt`, this.addObj).then((res) => {
        if (res.data) {
          alert("Receipt has been uploaded!");
          this.uploadDialog = false;
          this.loadOrders();
        }
      });
    },
  },
};
</script>

<style></style>
