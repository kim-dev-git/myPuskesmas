<template>
    <div>
        <v-layout column class="align-center mb-4">
            <the-logo class="mb-4" :height="128" />
            <p v-text="'myPuskes'" class="mb-2 text-h4 font-weight-bold" />

            <p
                v-text="
                    'Aplikasi yang memudahkan anda dalam mendapatkan Pelayanan Kesehatan'
                "
                class="text--secondary text-center subtitle-1"
                style="line-height: 1.2rem"
            />
        </v-layout>

        <v-card outlined class="pa-4">
            <v-layout column class="align-center">
                <p v-text="'Daftar sebagai'" class="mb-3 text--secondary" />
                <v-skeleton-loader
                    v-model="isLoaded"
                    class="mx-auto"
                    type="chip"
                >
                    <v-chip>
                        <span
                            v-text="role"
                            class="mx-2 text-uppercase overline"
                        />
                    </v-chip>
                </v-skeleton-loader>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import TheLogo from "../Others/TheLogo.vue";
export default {
    components: { TheLogo },

    props: {
        role: String,
    },

    computed: {
        isLoaded() {
            const isLoaded = this.role !== null || this.role !== undefined;
            return isLoaded;
        },
    },
};
</script>

<style></style>
