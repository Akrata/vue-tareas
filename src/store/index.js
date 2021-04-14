import { createStore } from "vuex";
import router from "../router";

export default createStore({
    state: {
        user: null,
        tareas: [],
        tarea: {
            id: "",
            nombre: "",
            categorias: [],
            estado: "",
            numero: 0,
        },
    },
    mutations: {
        loginUser(state,payload){
            state.user = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        cargarInfo(state, payload) {
            state.tareas = payload;
        },
        set(state, payload) {
            state.tareas.push(payload);
        },
        delete(state, payload) {
            let res = confirm("Seguro que desea eliminar?");
            if (res == true) {
                state.tareas = state.tareas.filter(
                    (item) => item.id !== payload
                );
            }
        },
        select(state, payload) {
            if (!state.tareas.find((item) => item.id === payload)) {
                router.push("/");
                return;
            }
            state.tarea = state.tareas.find((item) => item.id === payload);
        },
        update(state, payload) {
            state.tareas = state.tareas.map((item) =>
                item.id === payload.id ? payload : item
            );

            router.push("/");
        },
    },
    actions: {
        cerrarSesion({commit}){
            commit("setUser", null)
            router.push("/login")
        },
        async ingresarUsuario({commit}, user){
            try {
                const res = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0X_k7jNntw-1wxEv6L9YYeiFI3BpLzMA",{
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            password: user.password,
                            returnSecureToken: true
                        })

                    }
                )
                const dataDB = await res.json();
                console.log(dataDB);
                if (dataDB.error) {
                    return console.log(dataDB.error);
                }
                commit("loginUser", dataDB);
                router.push("/");
            } catch (error) {
                
            }
        },
        async registrarUsuario({ commit }, user) {
            try {
                const res = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0X_k7jNntw-1wxEv6L9YYeiFI3BpLzMA",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: user.email,
                            password: user.password,
                            returnSecureToken: true,
                        }),
                    }
                );
                const dataDB = await res.json();
                console.log(dataDB);
                if (dataDB.error) {
                    return console.log(dataDB.error);
                }
                commit("setUser", dataDB);
                router.push("/");
            } catch (error) {
                console.log(error);
            }
        },
        async cargarDB({ commit, state }) {
            try {
                const res = await fetch(
                    `https://tareas-api-54066-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`
                );
                const dataDB = await res.json();

                const arrayTareas = [];
                for (let id in dataDB) {
                    arrayTareas.push(dataDB[id]);
                }

                commit("cargarInfo", arrayTareas);
                console.log(arrayTareas);
            } catch (error) {
                console.log(error);
            }
        },
        async agregarTarea({ commit, state }, tarea) {
            try {
                const res = await fetch(
                    `https://tareas-api-54066-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(tarea),
                    }
                );
                const dataDB = await res.json();
            } catch (error) {
                console.log(error);
            }
            commit("set", tarea);
        },
        async eliminarTarea({ commit, state }, id) {
            try {
                await fetch(
                    `https://tareas-api-54066-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,
                    {
                        method: "DELETE",
                    }
                );
                commit("delete", id);
            } catch (error) {
                console.log(error);
            }
        },
        seleccionarTarea({ commit }, id) {
            commit("select", id);
        },
        async actualizarTarea({ commit, state }, tarea) {
            try {
                const res = await fetch(
                    `https://tareas-api-54066-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(tarea),
                    }
                );
                const dataDB = await res.json();
            } catch (error) {
                console.log(error);
            }
            commit("update", tarea);
        },
    },
    modules: {},
    getters:{
        userAutenticado(state){
            return !!state.user
        }
    }
});
