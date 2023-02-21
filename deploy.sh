#!/usr/bin/env sh

set -e

npm run build

cd dist 

git init
git add -A
git commit -m 'Final Commit - Deployment'
git push -f git@github.com:ElJefe111944/slider-puzzle-game.git master:gh-pages

cd -


