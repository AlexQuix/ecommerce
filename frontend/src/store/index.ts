import { configureStore } from "@reduxjs/toolkit";

import popoverGallery, { IGalleryPopoverState } from "./slices/popover/popoverGallery";
import navbarPopover, { INavbarPopoverState } from "./slices/popover/navbarPopover";
import linkPopover, { ILinkPopoverState } from "./slices/popover/linkPopover";
import loadPage, { ILoadPageState } from "./slices/loadPage";
import filter, { IFilterState } from "./slices/filter";
import bodyScroll, { IBodyScrollState } from "./slices/bodyScroll";
import navbar, { INavbarState } from "./slices/navbar";
import user, { IUserState } from "./slices/user";
import alert, { IAlertState } from "./slices/alert";
import popoverCard, {IPopoverCardState} from "./slices/popover/popoverCard";

export interface IState {
    popoverCard: IPopoverCardState;
    popoverGallery: IGalleryPopoverState;
    navbarPopover: INavbarPopoverState;
    linkPopover: ILinkPopoverState;
    loadPage: ILoadPageState;
    filter: IFilterState;
    bodyScroll: IBodyScrollState;
    navbar: INavbarState;
    user: IUserState;
    alert: IAlertState;
}

export default configureStore({
    reducer: {
        popoverGallery, // it will deleted
        navbarPopover,
        linkPopover,
        loadPage,
        filter,
        bodyScroll,
        navbar,
        user,
        alert,
        popoverCard
    }
});