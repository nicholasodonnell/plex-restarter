import { exec } from 'child_process'

export default cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      error
        ? reject(error)
        : resolve(stdout)
    })
  })
}
