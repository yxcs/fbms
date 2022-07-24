
import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react'
const routes = [
  {
    path: '/',
    auth: false,
    component: lazy(() => import('../pages/admin/login/Login'))
  },
  {
    path: '/admin',
    auth: true,
    component: lazy(() => import('../pages/tool/portal/Portal')),
    children: [
      {
        path: '/admin/Home',
        auth: true,
        component: lazy(() => import('../pages/admin/home/Home'))
      },
      { path: '/admin/article',
        auth: true,
        component: lazy(() => import('../pages/admin/article/Article'))
      },
      { path: '/admin/upload',
        auth: true,
        component: lazy(() => import('../pages/admin/upload/Upload'))
      },
      { path: '/admin/toolchest',
        auth: true,
        component: lazy(() => import('../pages/admin/toolChest/ToolChest'))
      },
      {
        path: '/admin/*',
        auth: false,
        component: lazy(() => import('../pages/tool/notFound/NotFound'))
      }
    ]
  },
  {
    path: '*',
    auth: false,
    component: lazy(() => import('../pages/tool/notFound/NotFound'))
  }
]
 
//根据路径获取路由
const checkAuth = (routers, path)=>{
  for (const data of routers) {
    if (data.path == path) return data
    if (data.children) {
      const res = checkAuth(data.children, path)
      if (res) return res
    }
  }
  return null
}
 
// 路由处理方式
const generateRouter = (routers) => {
  return routers.map((item) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={
      <div>加载中...</div>
    }>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      <item.component />
    </Suspense>
    return item
  })
}
 
const Router = () => useRoutes(generateRouter(routes))
const checkRouterAuth = (path)=>{
  let auth = null
  auth = checkAuth(routes,path)
  return auth
}
export{ Router, checkRouterAuth }