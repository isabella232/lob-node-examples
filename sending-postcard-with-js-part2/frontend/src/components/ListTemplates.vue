<script setup>
import { reactive, onMounted } from "vue";
 
const templates = reactive({});
 
onMounted(() => {
	fetch("http://localhost:3030/templates")
		.then((data) => data.json())
		.then((data) => (templates.value = data));
});
</script>
 
<template>
	<ul class="flex">
		<li v-for="template in templates.value">
			<h3>{{ template.description }}</h3>
			<p>Created on {{ template.date_created }}.</p>
           <p><a :href="'https://dashboard.lob.com/#/templates/' + template.id" target="_blank">Preview</a></p>
 
					</li>
	</ul>
 
</template>
<style scoped>
   li {
       display: block;
   }
   .template-frame {
       width: 200px;
       height:300px;
       overflow: hidden;
   }
</style>

