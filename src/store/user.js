import { db, auth, serverTimestamp, provider } from "../services/firebase";
import router from "../router";

const END_POINT = "users";
const ref = db.collection(END_POINT);

const state = {
    users: [],
    user: null,
    family: null,
    families: [],
    registerRole: null,
    formDoctor: [
        {
            label: "NIK",
            value: "nik",
            type: "number",
        },
        {
            label: "NIP",
            value: "nip",
            type: "number",
        },
        {
            label: "Nama",
            value: "displayName",
            type: "text",
        },
        {
            label: "Email",
            value: "email",
            type: "email",
            disabled: true,
        },
        {
            label: "No. Telp",
            value: "phoneNumber",
            type: "number",
        },
        {
            label: "Tanggal Lahir",
            value: "birthDate",
            type: "date",
        },
        {
            label: "Tempat Lahir",
            value: "birthPlace",
            type: "text",
        },
        {
            label: "Jenis Kelamin",
            value: "gender",
            type: "select",
            options: [
                { text: "Laki-laki", value: "Laki-laki" },
                { text: "Perempuan", value: "Perempuan" },
            ],
        },
        {
            label: "Agama",
            value: "religion",
            type: "select",
            options: [
                { text: "Islam", value: "Islam" },
                { text: "Protestan", value: "Protestan" },
                { text: "Katolik", value: "Katolik" },
                { text: "Hindu", value: "Hindu" },
                { text: "Buddha", value: "Buddha" },
                { text: "Konghucu", value: "Konghucu" },
            ],
        },
        {
            label: "Status Perkawinan",
            value: "married",
            type: "select",
            options: [
                { text: "Menikah", value: "Menikah" },
                { text: "Belum Menikah", value: "Belum Menikah" },
            ],
        },
        {
            label: "Alamat",
            value: "address",
            type: "textarea",
        },
        {
            label: "No BPJS",
            value: "noBPJS",
            type: "number",
        },
    ],
    formPatient: [
        {
            label: "NIK",
            value: "nik",
            type: "number",
        },
        {
            label: "Nama",
            value: "displayName",
            type: "text",
        },
        {
            label: "Email",
            value: "email",
            type: "email",
            disabled: true,
        },
        {
            label: "No. Telp",
            value: "phoneNumber",
            type: "number",
        },
        {
            label: "Tanggal Lahir",
            value: "birthDate",
            type: "date",
        },
        {
            label: "Tempat Lahir",
            value: "birthPlace",
            type: "text",
        },
        {
            label: "Jenis Kelamin",
            value: "gender",
            type: "select",
            options: [
                { text: "Laki-laki", value: "Laki-laki" },
                { text: "Perempuan", value: "Perempuan" },
            ],
        },
        {
            label: "Agama",
            value: "religion",
            type: "select",
            options: [
                { text: "Islam", value: "Islam" },
                { text: "Protestan", value: "Protestan" },
                { text: "Katolik", value: "Katolik" },
                { text: "Hindu", value: "Hindu" },
                { text: "Buddha", value: "Buddha" },
                { text: "Konghucu", value: "Konghucu" },
            ],
        },
        {
            label: "Status Perkawinan",
            value: "married",
            type: "select",
            options: [
                { text: "Menikah", value: "Menikah" },
                { text: "Belum Menikah", value: "Belum Menikah" },
            ],
        },
        {
            label: "Alamat",
            value: "address",
            type: "textarea",
        },
        {
            label: "Desa",
            value: "village",
            type: "autocomplete",
            itemText: "text",
            options: [
                { text: "Antasan Segera", abbr: "AS" },
                { text: "Puntik Luar", abbr: "PL" },
                { text: "Pantai Hambawang", abbr: "PH" },
                { text: "Bangkit Baru", abbr: "BB" },
                { text: "Tatah Alayung", abbr: "TA" },
                { text: "Tanipah", abbr: "TN" },
                { text: "Tabing Rimbah", abbr: "TR" },
                { text: "Karang Indah", abbr: "KI" },
                { text: "Karang Bunga", abbr: "KB" },
                { text: "Lok Rawa", abbr: "LR" },
            ],
        },
        {
            label: "No BPJS",
            value: "noBPJS",
            type: "number",
        },
    ],
    userByNik: [],
};

const getters = {
    authenticated(state) {
        return state.user;
    },
    userData(state) {
        let user = state.user;

        if (!user) return null;

        let userData = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
        };
        return userData;
    },
};

const mutations = {
    SET_USER: (state, data) => {
        state.user = data;
    },
    SET_USERS: (state, { data }) => {
        state.users = data;
    },
    SET_USER_FAMILIES: (state, response) => {
        state.families = response;
    },
    SET_USER_FAMILY: (state, response) => {
        state.family = response;
    },
    SET_USER_BY_NIK: (state, response) => {
        state.userByNik = response;
    },
    SET_REGISTER_ROLE: (state, role) => {
        state.registerRole = role;
        localStorage.setItem("registerRole", role);
    },
};

const actions = {
    async checkUserExists({ commit, dispatch, state }, u) {
        const user = ref.doc(u.uid);

        commit("SET_LOADING", "GET", { root: true });

        await user.get().then(async (doc) => {
            if (doc.exists) {
                commit("SET_USER", doc.data());
                await dispatch("getUser", u.uid);

                commit("SET_LOADING", null, { root: true });
            } else {
                u.currentQueue = null;
                u.familyId = null;
                u.role = localStorage.getItem("registerRole");
                u.createdAt = serverTimestamp();

                await user.set(u);
                await dispatch("getUser", u.uid);

                let registrationId = localStorage.getItem("registrationId");
                dispatch("deleteRegisterRole", registrationId);

                router.push("/profil");

                commit("SET_LOADING", null, { root: true });
            }
        });
    },
    async getUser({ commit }, uid) {
        const user = ref.doc(uid);

        commit("SET_LOADING", "GET", { root: true });

        user.onSnapshot((snap) => {
            commit("SET_USER", snap.data());
        });

        commit("SET_LOADING", null, { root: true });
    },
    async authGoogle({ commit }) {
        commit("SET_LOADING", "GET", { root: true });
        await auth
            .signInWithRedirect(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var firebaseUser = result.user;
                commit("SET_LOADING", null, { root: true });
                // ...
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // this.errorMessage = errorMessage
                // The email of the user's account used.
                // var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                commit("SET_LOADING", null, { root: true });
                // ...
            });
    },
    async signOut({ commit }) {
        await auth.signOut();
        commit("SET_USER", null);
        router.push("/masuk");
    },
    async put({ commit, state }, { payload }) {
        commit("SET_LOADING", "POST", { root: true });

        try {
            let { uid } = state.user;
            await ref.doc(uid).set(payload, { merge: true });
            commit("SET_LOADING", null, { root: true });
            // await dispatch('getUser', uid)

            return { status: "success" };
        } catch (err) {
            console.error(err);
            commit("SET_LOADING", null, { root: true });
            return { status: "error" };
        }
    },
    async get({ commit }, uid) {
        const user = ref.doc(uid);

        commit("SET_LOADING", "GET", { root: true });
        commit("SET_USER_FAMILY", null);

        // user.onSnapshot(snap => {
        //   commit('SET_USER', snap.data())
        // })
        user.get().then((snap) => {
            if (snap.exists) {
                commit("SET_USER_FAMILY", snap.data());
                return { status: "success" };
            } else {
                commit("SET_USER_FAMILY", null);
                return { status: "error" };
            }
        });

        commit("SET_LOADING", null, { root: true });
    },
    async getFamilies({ commit }, { uid }) {
        commit("SET_LOADING", "GET", { root: true });

        try {
            let query = ref.where("familyId", "==", uid);
            let { docs } = await query.get();
            let response = [];

            docs.forEach(async (doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                response.push(obj);
            });

            commit("SET_USER_FAMILIES", response);

            commit("SET_LOADING", null, { root: true });

            return { status: "success" };
        } catch (err) {
            console.error(err);
            commit("SET_LOADING", null, { root: true });
            return { status: "error" };
        }
    },
    async getByNik({ commit }, { nik }) {
        commit("SET_LOADING", "GET", { root: true });
        commit("SET_USER_BY_NIK", null);

        try {
            let query = ref.where("nik", "==", nik);
            let { docs } = await query.get();
            let response = [];

            docs.forEach((doc) => {
                var obj = doc.data();
                obj.id = doc.id;
                response.push(obj);
            });

            commit("SET_USER_BY_NIK", response);
            commit("SET_LOADING", null, { root: true });

            return { status: "success" };
        } catch (err) {
            console.error(err);
            commit("SET_LOADING", null, { root: true });
            return { status: "error" };
        }
    },
    async addToFamily({ commit, state, dispatch }, { user }) {
        commit("SET_LOADING", "POST", { root: true });

        try {
            let familyHead = state.user;
            let query = ref.doc(user.uid);
            await query.set({ familyId: familyHead.uid }, { merge: true });

            commit("SET_LOADING", null, { root: true });
            await dispatch("getByNik", { nik: user.nik });
            await dispatch("getFamilies", { uid: familyHead.uid });

            return { status: "success" };
        } catch (err) {
            console.error(err);
            commit("SET_LOADING", null, { root: true });
            return { status: "error" };
        }
    },
    async deleteFromFamily({ commit }, { uid }) {
        commit("SET_LOADING", "POST", { root: true });

        try {
            await ref.doc(uid).set({ familyId: null }, { merge: true });
            commit("SET_LOADING", null, { root: true });

            return { status: "success" };
        } catch (err) {
            console.error(err);
            commit("SET_LOADING", null, { root: true });
            return { status: "error" };
        }
    },
    async getRegisterRole({ commit }, registrationId) {
        const registrationRef = db
            .collection("registrations")
            .doc(registrationId);
        const registrationQuery = await registrationRef.get();
        const registrationData = registrationQuery.data();

        if (!registrationData) {
            console.log("Link registrasi sudah tidak berlaku");
            return;
        }

        const role = registrationData.role;

        commit("SET_REGISTER_ROLE", role);
    },
    async deleteRegisterRole({}, registrationId) {
        const registrationRef = db
            .collection("registrations")
            .doc(registrationId);

        await registrationRef.delete();

        localStorage.removeItem("registrationId");
        localStorage.removeItem("registerRole");
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
