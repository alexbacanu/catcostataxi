import redis from "../clients/redis"

export async function getRedisKeys(pattern: string) {
  return redis.keys(pattern)
}

export async function getRedisValue(key: string) {
  return redis.get(key)
}
