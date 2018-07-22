<script>
	import Calendar from "./Calendar.vue";
	import Vue from 'vue';


	export default {
		props: ["tmpl"],
		render(createElement) {
			var tmpl = this.tmpl;
			console.log("PostBody tmpl", this.tmpl)

			var component = Vue.component('PBody', {
				template: this.tmpl,
				components: {
					Calendar
				}
			});

			let res = createElement(
				component
			)
			console.log("createElement", res);

			return res;
		}
	}
</script>