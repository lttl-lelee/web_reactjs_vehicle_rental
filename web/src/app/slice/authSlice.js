import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StorageKeys } from "../../constants/index";
import authAPI from "../../services/authAPI";

export const register = createAsyncThunk("auth/register", async (payload) => {
  // Gọi API đăng ký
  const response = await authAPI.register(payload);
  // Lưu data xuống Local Storage
  localStorage.setItem(StorageKeys.TOKEN, response.data.access_token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data)); // lưu data > user xuống localStorage với key là user
  // return user data
  return response.data;
});

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      // Gọi API đăng nhập
      const response = await authAPI.login(payload);
      console.log(response);
      // Lưu data xuống Local Storage
      localStorage.setItem(StorageKeys.TOKEN, response.data.access_token);
      localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data)); // lưu data > user xuống localStorage với key là user
      // return user data
      return response.data;
    } catch (error) {
      // Hàm này dùng để bắt lỗi
      return rejectWithValue(error);
    }
  }
);

/*
payload: tham số chúng ta truyền vào
auth/register: line 15/ line 4
*/

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Lấy dữ liệu của user từ Local Storage gán vào Redux Sate vì mỗi lần F5 lại thì dữ liệu trên Redux State sẽ mất
    // Nếu nhiều dữ liệu hơn thì có thể dùng Redux Persist
    // Check như này chắc hơn là để chắc hơn
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {}, // thông tin của user hiện tại?
    isAuthenticated:
      !!localStorage.getItem(StorageKeys.USER) &&
      !!localStorage.getItem(StorageKeys.TOKEN),
    isLoading: false,
    error: null, // ngoài ra có thể là thông tin về quyền, vvv
  },
  reducers: {
    logout(state) {
      // Xóa dữ liệu trong localStorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      // Xóa ở Local Storage nhưng vẫn phải set isAuthenticated về false, nếu không thì phải F5 1 lần nữa nó mới xóa, không logic.
      state.isAuthenticated = false;
      // Xóa dữ liệu trong Redux State
      state.current = {};
    },
  }, // Không cần khai báo những reducer có action là async action, ví dụ như register, login, riêng logout là cần
  // Khi Thunk thành công, sẽ cập nhật dữ liệu vào initialState (redux state)
  extraReducers: {
    // Đăng ký
    [register.pending]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.current = action.payload; // nếu fulfilled thì cập nhật vào action.payload, action.payload là chỗ mình return trên register
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // message.success("Đăng ký thành công");
    },
    [register.rejected]: (state, action) => {
      state.current = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
      // message.error("Đăng ký thất bại");
    },
    // Đăng nhập
    [login.pending]: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload; // nếu fulfilled thì cập nhật vào action.payload, action.payload là chỗ mình return trên register
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // message.success("Đăng nhập thành công");
    },
    [login.rejected]: (state, action) => {
      state.current = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
      // message.error("Đăng nhập thất bại");
      // console.log("Bắt lỗi từ Redux: ", action.payload);
    },
  },
});

const { actions, reducer } = authSlice;
export const { logout } = actions;
export default reducer;
