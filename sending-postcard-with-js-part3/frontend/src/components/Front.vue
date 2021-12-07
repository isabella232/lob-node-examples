<script setup>
import { ref } from "vue";
 import router from "../router";

const imgSrc = ref("https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Links/indoor-4148898.jpg");
const headerText = ref("Love the home you live in")
const logoText = ref("virtonis")
const templateName = ref("")

function openUploadModal() {
	window.cloudinary.openUploadWidget(
		{
			cloud_name: import.meta.env.VITE_CLOUDINARY_NAME,  
                    upload_preset: import.meta.env.VITE_CLOUDINARY_PRESET
		},
		(error, result) => {
			if (!error && result && result.event === "success") {
				imgSrc.value = result.info.url
			}
		}).open();
}

async function submitTemplate() {
	await fetch(`http://localhost:3030/templates/create?logoText=${logoText.value}&templateName=${templateName.value}&backgroundImage=${imgSrc.value}&description=${headerText.value}`, { method: "POST" })
	router.push("/list")
}


</script>
 
<template>
  <div class="body" :style="{ backgroundImage: `url(${imgSrc})` }">
    <div class="header">{{ headerText }}</div>
    <div class="logo">{{ logoText }}</div>
    <div id="safe-area"></div>
    <div class="controls">
        <form @submit.prevent>
            <h2>Edit your template</h2>
            <div class="form-field">
                <label for="headerText">Header text:</label>
                <textarea id="headerText" v-model="headerText" />
            </div>
            <div class="form-field">
                <label for="logoText">Logo text:</label>
                <input id="logoText" v-model="logoText" />
            </div>
            <div class="form-field">
                <label for="backgroundImage">Background Image:</label>
                <button @click="openUploadModal()">Upload files</button>
            </div>
            <div>
                <h2>Finished with your postcard design?</h2>
                <div class="form-field">
                    <label for="templateName">Give it a name</label>
                    <input id="templateName" v-model="templateName" />
                </div>
                <button @click="submitTemplate()">Upload template</button>
            </div>

        </form>
    </div>

  </div>
</template>

<style scoped>
*,
*:before,
*:after {
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
}

textarea {
   font: inherit;
}
@font-face {
   font-family: "Lato-Bold";
   src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Bold.ttf)
       format("truetype");
}

@font-face {
   font-family: "Lato-Light";
   src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Light.ttf)
       format("truetype");
}

@font-face {
   font-family: "Lato-Regular";
   src: url(https://s3.us-west-2.amazonaws.com/public.lob.com/solutions/Lob_demo_postcard_conversion/Retail+psc/4x6+Retail+Postcard/Document+fonts/Lato-Regular.ttf)
       format("truetype");
}

.body {
   position: absolute;
   top: 0;
   left: 0;
   width: 6.25in;
   height: 4.25in;
   margin: 0;
   padding: 0;

   background-size: 6.25in 4.25in;
   background-repeat: no-repeat;
}

.header {
   position: absolute;
   width: 4.3232in;
   height: 1.8625in;
   left: 0.9138in;
   top: 0.2847in;
   font-size: 39.247pt;
   line-height: 35.804pt;
   font-family: "Lato-Light";
}

.logo {
   position: absolute;
   /* width: 1.2807in; */
   height: 0.4407in;
   right: 0.2in;
   top: 3.7072in;
   font-size: 24.787pt;
   line-height: 29.745pt;
   font-family: "Lato-Regular";
}

#safe-area {
   position: absolute;
   width: 5.875in;
   height: 3.875in;
   left: 0.1875in;
   top: 0.1875in;
   background-color: rgba(255, 255, 255, 0.5);
}

.controls {
   position: absolute;
   top: 4.5in;
}

.form-field {
   display: flex;
   flex-direction: column;
}

label {
   text-align: left;
   margin-bottom: 8px;
   margin-top: 8px;
}

</style>
