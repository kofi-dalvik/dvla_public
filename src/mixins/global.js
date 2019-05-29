import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import Partials from '../components/partials';
import placeholder from '@/assets/placeholder-profile.jpg';

export default {
	data() {
		return {
			placeholder,
		}
	},

	components: {
		...Partials
	},

	filters: {
		/**
		 * Convert a date value to a readable date format.
		 * Eg. Tue 14 Mar, 1996.
		 *
		 * @param  {String|Number} value
		 * @return {String}
		 */
		formattedDate(value) {
			let date = moment(value);
			return date.isValid() ? date.format('ddd Do MMM, YYYY') : 'N/A';
		},

		formattedDatePresent(value) {
			let date = moment(value);
			return date.isValid() ? date.format('ddd Do MMM, YYYY') : 'Present';
		},

		/**
		 * Convert a date value to a readable date and time format.
		 * Eg. Tue 14 Mar, 1996 06:34 PM.
		 *
		 * @param  {String|Number} value
		 * @return {String}
		 */
		formattedDateTime(value) {
			let date = moment(value);
			return date.isValid() ? date.format('ddd Do MMM, YYYY hh:mm:A') : 'N/A';
		},

		/**
		 * Get the first letter of the value passed.
		 *
		 * @param  {String} value
		 * @return {String}
		 */
		firstLetter(value) {
			return value.toString().toUpperCase().charAt(0);
		},

		/**
		 * Capitalize a string
		 *
		 * @param {String} value
		 * @return {String}
		 */
		capitalize(value) {
			var value = value.toString();

			return value.charAt(0).toUpperCase() + value.slice(1);
		},

		/**
		 * Replace the new line character with a break element.
		 *
		 * @param {String} value
		 * @return {String}
		 */
		makeNewLinesBreak(value) {
			return value.toString().replace("\n", "<br />");
		},

		/**
		 * Concatenates the model, make and year to produce the name of the vehicle
		 *
		 * @returns {String}
		 */
		vehicleName(vehicle) {
			let name = '';
			if (vehicle && vehicle.model) {
				name = vehicle.model.name;

				if (vehicle.model.make) {
					name = `${vehicle.model.make.name} ${name} (${vehicle.year}), ${
                        vehicle.registration_number.toUpperCase()}`
				}
			}

			return name;
		},

		ownerInfo (vehicle) {
			let name = '';
			if (vehicle && vehicle.owners && vehicle.owners.length) {
				let owner = vehicle.owners[0];

				return `${owner.name}, ${owner.email}, ${owner.contact}`
			} else {
				return 'N/A'
			}
		},

		trimSmall(text) {
			if (text && text.length > 40) {
				return `${text.slice(0, 40)}...`
			}

			return text;
		},

		trim (text) {
			if (text && text.length > 50) {
				return `${text.slice(0, 50)}...`
			}

			return text;
		},

		trimLong (text) {
			if (text && text.length > 150) {
				return `${text.slice(0, 150)}...`
			}

			return text;
		}
	},

	methods: {
		...mapActions({
			showLoader: 'showLoader',
			hideLoader: 'hideLoader',
		}),

		/**
		 * Compute the has danger class for the given field.
		 *
		 * @return {Object}
		 */
		getFieldClass(field) {
			return { 'has-danger': this.errors.has(field) };
		},

		/**
		 * Generate a random number usually used for unique keys.
		 *
		 * @return {String}
		 */
		getRandomNumber() {
			const timestamp = moment().unix();
			const randomNumber = Math.floor(Math.random() * 1000);

			return `${timestamp}${randomNumber}`;
		},

		/**
		 * Split an array into chunks
		 *
		 * @param {Array} arr Array to split
		 * @param {Integer} n Number of items
		 */
		chunkArray(arr, n) {
			let chunkLength = Math.max(Math.ceil(arr.length / n), 1);
			let chunks = [];
			let curr = 0;

			for (var i = 1; i <= n; i++) {
				chunks.push(arr.slice(curr, curr + chunkLength));
				curr = curr + chunkLength;
			}

			return chunks;
		},

		/**
		 * Show a notification. It accepts an object.
		 * The object contains the message and type of notification.
		 *
		 * @param {String|Object} data
		 * @param {String} type
		 * @return {Undefined}
		 */
		notify(data, type = 'success') {
			let notificationData = {};
			const typesConfig = {
				success: {
					icon: 'success',
					color: '#f96868'
				},

				error: {
					icon: 'error',
					color: '#f2a654'
				}
			};

			if (typeof data === 'string') {
				notificationData = {
					title: 'Success',
					message: data
				};
			} else {
				notificationData = { ...data
				};
			}

			this.resetNotifications();

			$.toast({
				heading: notificationData.title,
				text: notificationData.message,
				showHideTransition: 'slide',
				icon: typesConfig[type].icon,
				loaderBg: typesConfig[type].color,
				position: 'top-right'
			});
		},

	    /**
	     * Build html from an array, an object or a string containing errors.
	     *
	     * @param {Object|Array|String} errors
	     * @return {Object}
	     */
	    buildErrors(errors) {
				let message = '';
				let title = 'User Error Alert';

				if (process.env.NODE_ENV !== 'production') {
					console.log(errors);
				}

				if (errors.errors) {
					errors = errors.errors;
				} else if (errors.items) {
					errors = ['Sorry, the form validation failed. Fix all field errors.'];
				} else if (errors.error) {
					errors = [errors.error];
				} else if (typeof errors === 'object') {
					errors = Object.values(errors);
				} else {
					errors = ['Something unexpected happened.'];
				}

					message = '<ul>';

					$.each(errors, function (index, error) {
						message += `<li>${error}</li>`;
					});

					message += '<ul>';

					return {
					title,
					message
				};
		},

		/**
		 * Close existing notifications and reset it.
		 *
		 * @return {Undefined}
		 */
		resetNotifications() {
			$('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right mid-center');
			$(".jq-toast-wrap").css({
				"top": "",
				"left": "",
				"bottom": "",
				"right": ""
			});
		}
	},

	mounted() {
		if (typeof $ !== 'undefined') {
			$('.select-2').select2({
				allowClear: true
			});

			if ($('body div.popover').length) {
				$('body div.popover').remove();
			}
		}
	}
}