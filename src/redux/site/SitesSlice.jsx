import { createSlice } from "@reduxjs/toolkit";
import {
    addSiteAction,
    fetchSiteListAction,
    siteNameListAction,
    userNameListAction,
    siteStatusUpdateAction,
    siteUpdateAction,
    siteDeleteAction
} from "./SitesAction";

const SiteSlice = createSlice({
    name: "site",
    initialState: {
        site: null,
        sites: {
            data: {
                site_list: []
            }
        },
        siteNameList: [],
        userNameList: [],
        loading: false,
        loadingStatusUpdates: false,
        loadingSiteEdit: false,
        error: null,
        siteDelete: null,
        clientNameLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteListAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSiteListAction.fulfilled, (state, action) => {
                state.loading = false;
                state.sites = action.payload;
            })
            .addCase(fetchSiteListAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(siteNameListAction.pending, (state) => {
                state.clientNameLoading = true;
                state.error = null;
            })
            .addCase(siteNameListAction.fulfilled, (state, action) => {
                state.clientNameLoading = false;
                state.siteNameList = action.payload;
            })
            .addCase(siteNameListAction.rejected, (state, action) => {
                state.clientNameLoading = false;
                state.error = action.payload;
            })
            .addCase(userNameListAction.pending, (state) => {
                state.clientNameLoading = true;
                state.error = null;
            })
            .addCase(userNameListAction.fulfilled, (state, action) => {
                state.clientNameLoading = false;
                state.userNameList = action.payload;
            })
            .addCase(userNameListAction.rejected, (state, action) => {
                state.clientNameLoading = false;
                state.error = action.payload;
            })
            .addCase(addSiteAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSiteAction.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data?.site_list) {
                    state.sites.data.site_list = [
                        ...state.sites.data.site_list,
                        ...action.payload.data.site_list
                    ];
                }
            })
            .addCase(addSiteAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(siteStatusUpdateAction.pending, (state) => {
                state.loadingStatusUpdates = true;
                state.error = null;
            })

            .addCase(siteStatusUpdateAction.fulfilled, (state, action) => {
                state.loadingStatusUpdates = false;
                if (state.sites?.data?.site_list && action.payload?.data?.site_list?.[0]) {
                    const updatedSite = action.payload.data.site_list[0];
                    state.sites.data.site_list = state.sites.data.site_list.map(site => 
                        site.site_id === updatedSite.site_id ? updatedSite : site
                    );
                }
            })
            .addCase(siteStatusUpdateAction.rejected, (state, action) => {
                state.loadingStatusUpdates = false;
                state.error = action.payload;
            })
            .addCase(siteUpdateAction.pending, (state) => {
                state.loadingSiteEdit = true;
                state.error = null;
            })
            .addCase(siteUpdateAction.fulfilled, (state, action) => {
                state.loadingSiteEdit = false;
                if (state.sites?.data?.site_list && action.payload?.data?.site_list?.[0]) {
                    const updatedSite = action.payload.data.site_list[0];
                    state.sites.data.site_list = state.sites.data.site_list.map(site => 
                        site.site_id === updatedSite.site_id ? updatedSite : site
                    );
                }
            })
            .addCase(siteUpdateAction.rejected, (state, action) => {
                state.loadingSiteEdit = false;
                state.error = action.payload;
            })
            .addCase(siteDeleteAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(siteDeleteAction.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.data?.site_list) {
                    state.siteDelete = action.payload.data.site_list;
                    state.sites.data.site_list = state.sites.data.site_list.filter(
                        site => site.site_id !== action.payload.data.site_list[0].site_id
                    );
                }
            })
            .addCase(siteDeleteAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        }
});
export const { } = SiteSlice.actions;
export default SiteSlice.reducer;