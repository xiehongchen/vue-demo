import router from '@/router'
export const navigate = (path: any) => {
  console.log('router', router)
  router.push({path})
}