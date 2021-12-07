<script setup>
import { ref, onMounted } from "vue";

const postcards = ref([]);

onMounted(() => {
	fetch("http://localhost:3030/postcard/list")
		.then((data) => data.json())
		.then((data) => (postcards.value = data.postcards));
});
function canCancel(sendDate) {
	const now = new Date();
	const then = new Date(sendDate);
	return now < then;
}

function cancel(id) {
	fetch(`http://localhost:3030/postcard/cancel/${id}`)
		.then((data) => data.json())
		.then((data) => {
			if (data.deleted) {
				postcards.value = postcards.value.filter(postcard => postcard.id !== id)
			}
		});
}


</script>
<template>
   <div>
   <h3 v-if="postcards.length > 0">Postcards</h3>
   <h3 v-else>You don't have any active postcards.</h3>
   <ul>
		<li v-for="postcard in postcards">
                <span v-if="postcard.from != null">
                   From {{ postcard.from.name }} to {{ postcard.to.name }}.
               </span>
               <span v-else>
                   From *Address Missing* to {{ postcard.to.name }}.
               </span>

			<span
				v-if="canCancel(postcard.send_date)"
				@click="cancel(postcard.id)"
				class="cancel"
			>Cancel</span>
		</li>
    </ul>


   </div>
</template>
<style>
.cancel {
   cursor: pointer;
   border: 1px solid red;
   color: red;
   border-radius: 10px;
   padding: 6px;
}
</style>
