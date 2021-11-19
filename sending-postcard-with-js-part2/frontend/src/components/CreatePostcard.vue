<script setup>
import { ref, onMounted } from "vue";
import AddressForm from "./AddressForm.vue";
 
const toAddress = ref({ name: "", address_line1: "", address_line1: "", address_city: "", address_state: "", address_zip: "" })
const fromAddress = ref({ name: "", address_line1: "", address_line1: "", address_city: "", address_state: "", address_zip: "" })
const templates = ref([]);
const frontTemplate = ref("")
const backTemplate = ref("")
const error = ref("")
const success = ref(false)
const loading = ref(false)
const frontThumbnail = ref("")
const backThumbnail = ref("")
 
 
onMounted(() => {
	fetch("http://localhost:3030/templates")
		.then((data) => data.json())
		.then((data) => templates.value = data);
    
    const script = document.createElement("script");
	script.src = "https://cdn.lob.com/lob-address-elements/2.1.3/lob-address-elements.min.js";
	script.async = true;
	script.setAttribute("data-lob-key", import.meta.env.VITE_LOB_API_KEY);
	script.setAttribute("data-lob-primary-id", "firstLine");
	script.setAttribute("data-lob-secondary-id", "secondLine");
	script.setAttribute("data-lob-city-id", "city");
	script.setAttribute("data-lob-state-id", "state");
	script.setAttribute("data-lob-zip-id", "zip");
	document.body.appendChild(script);

})
async function handleSubmit() {
   const body = {
       toAddress: { ...toAddress.value },
       fromAddress: { ...fromAddress.value },
       frontTemplate: frontTemplate.value,
       backTemplate: backTemplate.value
   }
   error.value = ""
   success.value = false
   loading.value = true
   const response = await fetch("http://localhost:3030/postcard/create", {
       method: "POST",
       body: JSON.stringify(body),
       headers: {
           "Content-Type": "application/json"
       }
   })
 
   const data = await response.json()
 
   if (!data.success) {
       loading.value = false
       error.value = data.error_message
       return
   }
 
   setTimeout(function(){
       loading.value = false
       backThumbnail.value = data.postcard.thumbnails[1].medium
       frontThumbnail.value = data.postcard.thumbnails[0].medium
       success.value = true
   }, 4000)
 
}

</script>
<template>
   <div>
   <div v-if="loading == true">LOADING...</div>
   <div v-if="error" class="error">{{ error }}</div>
   <div v-if="success == true">
       <div class="success">Postcard Created!</div>
       <div class="flex">
           <div style=""><img :src=frontThumbnail /><br /><span>Front</span></div>
           <div><img :src=backThumbnail /><br /><span>Back</span></div>
       </div>
   </div>
   <h2>Select a template:</h2>
   <div class="flex">
       <select v-model="frontTemplate" class="select">
           <option value>Please select front template</option>
           <option v-for="template in templates" :value="template.id">{{ template.description }}</option>
       </select>
       <select v-model="backTemplate" class="select">
           <option value>Please select back template</option>
           <option v-for="template in templates" :value="template.id">{{ template.description }}</option>
       </select>
   </div>
   <div class="container">
       <div class="address">
           <h2>Address you're sending to</h2>
           <AddressForm :address="toAddress" formId="toAddress" />
       </div>
       <div class="address">
           <h2>Address you're sending from</h2>
           <AddressForm :address="fromAddress" formId="fromAddress" />
       </div>
   </div>
    <div class="submit-area">
       <h2>Ready to go?</h2>
       <button class="btn_submit" @click="handleSubmit()">Submit</button>
    </div>
 </div>
</template>
<style lang="scss">
 
 
.container {
   display: flex;
   justify-content: space-between;
}
 
.flex {
   display: flex;
   justify-content: center;
}
 
.strikeout {
   text-decoration: line-through;
}
 
.address {
   width: 100%;
   margin: 14px;
}
 
.submit-area {
   border: 1px solid black;
   padding: 4px;
   padding-bottom: 16px;
   width: 50%;
   margin: auto;
}
 
.error {
   border: 1px solid;
   margin: 10px 0px;
   padding: 15px 10px 15px 50px;
   background-repeat: no-repeat;
   background-position: 10px center;
   color: #d8000c;
   background-color: #ffbaba;
   background-image: url("https://i.imgur.com/GnyDvKN.png");
}
 
.success {
   border: 1px solid;
   margin: 10px 0px;
   padding: 15px 10px 15px 50px;
   color: #ffffff;
   background-color: #8af89c;
}
 
:root {
   --select-border: #777;
   --select-focus: blue;
   --select-arrow: var(--select-border);
}
 
select {
   appearance: none;
   background-color: transparent;
   border: none;
   padding: 0 1em 0 0;
   margin: 0;
   width: 100%;
   font-family: inherit;
   font-size: inherit;
   cursor: inherit;
   line-height: inherit;
 
   // Stack above custom arrow
   z-index: 1;
 
   // Remove dropdown arrow in IE10 & IE11
   // @link https://www.filamentgroup.com/lab/select-css.html
   &::-ms-expand {
       display: none;
   }
 
   // Remove focus outline, will add on alternate element
   outline: none;
}
 
.select {
   display: grid;
   grid-template-areas: "select";
   align-items: center;
   position: relative;
   margin: 4px;
 
   select,
   &::after {
       grid-area: select;
   }
 
   min-width: 15ch;
   max-width: 30ch;
 
   border: 1px solid var(--select-border);
   border-radius: 0.25em;
   padding: 0.25em 0.5em;
 
   font-size: 1.25rem;
   cursor: pointer;
   line-height: 1.1;
 
   // Optional styles
   // remove for transparency
   background-color: #fff;
   background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
 
   // Custom arrow
   &:not(.select--multiple)::after {
       content: "";
       justify-self: end;
       width: 0.8em;
       height: 0.5em;
       background-color: var(--select-arrow);
       clip-path: polygon(100% 0%, 0 0%, 50% 100%);
   }
}
 
// Interim solution until :focus-within has better support
select:focus + .focus {
   position: absolute;
   top: -1px;
   left: -1px;
   right: -1px;
   bottom: -1px;
   border: 2px solid var(--select-focus);
   border-radius: inherit;
}
 
select[multiple] {
   padding-right: 0;
 
   /*
  * Safari will not reveal an option
  * unless the select height has room to
  * show all of it
  * Firefox and Chrome allow showing
  * a partial option
  */
   height: 6rem;
 
   option {
       white-space: normal;
 
       // Only affects Chrome
       outline-color: var(--select-focus);
   }
 
   /*
  * Experimental - styling of selected options
  * in the multiselect
  * Not supported crossbrowser
  */
   //   &:not(:disabled) option {
   //     border-radius: 12px;
   //     transition: 120ms all ease-in;
 
   //     &:checked {
   //       background: linear-gradient(hsl(242, 61%, 76%), hsl(242, 61%, 71%));
   //       padding-left: 0.5em;
   //       color: black !important;
   //     }
   //   }
}
 
.select--disabled {
   cursor: not-allowed;
   background-color: #eee;
   background-image: linear-gradient(to top, #ddd, #eee 33%);
}
 
label {
   font-size: 1.125rem;
   font-weight: 500;
}
 
.select + label {
   margin-top: 2rem;
}
​​.form-field {
   display: flex;
   flex-direction: column;
}
 
.form-field label {
   flex: 1;
   text-align: left;
}
 
.form-field input {
   flex: 1;
   width:100%;
}
 
</style>
