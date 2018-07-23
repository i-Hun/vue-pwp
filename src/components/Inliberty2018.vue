<template>
	<div class="main">
		<section class="section">
			<Calendar
			calendarId="d97rg6bf60332qahmh9la0ar30@group.calendar.google.com"
			timeMin="2018-06-12"
			timeMax="2018-08-30">
			</Calendar>
		</section>
	</div>
</template>


<style scoped>
.main {
	background-image: url("../assets/img/patterns/georgia-flag.png");
	background-repeat: repeat;
	/*background-color: #e8112d;*/
}
</style>


<script>
	import Calendar from "./Calendar.vue";


	export default {
		name: "HSESummerSchool2018PythonCourse",
		components: {
			Calendar
		}
	}
</script>