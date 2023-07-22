import type { Router, RouteLocationRaw } from 'vue-router';

import { useRouter } from 'vue-router';
import { isString } from '../utils/is';
import { PageEnum } from '../enums/pageEnum';

// 路由跳转异常处理函数
function handleError(error) {
  console.error(error);
}

type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw; // 适配push/replace接口
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}
