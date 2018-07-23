<template>
	<div class="SummerSchoolDubna2018">
		<section class="section">
			<Calendar
			calendarId="nkodf5abeqrpa4tm7k31b26n2k@group.calendar.google.com"
			timeMin="2018-06-25"
			timeMax="2018-08-25">
			</Calendar>
		</section>
	</div>
</template>


<style scoped>
.SummerSchoolDubna2018 {
	background-image: url("../assets/img/patterns/summer_school.png");
	background-repeat: repeat;
	/*background-size: 400px 400px;*/
}
</style>


<script>
	import Calendar from "./Calendar.vue";


	export default {
		name: "SummerSchoolDubna2018",
		components: {
			Calendar
		}
	}
</script>