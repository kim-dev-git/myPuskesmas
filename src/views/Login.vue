<template>
    <div>
        <the-navbar flat />

        <v-main>
            <v-layout column>
                <v-container class="px-4 align">
                    <v-layout column class="align-center">
                        <login-hero />

                        <login-button @click="authGoogle()" />
                    </v-layout>
                </v-container>
            </v-layout>
        </v-main>
    </div>
</template>

<script>
import TheNavbar from "../components/Others/TheNavbar.vue";
import LoginHero from "../components/Login/LoginHero.vue";
import LoginButton from "../components/Login/LoginButton.vue";
export default {
    components: {
        TheNavbar,
        LoginHero,
        LoginButton,
    },
    props: {
        user: {
            type: Object,
        },
    },
    data: () => ({
        //
    }),
    methods: {
        authGoogle() {
            this.$store.dispatch("user/authGoogle");
        },
    },
    watch: {
        user: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.$router.push("/");
                }
            },
        },
    },
    created() {
        this.$store.commit("user/SET_REGISTER_ROLE", "pasien");
    },
};
</script>

<style></style>
