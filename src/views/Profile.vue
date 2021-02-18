<template>
    <div>
        <the-navbar back title="Profil Saya" @back="$router.go(-1)" />
        <the-layout>
            <v-container class="pb-15">
                <v-card outlined class="my-2">
                    <v-layout class="pa-6">
                        <the-avatar
                            v-if="user && user.photoURL"
                            :image="user.photoURL"
                            :size="96"
                        />
                        <v-layout column class="ml-4 justify-center">
                            <span
                                v-text="user.displayName || ''"
                                class="title font-weight-bold"
                                style="line-height: 1.5rem;"
                            />
                            <span v-text="user.email" class="text--secondary" />
                            <v-btn
                                outlined
                                small
                                style="opacity: .64;"
                                class="mt-2"
                                @click="signOut()"
                            >
                                <v-icon
                                    v-text="'mdi-logout-variant'"
                                    small
                                    left
                                />
                                <span v-text="'Keluar'" />
                            </v-btn>
                        </v-layout>
                    </v-layout>
                </v-card>
                <profile-data :user="user" />
            </v-container>
        </the-layout>
    </div>
</template>

<script>
import TheAvatar from "../components/Others/TheAvatar.vue";
import TheLayout from "../components/Others/TheLayout.vue";
import TheNavbar from "../components/Others/TheNavbar.vue";
import ProfileData from "../components/Profile/ProfileData.vue";
export default {
    components: { TheNavbar, TheLayout, TheAvatar, ProfileData },
    props: {
        user: {
            type: Object,
        },
    },
    methods: {
        signOut() {
            this.$store.dispatch("user/signOut");
        },
    },
};
</script>

<style></style>
