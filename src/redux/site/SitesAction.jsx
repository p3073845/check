import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeApiCall } from "../../utils/ApiFetch";
import { toast } from "react-toastify";

export const fetchSiteListAction = createAsyncThunk(
    "auth/siteList",
    async (page, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/siteList', page);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const siteNameListAction = createAsyncThunk(
    "auth/siteNameList",
    async (page, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/siteNameList', page);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userNameListAction = createAsyncThunk(
    "auth/userNameList",
    async (page, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/userNameList', page);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const addSiteAction = createAsyncThunk(  
    "auth/addSite",
    async ({ siteData }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/addSite', siteData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const siteStatusUpdateAction = createAsyncThunk(
    "auth/siteStatusUpdate",
    async ({ siteData }, { rejectWithValue }) => {
        console.log("siteData", siteData);
        try {
            const data = await makeApiCall('POST', '/siteStatusUpdate', siteData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const siteDeleteAction = createAsyncThunk(
    "auth/siteDelete",
    async ({ siteData }, { rejectWithValue }) => {
        console.log("siteData", siteData);
        try {
            const data = await makeApiCall('POST', '/siteDelete', siteData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const siteUpdateAction = createAsyncThunk(
    "auth/siteUpdate",
    async ({ siteData }, { rejectWithValue }) => {
        try {
            const data = await makeApiCall('POST', '/siteUpdate', siteData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);