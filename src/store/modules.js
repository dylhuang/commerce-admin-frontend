import useCommonStore from './common';
import useUserStore from './user';
import useSystemMenuStore from './system/menu';
import useDecorationStore from './system/decoration.js';
import useCodeTypeStore from './system/codeType.js';

export const useUserStoreHook = () => useUserStore();
export const useCommonStoreHook = () => useCommonStore();
export const useSystemMenuStoreHook = () => useSystemMenuStore();
export const useGoodsStoreHook = () => useGoodsStore();
export const useSelfProductStoreHook = () => useSelfProductStore();
export const useDecorationStoreHook = () => useDecorationStore();
export const useCodeTypeStoreHook = () => useCodeTypeStore();
