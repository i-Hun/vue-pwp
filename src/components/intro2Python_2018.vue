<template>
	<div class="intro2Python_2018">
		<section class="section">
			<Calendar
			calendarId="f9tagki1v15qp7u145rukc0qpo@group.calendar.google.com"
			timeMin="2018-06-25"
			timeMax="2019-08-25">
			</Calendar>
		</section>
	</div>
</template>


<style scoped>
.intro2Python_2018 {
	background-image: url("../assets/img/patterns/snakes.png");
	background-repeat: repeat;
	background-size: 400px 400px;
}
</style>


<script>
	import Calendar from "./Calendar.vue";

	export default {
		name: "intro2Python_2018",
		components: {
			Calendar
		}
	}
</script>