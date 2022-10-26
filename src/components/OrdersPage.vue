<template>
  <div>
    <div class="container mt-5">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ordersList" :key="item._id">
            <th>{{ item._id }}</th>
            <td>{{ item.product.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-danger w-100"
                @click="deleteOrder(item)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { basicRoute } from "@/config/config";

export default {
  name: "MainComp",
  props: ["token"],
  data() {
    return {
      ordersList: [],
      errorMessage: "",
      hasError: false,
      newOrderProductId: null,
      newOrderQuantity: 0,
    };
  },
  mounted() {
    this.getAllOrders();
  },
  methods: {
    getAllOrders() {
      fetch(`${basicRoute}orders`, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.ordersList = data.orders;
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = `Server error: ${error}`;
          console.log(`Error: ${error}`);
        });
    },

    deleteOrder(order) {
      fetch(`${basicRoute}orders/${order._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `token ${this.token}`,
        },
      })
        .then(() => {
          this.ordersList.splice(this.ordersList.indexOf(order), 1);
        })
        .catch((error) => {
          this.hasError = true;
          this.errorMessage = `Server error: ${error}`;
          console.log(`Error: ${error}`);
        });
    },
  },
};
</script>