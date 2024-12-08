import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/app/store";
import { useLocalStorage } from "./useLocalStorage";
import { useQueryFilter } from "./useQueryFilter";
import { useGenerateDecade } from "./useGenerateDecades";
import { usePagination } from "./usePagination";


import { bindActionCreators } from "@reduxjs/toolkit";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export {
    useLocalStorage,
    useQueryFilter,
    useAppDispatch,
    useAppSelector,
    usePagination,
    useGenerateDecade,
};
