import { useSelector, useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from ".";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
