<template>
	<div class="HSESummerSchool2018PythonCourse">
		<Calendar
		calendarId="8e4enqv0aptevi6fkf726qmtjk@group.calendar.google.com"
		timeMin="2018-06-25"
		timeMax="2018-08-25">
		</Calendar>
	</div>
</template>


<style scoped>
.HSESummerSchool2018PythonCourse {
	background-image: url("../assets/img/patterns/snakes.png");
	background-repeat: repeat;
	background-size: 400px 400px;
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