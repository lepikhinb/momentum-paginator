import { execSync } from 'child_process'

execSync('npm run build', { stdio: 'inherit' })
execSync('npm publish --access public')