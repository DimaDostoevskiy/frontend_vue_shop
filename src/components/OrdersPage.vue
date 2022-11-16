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

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { basicRoute } from "@/config/config";

import { showToast } from "@/helpers/toast";

const store = useStore();
const ordersList = ref();

onMounted(() => {
  getAllOrders();
});

const getAllOrders = async () => {
  try {
    const response = await fetch(`${basicRoute}orders`, {
      headers: {
        Authorization: `token ${store.state.token}`,
      },
    });
    let result = await response.json();
    if (result.orders) {
      ordersList.value = result.orders;
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteOrder = async (order) => {
  try {
    const response = await fetch(`${basicRoute}orders/${order._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `token ${store.state.token}`,
      },
    });
    if (response.ok) {
      ordersList.value.splice(ordersList.value.indexOf(order), 1);
      showToast("Order deleted");
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
