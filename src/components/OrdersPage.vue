<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-md-12 col-xl-12">
          <table class="table text-danger">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ordersList" :key="item._id">
                <td class="w-50">{{ item.product.name }}</td>
                <td class="w-25">{{ item.quantity }}</td>
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
