import { useRouter } from 'vue-router'
const router = useRouter()

export const navigate = (value) => {
  router.push(value)
}