import { useRouter } from 'vue-router'
const router = useRouter()

export const navigate = (value: any) => {
  router.push(value)
}