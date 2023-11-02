import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductSuccess,
    deleteProductStart,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} from "./productRedux";
import { addUsersFailure, addUsersStart, addUsersSuccess, deleteUsersFailure, deleteUsersStart, deleteUsersSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUsersFailure, updateUsersStart, updateUsersSuccess } from "./usersRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/product");
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete("/product/" + id);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put("/product/" + id, { product });
        dispatch(updateProductSuccess({ id, product }));
    } catch (error) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post("/product/", { product });
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure());
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await userRequest.get('user', { params: { new: true } })
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure())
    }
}

export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUsersStart())
    try {
        const res = await userRequest.delete('user/' + id)
        dispatch(deleteUsersSuccess(id))
    } catch (error) {
        dispatch(deleteUsersFailure())
    }
}

export const addUser = async (dispatch, user) => {
    dispatch(addUsersStart())
    try {
        const res = await publicRequest.post('auth/register', { user })
        dispatch(addUsersSuccess(res.data))
    } catch (error) {
        dispatch(addUsersFailure())
    }
}

export const updateUser = async (dispatch, id, user) => {
    dispatch(updateUsersStart());
    try {
        const res = await userRequest.put("/user/" + id, { user });
        dispatch(updateUsersSuccess({ id, user }));
    } catch (error) {
        dispatch(updateUsersFailure());
    }
};