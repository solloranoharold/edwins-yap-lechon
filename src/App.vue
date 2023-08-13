<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      v-if="userInfo && userInfo.type == 'ADMIN' && $route.name != 'Sales'"
      width="200"
    >
      <v-list dense>
        <!-- <v-list-item to="/reports">
          <v-list-item-icon>
            <v-icon large>mdi-chart-bar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item> -->
        <v-list-item to="/reports">
          <v-list-item-icon>
            <v-icon large>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/accounts">
          <v-list-item-icon>
            <v-icon large>mdi-account-box-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
        <v-list-item to="/menu">
          <v-list-item-icon>
            <v-icon large>mdi-menu</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>
        <v-list-item to="/shipping">
          <v-list-item-icon>
            <v-icon large>mdi-receipt-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shipping Fee</v-list-item-title>
        </v-list-item>
        <v-list-item to="/myoders">
          <v-list-item-icon>
            <v-icon large>mdi-access-point</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Order</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      max-width="400px"
      v-if="userInfo"
    >
      <v-card>
        <v-toolbar flat dense dark color="red">
          <v-toolbar-title>MY ACCOUNT</v-toolbar-title>
          <v-spacer />
          <v-icon @click="openProfile()">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text>
          <label style="text-align: left">NAME</label>
          <v-text-field
            :disabled="userInfo.fullname == 'ADMINISTRATOR' ? true : false"
            v-model="userInfo.fullname"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-text-field>
          <br />
          <label style="text-align: left">EMAIL</label>
          <v-text-field
            disabled
            v-model="userInfo.email"
            dark
            hide-details
            class="text"
            outlined
            dense
            type="email"
          ></v-text-field
          ><br />
          <label style="text-align: left">PASSWORD</label>
          <v-text-field
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            v-model="userInfo.password"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-text-field
          ><br />
          <label style="text-align: left">CONFIRM PASSWORD</label>
          <v-text-field
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="userInfo.cpass"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-text-field
          ><br />
          <label style="text-align: left">MUNICIPALITY</label>
          <v-autocomplete
            v-model="userInfo.shipping_id"
            :items="Shippings"
            item-text="municipality"
            item-value="shipping_id"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-autocomplete
          ><br />
          <label style="text-align: left">BARANGAY</label>
          <v-text-field
            v-model="userInfo.brgy"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-text-field
          ><br />
          <label style="text-align: left">COMPLETE ADDRESS</label>
          <v-textarea
            v-model="userInfo.address"
            dark
            hide-details
            class="text"
            outlined
            dense
          ></v-textarea>
          <br />
          <v-btn dark class="green darken-2" @click="updateProfile()"
            >UPDATE</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-app-bar
      app
      dense
      permanent
      flat
      dark
      color="#B71C1C"
      v-if="$route.name != 'Sales'"
    >
      <v-app-bar-nav-icon
        v-if="userInfo && userInfo.type == 'ADMIN'"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-avatar
        @click="userInfo && userInfo.type == 'ADMIN' ? goToServer() : ''"
        class="profile"
        color="grey"
        size="55"
      >
        <v-img src="./assets/referrence/logo.jpg"></v-img>
      </v-avatar>
      <v-btn
        v-if="!userInfo || userInfo.type != 'ADMIN'"
        x-small
        dark
        color="success"
        @click="orderNow()"
        ><v-icon small>mdi-cart</v-icon>order now</v-btn
      >
      <v-spacer />
      <span v-if="userInfo">{{ userInfo.email }}</span>

      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                x-small
                outlined
                text
                dark
                fab
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon large>mdi-account-badge-outline</v-icon>
                <span v-if="userInfo == null">Login | Sign Up</span>
              </v-btn>
            </template>
            <span v-if="userInfo == null">Login | Sign Up</span>
            <span v-else>Profile | Logout</span>
          </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item to="/signup" v-if="userInfo == null">
            <v-list-item-icon
              ><v-icon large>mdi-account-plus</v-icon></v-list-item-icon
            >
            <v-list-item-title>SIGNUP</v-list-item-title>
          </v-list-item>
          <v-list-item to="/login" v-if="userInfo == null">
            <v-list-item-icon
              ><v-icon large
                >mdi-account-badge-outline</v-icon
              ></v-list-item-icon
            >
            <v-list-item-title>LOGIN</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/myoders"
            v-if="userInfo && userInfo.type != 'ADMIN'"
          >
            <v-list-item-icon
              ><v-icon large
                >mdi-account-badge-outline</v-icon
              ></v-list-item-icon
            >
            <v-list-item-title>ORDERS</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialog = !dialog" v-if="userInfo">
            <v-list-item-icon
              ><v-icon large>mdi-account-arrow-up</v-icon></v-list-item-icon
            >
            <v-list-item-title>PROFILE</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()" v-if="userInfo">
            <v-list-item-icon
              ><v-icon large>mdi-exit-to-app</v-icon></v-list-item-icon
            >
            <v-list-item-title>LOGOUT</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="userInfo != null && userInfo.fullname != 'ADMINISTRATOR'"
        fab
        x-small
        text
        @click="$router.push('/cart')"
        ><v-icon large>mdi-cart</v-icon></v-btn
      >
      <v-menu v-if="userInfo != null">
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-badge color="green" :content="notseen">
                <v-icon v-bind="attrs" v-on="{ ...tooltip, ...menu }"
                  >mdi-bell</v-icon
                >
              </v-badge>
            </template>
            <span>Notifications {{ notseen }}</span>
          </v-tooltip>
        </template>

        <v-list dense>
          <h3 class="text-center"><v-icon>mdi-bell</v-icon>NOTIFICATIONS</h3>
          <v-list-item
            :style="[{ 'background-color': item.notify == 1 ? 'gray' : '' }]"
            v-for="(item, i) in Notifications"
            :key="i"
            style="border: 1px solid"
            @click="updateNotification(item)"
          >
            <v-list-item-icon>
              <v-icon large>mdi-information</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              ( {{ item.createDate }} ) {{ item.message }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-logout</v-icon>
        </template>
        <span>Logout</span>
      </v-tooltip>-->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-card>
      <v-footer padless v-if="userInfo && userInfo.type != 'ADMIN'">
        <v-card-actions>
          <v-flex class="pl-10">
            <v-avatar class="profile" color="grey" size="100">
              <v-img src="./assets/referrence/logo.jpg"></v-img>
            </v-avatar>
          </v-flex>
          <v-spacer />
          <v-flex>
            <h2 class="text-center">FOLLOW US</h2>
            <v-flex>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <center>
                    <a
                      v-bind="attrs"
                      v-on="on"
                      href="https://www.facebook.com/EdwinYapsLechon"
                      target="_blank"
                    >
                      <v-img
                        src="./assets/referrence/fblogo.jpg"
                        max-width="60"
                      ></v-img
                    ></a>
                  </center>
                </template>
                <span>Edwin's Yap Lechon Baboy</span>
              </v-tooltip>
            </v-flex>
          </v-flex>
        </v-card-actions>
        <v-spacer />
        <div class="pr-6" @click="goToLocation()" style="cursor: pointer">
          <h2 class="text-center">Contact Us</h2>
          <h5 class="text-center">Get in touch with us</h5>
          <h5 class="text-center">RPALMA ,SAN ANTONIO CAVITE CITY</h5>
          <h5 class="text-center">0997-7251-8667</h5>
        </div>
        <v-img max-width="100" src="./assets/referrence/contact.gif" />
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data: () => ({
    show: false,
    show1: false,
    SystemName: "",
    drawer: true,
    data: [
      {
        title: "On-Going",
        icon: "mdi-text-box-plus",
        to: "/",
      },
      {
        title: "Reports",
        icon: "mdi-text-box-check-outline",
        to: "/reports",
      },
    ],
    dialog: false,
    Shippings: [],
    defaultEmail: "",

    //
  }),
  created() {
    this.loadShippings();
  },
  methods: {
    goToServer() {
      this.$router.push("/reports");
    },
    openProfile() {
      this.dialog = !this.dialog;
    },
    updateNotification(item) {
      console.log(item);
      axios.get(`${this.api}updateNotify/${item.log_id}`).then(() => {
        this.loadNotifications();
      });
    },
    goToLocation() {
      window.open(
        "https://www.google.com/maps/place/Elie+Yaps+Lechon+%26+Party+Shop/@14.4852266,120.8992648,18z/data=!4m14!1m7!3m6!1s0x3397cd3250857003:0x410cab23a839cb80!2sElie+Yaps+Lechon+%26+Party+Shop!8m2!3d14.4858629!4d120.8995438!16s%2Fg%2F1pzt_br3q!3m5!1s0x3397cd3250857003:0x410cab23a839cb80!8m2!3d14.4858629!4d120.8995438!16s%2Fg%2F1pzt_br3q",
        "_blank"
      );
    },
    loadShippings() {
      axios.get(`${this.api}loadShippingFees`).then((res) => {
        if (res.data) {
          this.Shippings = res.data;
        }
      });
    },

    logout() {
      this.$store.commit("STORE_USERINFO", null);
      this.$router.push("/");
      window.location.reload();
    },
    orderNow() {
      if (this.userInfo) {
        this.$router.push("/menu");
      } else {
        alert("Please login first");
        this.$router.push("/login");
      }
    },
    updateProfile() {
      this.userInfo.method = 1;
      if (!this.userInfo.cpass) {
        if (
          confirm(
            "Are you sure you want to change your information without changing password? "
          )
        ) {
          axios.post(`${this.api}addEditAccount`, this.userInfo).then((res) => {
            if (res.data) {
              alert("Profile has been updated!");
              this.dialog = !this.dialog;
            }
          });
        }
      }
      if (
        this.userInfo.password.toUpperCase() ==
        this.userInfo.cpass.toUpperCase()
      ) {
        axios.post(`${this.api}addEditAccount`, this.userInfo).then((res) => {
          if (res.data) {
            alert("Profile has been updated!");
            this.dialog = !this.dialog;
          }
        });
      } else {
        alert("Password and Confirm Password not matched!");
      }
    },
  },
};
</script>
<style scoped>
div.v-list-item__title {
  align-self: center;
  font-size: 13px;
}
.text {
  background-color: rgb(161, 79, 24);
}
</style>
