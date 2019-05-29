import moment from 'moment';

export default {
    data() {
        return {
            start_end_diff: null,
            months: {
                1: 'Jan',
                2: 'Feb',
                3: 'Mar',
                4: 'Apr',
                5: 'May',
                6: 'Jun',
                7: 'Jul',
                8: 'Aug',
                9: 'Sep',
                10: 'Oct',
                11: 'Nov',
                12: 'Dec'
            },

            dateRangePickerConfig: {
                autoApply: true,
                // maxDate: moment(),
                autoUpdateInput: true,
                linkedCalendars: false,
                // alwaysShowCalendars: true,
                showDropdowns: true,

                locale: {
                    "format": "DD MMM YYYY",
                },

                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }
        }
    },
    methods: {
        /**
         * Gets all input elements with ref attributes with the format type:name and inits date inputs on them
         * e.g input refs should be either date_single:propName or date_range:propName
         * where date_single or date_range is the type and propName is the name of the property on the instance
         *
         * @param {Object} options
         * @returns {Undefined}
         */
        setupDatepickers(options = {}) {
            const refs = this.$refs;
            const initialDates = options.initialDates || {};
            const eventHandlers = options.eventHandlers || {};

            /**
             * Tells which dates we should allow future dates
             */
            let allowFuture = ['start_date', 'end_date', 'leaving_date', 'admission_date'];

            /**
             * add additional future dates
             */
            if (options.allowFuture) {
                allowFuture = allowFuture.concat(options.allowFuture);
            }

            let datePickerConfig = {
                ...this.dateRangePickerConfig,
                singleDatePicker: true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                }
            }

            for (let prop in refs) {
                let parentEl = $(refs[prop]).parent('div');

                if (!parentEl) {
                    parentEl = 'body';
                }

                if (prop.indexOf(':') > 0) {
                    let [propType, propName] = prop.split(':');

                    if (propType === 'date_single') {
                        if (initialDates[propName] && initialDates[propName] != '0000-00-00') {
                            let config = {
                                parentEl,
                                ...datePickerConfig,
                                startDate: moment(initialDates[propName])
                            };

                            if (allowFuture.indexOf(propName) > -1) {
                                delete config.maxDate;
                            }

                            $(refs[prop]).daterangepicker(config);
                        } else {
                            let config = {
                                parentEl,
                                ...datePickerConfig,
                                autoUpdateInput: false
                            };

                            if (propName == 'start_date') {
                                delete config.maxDate;
                                config.startDate = moment();
                                delete config.autoUpdateInput;
                                $(refs[prop]).daterangepicker(config);
                                continue;
                            }

                            if (allowFuture.indexOf(propName) > -1) {
                                delete config.maxDate;
                            }

                            $(refs[prop]).daterangepicker(config, function (chosen_date) {
                                $(refs[prop]).val(chosen_date.format('DD MMM YYYY'));
                            });
                        }
                    } else if (propType === 'date_range') {
                        $(refs[prop]).daterangepicker({
                            // parentEl,
                            ...this.dateRangePickerConfig,
                            startDate: moment().subtract(29, 'days'),
                            endDate: moment()
                        });
                    }
                }

                // Auto orient the picker's drop down. Check scroll height and length of page to
                // Determine suitable position for the drop down.
                $(refs[prop]).on('show.daterangepicker', (event, picker) => {
                    if (picker.element.offset().top - $(window).scrollTop() + picker.container.outerHeight() > $(window).height()) {
                        picker.drops = 'up';
                    } else {
                        picker.drops = 'down';
                    }

                    picker.move();
                });
            }

            for (let key in eventHandlers) {
                this.registerChangeEventHandlger(key, eventHandlers[key])
            }
        },


        /**
         * Populates the components instance with the date values from the referenced date inputs
         *
         * @param {String} basePath tells the path to store the values from the date props
         * the path could be a nested path. e.g prop1.prop2.prop3...propN
         * @param {Boolean} shouldReturn this specifies if the dates should be saved on instance or returned
         * @return {Undefined}
         */
        getDates(basePath = null, shouldReturn = true) {
            const refs = this.$refs;

            if (basePath) {
                let paths = basePath.split('.')
                if (paths.length > 1) {
                    basePath = this;
                    paths.map(p => {
                        if (!basePath.hasOwnProperty(p)) {
                            basePath[p] = {};
                        }
                        basePath = basePath[p];
                    })
                } else {
                    basePath = this[basePath];
                }
            }

            if (shouldReturn) {
                basePath = {}
            }

            for (let prop in refs) {
                if (prop.indexOf(':') > 0) {
                    let propName = prop.split(':').pop();
                    if (basePath) {
                        basePath[propName] = refs[prop].value;
                    } else {
                        this[propName] = refs[prop].value;
                    }
                }
            }

            if (shouldReturn) {
                return basePath;
            }
        },

        /**
         * Registers the start date and end date behaviour.
         *
         * @returns {Undefined}
         */
        registerChangeEventHandlger(ref, method) {
            if (this.$refs[ref] && this[method]) {
                // console.log('registring ' + ref + ' with ' + method)
                $(this.$refs[ref])
                    .on('apply.daterangepicker', this[method]);
            }
        }
    }
}