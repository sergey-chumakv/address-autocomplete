<template>
  <div id="app">
    <div class="address">
      <div>Регион: {{ address.region }}</div>
      <div>Район: {{ address.area }}</div>
      <div>Город: {{ address.city }}</div>
      <div>Улица: {{ address.street }}</div>
      <div>Дом: {{ address.house }}</div>
      <div>Квартира: {{ address.flat }}</div>
    </div>

    <AddressAutocomplete class="autocomplete" @address="getAddress" />
  </div>
</template>

<script>
import AddressAutocomplete from '@/components/shared/AddressAutocomplete';

export default {
  name: 'App',
  components: {
    AddressAutocomplete,
  },
  data: () => ({
    address: {},
  }),
  methods: {
    getAddress(address) {
      this.address = { ...address };
    },
  },
};
</script>

<style>
.address {
  width: 800px;
  font-size: 24px;
  margin: 60px auto 36px auto;
}

.autocomplete {
  margin: 0 auto;
}
</style>
