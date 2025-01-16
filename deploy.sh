npm run build
git add .
git commit -m "Deploy to Github Pages" 
git push origin main
git subtree push --prefix dist origin gh-pages