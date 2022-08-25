<template>
  <div>
    <div class="autocomplete" v-click-outside="hide">
      <label for="input-address">Введите адрес:</label>
      <input placeholder="г. Москва"
             id="input-address"
             :ref="'input'"
             class="input"
             type="text"
             v-model="value"
             @input="() => onInputDebounce()"
      />

      <div v-if="isOpen && addressList.length" class="card">
        <div class="item"
             @click="() => onClickItem(item)"
             :key="idx"
             v-for="(item, idx) of addressList">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { debounce } from 'lodash';
import { getAddress } from '@/services/api';

export default {
  name: 'AddressAutocomplete',
  directives: {
    ClickOutside,
  },
  data: () => ({
    value: '',
    isOpen: false,
    addressList: [],
  }),
  methods: {
    hide() {
      this.isOpen = false;
    },
    onInput() {
      getAddress(this.value)
        .then((i) => {
          this.isOpen = true;
          this.addressList = i.data.suggestions;
        });
    },
    onInputDebounce: debounce(function inputHandler() {
      this.onInput();
    }, 300),
    onClickItem(item) {
      this.value = item.value;
      this.$refs.input.focus();

      this.isOpen = false;

      this.$emit('address', {
        region: item.data.region_with_type || '',
        street: item.data.street_with_type || '',
        house: item.data.house || '',
        flat: item.data.flat || '',
        city: item.data.city_with_type || item.data.settlement_with_type || '',
        area: item.data.area_with_type || '',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  width: 800px;
  font-size: 18px;
}

.input {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  font-size: 18px;
  padding: 0 8px;
}

.card {
  position: absolute;
  width: 100%;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 4px 0;
  background: white;
}

.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  min-height: 36px;

  &:hover {
    background: gray;
  }
}
</style>
