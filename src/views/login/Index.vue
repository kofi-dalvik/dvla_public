<template>
    <div class="row justify-content-center">
        <div class="col-3 align-self-center">
            <div class="card grid-margin">
                <div class="card-body">
                    <div class="login-icon">
                        <h1 class="text-center">
                            <i class="mdi mdi-lock-outline"></i>
                        </h1>
                    </div>

                    <p class="card-description text-center">Please enter your login credentials</p>

                    <div class="form-group" :class="emailClass">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            v-model="email"
                            class="form-control"
                            v-validate="rules.email"
                            placeholder="Enter Email">

                        <error-label :message="errors.first('email')" />
                    </div>

                    <div class="form-group" :class="passwordClass">
                        <label for="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            v-model="password"
                            class="form-control"
                            v-validate="rules.password"
                            placeholder="Enter Password">

                        <error-label :message="errors.first('password')" />
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary" @click="login">
                            <i class="mdi mdi-login"></i>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                email: '',
                password: '',

                rules: {
                    email: 'required|email',
                    password: 'required'
                }
            };
        },

        computed: {
            emailClass() {
                return { 'has-danger': this.errors.has('email') };
            },

            passwordClass() {
                return { 'has-danger': this.errors.has('password') };
            }
        },

		methods: {
			...mapActions({
				authenticate: 'Auth/authenticate',
			}),

			/**
			 * Log in user.
             *
             * @return {Undefined}
			 */
			login() {
                const credentials = {
                    email: this.email,
                    password: this.password
                };

				this.$validator.validateAll()
					.then(() => this.authenticate(credentials))
					.then((response) => {
                        console.log(response)
                        this.notify('Login successful. Welcome back!');
                        this.$router.push({name: 'dashboard'})
					})
					.catch((errors) => {
						this.notify(this.buildErrors(errors), 'error');
					});
			},
		}
    }
</script>

<style lang="scss" scoped>
    .row {
        height: 100vh;
        width: 100vw;
        background-color: #7571f9;

        .login-icon {
            color:  #7571f9;

            h1 {
                font-size: 6em;
            }
        }
    }
</style>


