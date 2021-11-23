<script setup>
import { toRefs, ref, onMounted } from "vue";
 
 
const props = defineProps({
	address: Object,
	formId: String
})
 
const { name, address_line1, address_line2, address_city, address_state, address_zip } = toRefs(props.address)
 
const subscription = ref();
onMounted(() => {
	window.addEventListener("keydown", () => {
		if (subscription.value || !window.LobAddressElements) return
        subscription.value = window.LobAddressElements.on('elements.us_autocompletion.selection', function (payload) {

			if (payload.form.id !== props.formId) return

			const { selection: {
				primary_line, city, state, zip_code
			}
			} = payload

			address_line1.value = primary_line
			address_city.value = city
			address_state.value = state
			address_zip.value = zip_code
      });
   });
});
</script>
<template>
	<form :id="formId">
		<div class="form-field">
			<label for="name">Name</label>
			<input id="name" v-model="name" />
		</div>
		<div class="form-field">
			<label for="firstLine">Address Line 1</label>
			<input id="firstLine" v-model="address_line1" />
		</div>
		<div class="form-field">
			<label for="secondLine">Address Line 2</label>
			<input id="secondLine" v-model="address_line2" />
		</div>
		<div class="form-field">
			<label for="city">City</label>
			<input id="city" v-model="address_city" />
		</div>
		<div class="form-field">
			<label for="state">State</label>
			<input id="state" v-model="address_state" />
		</div>
		<div class="form-field">
			<label for="zip">Zip Code</label>
			<input id="zip" v-model="address_zip" />
		</div>
	</form>
</template>
