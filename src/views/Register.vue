<template>
    <div>
        <the-navbar flat />

        <v-main>
            <v-layout column>
                <v-container class="px-4 align">
                    <v-layout column class="align-center">
                        <register-hero :role="registerRole" />

                        <register-button @click="authGoogle()" />
                    </v-layout>
                </v-container>
            </v-layout>
        </v-main>
    </div>
</template>

<script>
import TheNavbar from "../components/Others/TheNavbar.vue";
import RegisterHero from "../components/Register/RegisterHero.vue";
import RegisterButton from "../components/Register/RegisterButton.vue";
export default {
    components: {
        TheNavbar,
        RegisterHero,
        RegisterButton,
    },

    props: {
        user: Object,
        id: String,
    },

    data: () => ({
        isLoaded: false,
    }),

    computed: {
        registerRole() {
            return this.$store.state.user.registerRole;
        },
    },

    methods: {
        authGoogle() {
            this.$store.dispatch("user/authGoogle");
        },
        async getRegisterRole() {
            let registrationId = this.id;

            await this.$store.dispatch("user/getRegisterRole", registrationId);
            localStorage.setItem("registrationId", registrationId);

            this.isLoaded = true;
        },
    },
    watch: {
        user: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.$router.push("/profil");
                }
            },
        },
    },
    created() {
        this.getRegisterRole();
        // let registerRole = this.id;
        // this.$store.commit("user/SET_REGISTER_ROLE", registerRole);
    },
};
</script>

<style></style>
