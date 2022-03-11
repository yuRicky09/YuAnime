<template>
  <div>
    <table class="mx-auto w-full text-center md:max-w-3xl">
      <caption class="mb-4 text-2xl">
        スタッフ STAFF
      </caption>
      <thead>
        <tr class="bg-neutral-800 font-semibold">
          <th>役割</th>
          <th>名前</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in staffs" :key="staff" class="odd:bg-neutral-700">
          <td>{{ staff.role_text }}</td>
          <td>{{ staff.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  staffs: {
    type: Array,
    required: true,
  },
});
</script>
