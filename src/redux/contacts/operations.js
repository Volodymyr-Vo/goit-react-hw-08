import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/operations";
import toast from "react-hot-toast";

const successAdd = () => toast.success("Contact successfully added!");
const successDelete = () => toast.success("Contact successfully deleted!");
const successEdit = () => toast.success("Contact successfully updated!");
const errorNotification = () => toast.error("Oops, something went wrong");

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const { signal } = thunkAPI;
    try {
      const { data } = await api.get("/contacts", { signal });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post("/contacts", body);
      successAdd();
      return data;
    } catch (e) {
      errorNotification();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.delete(`/contacts/${id}`);
      successDelete();
      return data;
    } catch (e) {
      errorNotification();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ name, number, id }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/contacts/${id}`, {
        name,
        number,
      });
      successEdit();
      return data;
    } catch (e) {
      errorNotification();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
