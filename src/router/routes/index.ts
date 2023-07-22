const modules: Record<string, { [key: string]: any }> = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const routeModuleList: any[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const basicRoutes = [...routeModuleList];
