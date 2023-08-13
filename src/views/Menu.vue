<template>
  <v-container fluid>
    <VerticalNavBarVue v-if="userInfo == null || userInfo.type != 'ADMIN'" />
    <v-layout class="pt-4" v-if="userInfo && userInfo.type == 'ADMIN'">
      <v-spacer />
      <v-btn
        small
        v-if="addedit == true"
        @click="addedit = !addedit"
        dark
        color="primary"
      >
        <v-icon>mdi-eye</v-icon>SHOW MENU
      </v-btn>
      <v-btn small v-else @click="openAddEdit({})" dark color="success">
        <v-icon>mdi-plus</v-icon>ADD NEW ITEMS</v-btn
      >
    </v-layout>
    <v-tabs v-model="tab" fixed-tabs v-if="addedit == false">
      <v-tab> WHOLE LECHON </v-tab>
      <v-tab> VARIETY OF LECHON </v-tab>
      <v-tab> DISHES </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" v-if="addedit == false">
      <v-tab-item>
        <center>
          <v-flex md10>
            <v-row>
              <v-col
                md="4"
                lg="3"
                sm="6"
                xs="6"
                v-for="(item, i) in Whole"
                :key="i"
              >
                <v-card class="blue-grey lighten-3">
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-img
                          max-width="250"
                          :src="`${filelister}products/${item.img_product}`"
                        />
                      </v-col>
                      <v-col>
                        <span style="font-weight: bold; font-size: 17px">{{
                          item.product_name
                        }}</span>
                      </v-col>
                      <v-col>
                        <h1>
                          P<span style="font-weight: bold; font-size: 17px"
                            ><i>{{
                              parseFloat(item.product_price).toFixed(2)
                            }}</i></span
                          >
                        </h1>
                      </v-col>
                      <!-- <v-col cols="12">
                                        <v-rating background-color="yellow lighten-3" :value="item.ratings" color="yellow"></v-rating>
                                    </v-col> -->
                      <v-col cols="12" v-if="item.status != 1">
                        <h2 class="text-center">
                          <i style="color: red">PRODUCT IS NOT AVAILABLE</i>
                        </h2>
                      </v-col>
                      <v-col
                        cols="12"
                        v-else-if="userInfo != null && userInfo.type != 'ADMIN'"
                      >
                        <v-btn
                          small
                          dark
                          color="success"
                          @click="transaction('order', item)"
                          ><v-icon>mdi-receipt</v-icon>buy</v-btn
                        >
                        <v-btn
                          small
                          dark
                          color="red"
                          @click="transaction('cart', item)"
                          ><v-icon small>mdi-cart</v-icon> cart</v-btn
                        >
                      </v-col>
                      <v-col
                        cols="12"
                        v-if="userInfo != null && userInfo.type == 'ADMIN'"
                      >
                        <v-btn
                          @click="openAddEdit(item)"
                          small
                          dark
                          color="success"
                          ><v-icon>mdi-pencil</v-icon>edit</v-btn
                        >
                        <v-btn @click="deleteItem(item)" small dark color="red"
                          ><v-icon>mdi-trash</v-icon>delete</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </center>
      </v-tab-item>
      <v-tab-item>
        <center>
          <v-flex md10>
            <v-row>
              <v-col
                md="4"
                lg="3"
                sm="6"
                xs="6"
                v-for="(item, i) in Variety"
                :key="i"
              >
                <v-card class="blue-grey lighten-3">
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-img
                          :src="`${filelister}products/${item.img_product}`"
                        />
                      </v-col>
                      <v-col>
                        <span style="font-weight: bold; font-size: 17px">{{
                          item.product_name
                        }}</span>
                      </v-col>
                      <v-col>
                        <h1>
                          P<span style="font-weight: bold; font-size: 17px"
                            ><i>{{
                              parseFloat(item.product_price).toFixed(2)
                            }}</i></span
                          >
                        </h1>
                      </v-col>
                      <!-- <v-col cols="12">
                                        <v-rating background-color="yellow lighten-3" :value="item.ratings" color="yellow"></v-rating>
                                    </v-col> -->

                      <v-col cols="12" v-if="item.status != 1">
                        <h2 class="text-center">
                          <i style="color: red">PRODUCT IS NOT AVAILABLE</i>
                        </h2>
                      </v-col>
                      <v-col
                        cols="12"
                        v-else-if="userInfo != null && userInfo.type != 'ADMIN'"
                      >
                        <v-btn
                          small
                          dark
                          color="success"
                          @click="transaction('order', item)"
                          ><v-icon>mdi-receipt</v-icon>buy</v-btn
                        >
                        <v-btn
                          small
                          dark
                          color="red"
                          @click="transaction('cart', item)"
                          ><v-icon small>mdi-cart</v-icon> cart</v-btn
                        >
                      </v-col>
                      <v-col
                        cols="12"
                        v-if="userInfo != null && userInfo.type == 'ADMIN'"
                      >
                        <v-btn
                          @click="openAddEdit(item)"
                          small
                          dark
                          color="success"
                          ><v-icon>mdi-pencil</v-icon>edit</v-btn
                        >
                        <v-btn @click="deleteItem(item)" small dark color="red"
                          ><v-icon>mdi-trash</v-icon>delete</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </center>
      </v-tab-item>
      <v-tab-item>
        <center>
          <v-flex md10>
            <v-row>
              <v-col
                md="4"
                lg="3"
                sm="6"
                xs="6"
                v-for="(item, i) in Dishes"
                :key="i"
              >
                <v-card class="blue-grey lighten-3">
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-img
                          max-width="250"
                          :src="`${filelister}products/${item.img_product}`"
                        />
                      </v-col>
                      <v-col>
                        <span style="font-weight: bold; font-size: 17px">{{
                          item.product_name
                        }}</span>
                      </v-col>
                      <v-col>
                        <h1>
                          P<span style="font-weight: bold; font-size: 17px"
                            ><i>{{
                              parseFloat(item.product_price).toFixed(2)
                            }}</i></span
                          >
                        </h1>
                      </v-col>
                      <!-- <v-col cols="12">
                                        <v-rating background-color="yellow lighten-3" :value="item.ratings" color="yellow"></v-rating>
                                    </v-col> -->
                      <v-col cols="12" v-if="item.status != 1">
                        <h2 class="text-center">
                          <i style="color: red">PRODUCT IS NOT AVAILABLE</i>
                        </h2>
                      </v-col>
                      <v-col
                        cols="12"
                        v-else-if="userInfo != null && userInfo.type != 'ADMIN'"
                      >
                        <v-btn
                          small
                          dark
                          color="success"
                          @click="transaction('order', item)"
                          ><v-icon>mdi-receipt</v-icon>buy</v-btn
                        >
                        <v-btn
                          small
                          dark
                          color="red"
                          @click="transaction('cart', item)"
                          ><v-icon small>mdi-cart</v-icon> cart</v-btn
                        >
                      </v-col>
                      <v-col
                        cols="12"
                        v-if="userInfo != null && userInfo.type == 'ADMIN'"
                      >
                        <v-btn
                          @click="openAddEdit(item)"
                          small
                          dark
                          color="success"
                          ><v-icon>mdi-pencil</v-icon>edit</v-btn
                        >
                        <v-btn @click="deleteItem(item)" small dark color="red"
                          ><v-icon>mdi-trash</v-icon>delete</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-flex>
        </center>
      </v-tab-item>
    </v-tabs-items>

    <v-container fluid v-else>
      <h2 class="text-center">
        {{ editedIndex == -1 ? "ADD NEW" : "UPDATE" }} ITEM
      </h2>
      <v-divider style="border: 2px solid" /><br />
      <v-container fluid>
        <center>
          <v-flex md6 sm12 xs12 lg6>
            <v-row no-gutters>
              <v-col cols="12">
                <label>ITEM NAME </label>
                <v-text-field
                  v-model="addObj.product_name"
                  dark
                  hide-details
                  class="text1"
                  outlined
                  dense
                  type="email"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <label>CATEGORY </label>
                <v-autocomplete
                  v-model="addObj.category"
                  :items="Categories"
                  item-text="text"
                  item-value="no"
                  dark
                  hide-details
                  class="text1"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <!-- <v-col cols="6">
                            <label>RATINGS</label>
                            <v-text-field v-model="addObj.ratings" dark hide-details class="text1" value="0.00" min="1" outlined dense  type="number"></v-text-field>
                        </v-col> -->
              <v-col cols="6">
                <label>PRICE</label>
                <v-text-field
                  @change="backToZero()"
                  v-model="addObj.product_price"
                  dark
                  hide-details
                  class="text1"
                  value="0.00"
                  min="1"
                  max="100"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6" v-if="editedIndex > -1">
                <label>STATUS </label>
                <v-autocomplete
                  v-model="addObj.status"
                  :items="Status"
                  item-text="text"
                  item-value="no"
                  dark
                  hide-details
                  class="text1"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <label>IMAGE</label><br />
                <input
                  type="file"
                  @change="getFiles"
                  name="file"
                  id="file"
                  accept="image/png, image/jpeg"
                />
              </v-col>
              <v-col cols="12" v-if="editedIndex > -1">
                <label>IMAGE</label><br />
                <v-img
                  max-width="300"
                  :src="`${filelister}products/${addObj.img_product}`"
                />
              </v-col>
            </v-row>
            <v-layout>
              <v-spacer />
              <v-btn @click="insertUpdateProduct()" small dark color="success"
                >SAVE</v-btn
              >
            </v-layout>
          </v-flex>
        </center>
      </v-container>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      max-width="800px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat dense dark color="success">
          <v-toolbar-title
            ><v-icon>{{
              type == "order" ? "mdi-receipt-text-plus-outline" : "mdi-cart"
            }}</v-icon
            >{{ type == "order" ? "BUY NOW" : "ADD TO CART" }}</v-toolbar-title
          >
          <v-spacer />
          <v-icon @click="closeTransaction()">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="7">
                <center>
                  <v-img
                    max-width="350"
                    :src="`${filelister}products/${obj.img_product}`"
                  />
                </center>
              </v-col>
              <v-col>
                <h2>{{ obj.product_name }}</h2>
                <!-- <v-rating background-color="yellow lighten-3" :value="obj.ratings" color="yellow" small></v-rating> -->
                <h1>
                  P<span style="font-weight: bold; font-size: 17px"
                    ><i>{{ parseFloat(obj.product_price).toFixed(2) }}</i></span
                  >
                </h1>
                <strong>Quantity</strong> :
                <span>
                  <v-btn x-small rounded @click="evalQuantity('-', obj)"
                    ><v-icon>mdi-minus</v-icon></v-btn
                  >
                  <input
                    type="number"
                    v-model="obj.quantity"
                    style="width: 15%; border: 1px solid; text-align: center"
                  />
                  <v-btn x-small rounded @click="evalQuantity('+', obj)"
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                </span>
                <br /><br />
                <h2 v-if="type == 'order'">
                  Total : PHP {{ obj.total_price }}
                </h2>
                <v-btn
                  right
                  v-if="type == 'order'"
                  dark
                  color="success"
                  @click="openTotalandDeilvery('buynow')"
                  ><v-icon>mdi-receipt</v-icon> BUY NOW
                </v-btn>
                <v-btn right v-else dark color="red" @click="addToCart()"
                  ><v-icon>mdi-cart</v-icon> ADD TO CART
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <TotalandDelivery
      :dialog="totalBuyandCart"
      :data="obj"
      :type="orderType"
      @closeDialog="closeDialog"
    />
  </v-container>
</template>

<script>
import VerticalNavBarVue from "./VerticalNavBar.vue";
import axios from "axios";
import TotalandDelivery from "./TotalandDelivery.vue";
export default {
  components: {
    VerticalNavBarVue,
    TotalandDelivery,
  },
  data: () => ({
    tab: "",
    type: "",
    dialog: false,
    totalBuyandCart: false,
    editedIndex: -1,
    addedit: false,
    Categories: [
      { no: 1, text: "WHOLE" },
      { no: 2, text: "VARIETY" },
      { no: 3, text: "OTHER DISHES" },
    ],
    orderType: "",
    addObj: {},
    Products: [],
    Whole: [],
    Variety: [],
    Dishes: [],
    Status: [
      { no: 1, text: "Available" },
      { no: 2, text: "Not Available" },
    ],
    obj: {},
  }),
  created() {
    this.loadProducts();
    this.loadMyCart();
    this.loadNotifications();
  },
  methods: {
    backToZero() {
      this.addObj.product_price =
        this.addObj.product_price < 0
          ? (this.addObj.product_price = 1)
          : this.addObj.product_price;
    },
    addToCart() {
      let cart = {
        account: this.userInfo.acc_id,
        data: this.obj,
      };
      let i = this.MyCart.indexOf(this.obj);
      if (i > -1) {
        alert("Product already exists on your cart!");
        return false;
      }
      axios.post(`${this.api}addToCart`, cart).then((res) => {
        if (res.data) {
          alert("Item has been added to your cart!");
          this.loadMyCart();
        }
      });
    },
    openTotalandDeilvery(type) {
      this.totalBuyandCart = true;
      this.orderType = type;
      this.dialog = false;
    },
    closeDialog(val) {
      this.totalBuyandCart = val;
    },
    evalQuantity(opr, item) {
      // console.log(opr , item )
      if (opr == "-") {
        if (item.quantity <= 1) {
          item.quantity = 1;
        } else {
          item.quantity -= 1;
        }
      } else {
        item.quantity += 1;
      }
      item.total_price = parseFloat(item.product_price) * item.quantity;
      this.obj = JSON.parse(JSON.stringify(item));
    },
    transaction(type, item) {
      this.type = type;
      this.obj = JSON.parse(JSON.stringify(item));
      this.obj.quantity = 1;
      this.obj.total_price = this.obj.product_price;
      this.dialog = true;
    },
    closeTransaction() {
      this.obj = {};
      this.dialog = false;
    },
    openAddEdit(item) {
      this.addedit = true;
      this.editedIndex = this.Products.indexOf(item);
      if (this.editedIndex == -1) {
        this.addObj = {};
        this.addObj.method = 0;
      } else {
        this.addObj = JSON.parse(JSON.stringify(item));
        this.addObj.method = 1;
      }
    },
    getFiles(e) {
      let formdata = new FormData();
      let files = e.target.files;
      if (files.length > 0) {
        this.addObj.img_product = files[0].name;
        formdata.append("file", files[0]);
        axios
          .post(`${this.api}uploadProducts`, formdata, {
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
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this product? ")) {
        axios
          .get(`${this.api}deleteProducts/${item.product_id}`)
          .then((res) => {
            if (res.data) {
              alert(`Data has been deleted`);
              this.loadProducts();
            }
          });
      }
    },
    insertUpdateProduct() {
      if (
        !this.addObj.product_name ||
        !this.addObj.product_price ||
        !this.addObj.img_product ||
        !this.addObj.category
      ) {
        alert("Complete all Fields!");
        return false;
      }
      if (this.editedIndex == -1) {
        let index = this.Products.findIndex(
          (x) =>
            x.product_name.toUpperCase() ==
            this.addObj.product_name.toUpperCase()
        );
        if (index > -1) {
          alert("Product already exists!");
          return false;
        }
      }

      axios.post(`${this.api}addEditProducts`, this.addObj).then((res) => {
        if (res.data) {
          alert(`Data has been ${this.editedIndex == -1 ? "save" : "update"}d`);
          this.addedit = false;
          this.loadProducts();
        }
      });
    },
    loadProducts() {
      this.Whole = [];
      this.Variety = [];
      this.Dishes = [];
      axios.get(`${this.api}loadProducts`).then((res) => {
        if (res.data) {
          this.Products = res.data;
          res.data.forEach((rec) => {
            if (rec.category == 1) this.Whole.push(rec);
            else if (rec.category == 2) this.Variety.push(rec);
            else if (rec.category == 3) this.Dishes.push(rec);
          });
        }
      });
    },
  },
};
</script>

<style>
.text1 {
  background-color: rgb(6, 121, 32);
}
</style>
